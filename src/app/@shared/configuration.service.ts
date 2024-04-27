import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, map, Observable, of } from 'rxjs';
import { BrowsingService } from './browsing.service';
import { HelperService } from './helper.service';
import { Comic, ComicResolved, Publisher, PublisherResolved } from './models';

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
export class ConfigurationService {
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

  constructor(private browsingService: BrowsingService, private helperService: HelperService) {}

  getPublishers(path: string): Observable<PublisherResolved[]> {
    console.log('getPublishers initiated. Path: (', path, ')');

    return this.browsingService.getPublishers(path).pipe(
      map((data) => {
        const publishers = this.helperService.parsePublishers(data);
        // this.storageService.savePublishers(publishers);
        return this.resolvePublishers(publishers);
      }),
      catchError((err) => {
        console.log('getPublishers error.');
        throw err;
      })
    );
  }

  getComics(path: string, publisher: string): Observable<Comic[]> {
    console.log('getComics initiated. Path: (', path, '), Publisher: ', publisher, ')');

    return this.browsingService.getComics(path).pipe(
      map((data) => {
        const comics = this.helperService.parseComics(data, path, publisher);
        // this.storageService.saveComicData(publisher, comics);
        return this.resolveComics(comics, path);
      }),
      catchError((err) => {
        console.log('getComics error.');
        throw err;
      })
    );
  }

  private resolvePublishers(publishers: Publisher[]): PublisherResolved[] {
    let resolved: PublisherResolved[] = [];

    publishers.forEach((publisher) => {
      const resolvedPublisher = this.resolvePublisher(publisher);
      resolved.push(resolvedPublisher);
    });

    return resolved;
  }

  private resolvePublisher(publisher: Publisher): PublisherResolved {
    const resolved: PublisherResolved = {
      ...publisher,
      backgroundImageUrl: this.helperService.getPublisherBackgroundImageUrl(publisher),
    };

    return resolved;
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
      title: '',
      collection: ' ',
      hero: 'MISSING',
      fakeEntry: false,
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

          resolved[fieldInfo.name] = fieldInfo.type === this.fieldTypes.number ? +curToken : curToken;
          index++;
        });

        resolved.heroImageUrl = this.helperService.getComicHeroImageUrl(resolved);
        resolved.hero2ImageUrl = this.helperService.getComicHero2ImageUrl(resolved);

        return resolved;
      }
    }

    resolved.title = comic.path;

    return resolved;
  }
}
