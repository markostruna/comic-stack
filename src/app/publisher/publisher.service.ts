import { Injectable, inject } from '@angular/core';
import { ConfigurationService } from '@app/@shared/configuration.service';
import { CatalogService } from '@app/@shared/catalog.service';
import { HelperService } from '@app/@shared/helper.service';
import { Comic, ComicResolved, Publisher, PublisherResolved } from '@app/@shared/models';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

export type AvailabilityFilter = 'All' | 'Available' | 'Missing';

export interface ComicSearchFilters {
  title: string;
  hero: string;
  publisher: string;
  collection: string;
  availability: AvailabilityFilter;
}

export interface ComicSearchOptions {
  heroes: string[];
  publishers: string[];
  collections: string[];
}

export interface fieldTypes {
  number: number;
  string: number;
}

export interface field {
  name: string;
  regExp: string;
  type: number;
}

export interface fields {
  number: field;
  hero: field;
  collection: field;
  seqNumber: field;
  title: field;
  [key: string]: field;
}

export interface filenameMatchConfig {
  regExp?: RegExp;
  fields: string[];
  fieldInfo?: field[];
}

@Injectable({
  providedIn: 'root',
})
export class PublisherService {
  private configurationService = inject(ConfigurationService);
  private catalogService = inject(CatalogService);
  private helperService = inject(HelperService);
  private publishersCache?: Observable<PublisherResolved[]>;
  private readonly comicsCache = new Map<string, Observable<ComicResolved[]>>();

  fieldTypes: fieldTypes = {
    number: 0,
    string: 1,
  };

  fields: fields = {
    number: {
      regExp: '([1-9,0]+)',
      name: 'number',
      type: this.fieldTypes.number,
    },
    hero: {
      regExp: '(.*)',
      name: 'hero',
      type: this.fieldTypes.string,
    },
    collection: {
      regExp: '(.*)',
      name: 'collection',
      type: this.fieldTypes.string,
    },
    seqNumber: {
      regExp: '([1-9,0]+)',
      name: 'seqNumber',
      type: this.fieldTypes.number,
    },
    title: {
      regExp: '(.*)',
      name: 'title',
      type: this.fieldTypes.string,
    },
    hero2: {
      regExp: '(.*)',
      name: 'hero2',
      type: this.fieldTypes.string,
    },
    title2: {
      regExp: '(.*)',
      name: 'title2',
      type: this.fieldTypes.string,
    },
  };

  filenameMatchConfigurations: filenameMatchConfig[] = [
    { fields: ['number', 'hero', 'collection', 'seqNumber', 'title'] },
    { fields: ['number', 'hero', 'title', 'hero2', 'title2'] },
    { fields: ['number', 'hero', 'collection', 'seqNumber'] },
    { fields: ['number', 'hero', 'seqNumber', 'title'] },
    { fields: ['hero', 'collection', 'seqNumber', 'title'] },
    { fields: ['number', 'hero', 'title'] },
    { fields: ['hero', 'collection', 'seqNumber'] },
    { fields: ['hero', 'seqNumber', 'title'] },
  ];

  getPublishers(path: string, useCache: boolean = true): Observable<PublisherResolved[]> {
    if (!useCache) {
      return this.catalogService.readPublishers();
    }

    this.publishersCache ??= this.catalogService.readPublishers().pipe(shareReplay({ bufferSize: 1, refCount: true }));
    return this.publishersCache;
  }

  getComics(path: string, publisher: string, useCache: boolean = true): Observable<ComicResolved[]> {
    if (!useCache) {
      return this.catalogService.readComics(publisher);
    }

    const cached = this.comicsCache.get(publisher);
    if (cached) {
      return cached;
    }

    const comics = this.catalogService.readComics(publisher).pipe(shareReplay({ bufferSize: 1, refCount: true }));
    this.comicsCache.set(publisher, comics);
    return comics;
  }

  getAllComics(): Observable<ComicResolved[]> {
    return this.catalogService.readComics();
  }

  getSearchOptions(comics: ComicResolved[]): ComicSearchOptions {
    return {
      heroes: this.unique(comics.flatMap((comic) => comic.heroes?.map((hero) => hero.name) ?? [])),
      publishers: this.unique(comics.map((comic) => comic.publisher)),
      collections: this.unique(comics.map((comic) => comic.collection ?? '').filter(Boolean)),
    };
  }

  searchComics(filters: ComicSearchFilters): Observable<ComicResolved[]> {
    return this.getAllComics().pipe(map((comics) => comics.filter((comic) => this.matchesFilters(comic, filters))));
  }

  searchComicsFromList(comics: ComicResolved[], filters: ComicSearchFilters): ComicResolved[] {
    return comics.filter((comic) => this.matchesFilters(comic, filters));
  }

  importPublishers(path: string): Observable<PublisherResolved[]> {
    return this.configurationService.getPublishers(path);
  }

  importComics(path: string, publisher: string): Observable<ComicResolved[]> {
    return this.configurationService.getComics(path, publisher);
  }

  private resolvePublishers(data: PublisherResolved[]): PublisherResolved[] {
    if (data?.length <= 0) {
      return [];
    }

    return data.map((publisher) => {
      return {
        name: publisher.name,
        path: publisher.path,
        backgroundImageUrl: publisher.backgroundImageUrl,
      };
    });
  }

  private resolveComics(comics: Comic[], parentPath: string): ComicResolved[] {
    let resolved: ComicResolved[] = [];

    comics.forEach((comic) => {
      const resolvedComic = this.resolveComic(comic, parentPath);
      resolved.push(resolvedComic);
    });

    return resolved;
  }

  resolveComic(comic: Comic, parentPath: string): ComicResolved {
    const resolved: ComicResolved = {
      ...comic,
      thumbnailPath: environment.serverUrl + parentPath + 'Thumbnails/' + comic.originalFilename + '.jpg',
      coverPath: environment.serverUrl + parentPath + 'Covers/' + comic.originalFilename + '.jpg',
      currentBackgroundImage: '/assets/spinner.gif',
      backgroundImageUrl: 'url("/assets/spinner.gif")',
      class: 'thumb' + (comic.missing ? ' missing' : ''),
      loaded: false,
      number: undefined,
      seqNumber: undefined,
      heroes: [],
      heroesResolved: '',
      titles: [],
      titlesResolved: '',
      collection: '',
      fakeEntry: false,
      publisherResolved: '',
      numberResolved: '',
    };

    for (const config of this.filenameMatchConfigurations) {
      if (config.regExp === undefined) {
        let regExp = '';
        config.fieldInfo = [];

        config.fields.forEach((field) => {
          const fieldInfo: field = this.fields[field];
          config.fieldInfo?.push(fieldInfo);

          if (regExp.length !== 0) {
            regExp += ' - ';
          }

          regExp += fieldInfo.regExp;
        });

        config.regExp = RegExp(regExp);
      }

      const tokens = comic.filename.match(config.regExp);

      if (tokens) {
        let index = 1;

        config.fieldInfo?.forEach((fieldInfo) => {
          const curToken = tokens[index];

          if (curToken == undefined) {
            resolved[fieldInfo.name] = undefined;
            return;
          }

          switch (fieldInfo.name) {
            case 'title':
            case 'title2':
              resolved['titles'].push(curToken);
              break;
            case 'hero':
            case 'hero2':
              resolved['heroes'].push({ name: curToken, imagePath: this.helperService.getComicHeroImageUrl(curToken) });
              break;
            default:
              resolved[fieldInfo.name] = fieldInfo.type === this.fieldTypes.number ? +curToken : curToken;
          }
          index++;
        });

        resolved.titlesResolved = resolved.titles.join(' / ');
        resolved.heroesResolved = resolved.heroes?.map((hero) => hero?.name)?.join(', ');
        resolved.publisherResolved = resolved.publisher;

        if (resolved.collection) {
          resolved.publisherResolved += ' / ' + resolved.collection;
        }

        resolved.numberResolved = resolved?.number?.toString() ?? '';

        if (resolved.seqNumber) {
          resolved.numberResolved += (resolved.numberResolved.length > 0 ? '-' : '') + resolved.seqNumber.toString();
        }

        return resolved;
      }
    }

    if (resolved.titles?.length === 0) {
      resolved.titles.push(comic.path);
    }

    return resolved;
  }

  private matchesFilters(comic: ComicResolved, filters: ComicSearchFilters): boolean {
    const title = `${comic.titlesResolved ?? ''} ${comic.filename ?? ''}`.toLowerCase();
    const hero = (comic.heroesResolved ?? '').toLowerCase();
    const publisher = (comic.publisher ?? '').toLowerCase();
    const collection = (comic.collection ?? '').toLowerCase();
    const selectedTitle = (filters.title ?? '').trim().toLowerCase();
    const selectedHero = (filters.hero ?? 'All').toLowerCase();
    const selectedPublisher = (filters.publisher ?? 'All').toLowerCase();
    const selectedCollection = (filters.collection ?? 'All').toLowerCase();

    if (selectedTitle && !title.includes(selectedTitle)) {
      return false;
    }
    if (selectedHero !== 'all' && hero !== selectedHero && !hero.includes(selectedHero)) {
      return false;
    }
    if (selectedPublisher !== 'all' && publisher !== selectedPublisher) {
      return false;
    }
    if (selectedCollection !== 'all' && collection !== selectedCollection) {
      return false;
    }
    if (filters.availability === 'Available' && comic.comicMissing === true) {
      return false;
    }
    if (filters.availability === 'Missing' && comic.comicMissing !== true) {
      return false;
    }

    return true;
  }

  private unique(values: string[]): string[] {
    return [...new Set(values.filter(Boolean))].sort((left, right) => left.localeCompare(right));
  }
}
