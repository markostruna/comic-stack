import { Injectable } from '@angular/core';
import { ConfigurationService } from '@app/@shared/configuration.service';
import { Comic, ComicResolved, Publisher, PublisherResolved } from '@app/@shared/models';
import { environment } from '@env/environment';
import { catchError, map, Observable, of } from 'rxjs';

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

  constructor(private configurationService: ConfigurationService) {}

  getPublishers(path: string, useCache: boolean = true): Observable<PublisherResolved[]> {
    console.log('getPublishers initiated. Path: (', path);

    return this.configurationService.getPublishers(path).pipe(
      map((data) => {
        return this.resolvePublishers(data);
      }),
      catchError((err) => {
        console.log('getPublishers error.');
        throw err;
      })
    );
  }

  getComics(path: string, publisher: string, useCache: boolean = true): Observable<ComicResolved[]> {
    console.log('getComics initiated. Path: (', path, '), Publisher: ', publisher, ')');

    return this.configurationService.getComics(path, publisher).pipe(
      map((data) => {
        return this.resolveComics(data, path);
      }),
      catchError((err) => {
        console.log('getComics error.');
        throw err;
      })
    );
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
      title: '',
      collection: ' ',
      hero: 'MISSING',
      fakeEntry: false,
      titles: [],
      titlesResolved: '',
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

        resolved.titles = [];

        if (resolved.title) {
          const titles = resolved.title.split(';');
          resolved.titles.push(...titles);
        }

        if (resolved.title2) {
          const titles = resolved.title2.split(';');
          resolved.titles.push(...titles);
        }

        resolved.titlesResolved = resolved.titles.join(' / ');

        return resolved;
      }
    }

    resolved.title = comic.path;

    return resolved;
  }
}
