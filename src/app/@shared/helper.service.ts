import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Publisher, Comic, ComicResolved } from './models';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor() {}

  parsePublishers(text: string): Publisher[] {
    const publishers: Publisher[] = [];

    if (text === undefined) {
      return publishers;
    }

    const arrayOfLines = text.match(/[^\r\n]+/g) ?? [];
    const regexFolders = /.*alt=\"\[DIR\]\".*<a href=\"(.*)\/\"\>.*\<\/a\>.*/;

    arrayOfLines.forEach((line) => {
      const found = line.match(regexFolders);

      if (found?.length !== 2) {
        return;
      }

      const folder = decodeURI(found[1]).replace('%23', '#');

      publishers.push({
        path: 'Publishers/' + found[1] + '/',
        name: folder,
      });
    });

    return publishers;
  }

  parseComics(text: string, parentPath: string, publisher: string): Comic[] {
    const comics: Comic[] = [];

    if (text === undefined) {
      return comics;
    }

    // split input to single lines
    const arrayOfLines = text.match(/[^\r\n]+/g) ?? [];

    // parse server output and display only contents of current folder
    const regexFiles = /<tr><td.*><img.*alt=\"\[[   |IMG]+\]\".*<\/td><td><a.*href=\"(.*)\">.*<\/a>.*<\/td>.*<\/tr>/;

    // filename and extension
    const regexpFilename = /(.*)\.(.*)/;

    let index = 0;

    for (const line of arrayOfLines) {
      let tokens = line.match(regexFiles);

      if (tokens?.length !== 2) {
        continue;
      }

      const path = tokens[1];

      tokens = path.match(regexpFilename);

      if (tokens?.length !== 3) {
        continue;
      }

      const originalFilename = tokens[1];
      const filename = decodeURI(tokens[1]).replace('%23', '#').replace('&amp;', '&');
      const extension = tokens[2];

      const newComic: Comic = {
        // id: 'comic-' + (index++),
        filename,
        originalFilename,
        extension,
        path: parentPath + path,
        publisher,
        missing: extension === 'jpg',
      };

      comics.push(newComic);
    }

    return comics;
  }

  transformTitleToFilename(input: string): string {
    if (input === undefined) {
      return '';
    }

    return input.toLowerCase().replace(/ /g, '-').replace(/č/g, 'c').replace(/š/g, 's').replace(/ž/g, 'z');
  }

  getPublisherBackgroundImageUrl(item: Publisher): string {
    if (item?.path == null) {
      return '';
    }

    const imageFilename = this.transformTitleToFilename(item.name) + '.jpg';

    const url = 'url("' + environment.assetPath + imageFilename + '")';
    return url;
  }

  getComicBackgroundImageUrl(item: ComicResolved): string {
    const url = 'url("' + item.currentBackgroundImage + '")';
    return url;
  }

  getComicHeroImageUrl(hero: string | undefined): string {
    if (hero == null) {
      return '';
    }

    const heroLower = hero.toLowerCase().replace(/ /g, '-');
    if (this.isHeroSupported(heroLower)) {
      return 'url("' + environment.assetPath + heroLower + '.png")';
    }

    return '';
  }

  calculateClass(item: ComicResolved | undefined) {
    let ret = '';

    if (item?.hero) {
      ret = item.hero.toLowerCase().replace(/ /g, '');
    }

    return ret;
  }

  isHeroSupported(hero: string): boolean {
    const supportedHeros: string[] = [
      'zagor',
      'dilan-dog',
      'dampir',
      'mister-no',
      'marti-misterija',
      'teks-viler',
      'brad-barron',
      'tim-i-dasti',
      'kit-teler',
      'veliki-blek',
      'ken-parker',
      'kapetan-miki',
      'komandant-mark',
    ];

    return supportedHeros.includes(hero);
  }
}
