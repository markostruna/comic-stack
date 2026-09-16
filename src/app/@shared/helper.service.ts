import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ComicResolved, Publisher } from './models';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
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
