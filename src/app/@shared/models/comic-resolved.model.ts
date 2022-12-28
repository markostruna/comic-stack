import { Comic } from './comic.model';

export interface ComicResolved extends Comic {
  number?: number;
  seqNumber?: number;
  title: string;
  hero: string;
  title2?: string;
  hero2?: string;
  collection?: string;
  thumbnailPath: string;
  currentBackgroundImage: string;
  coverPath: string;
  backgroundImageUrl: string;
  class: string;
  loaded: boolean;
  fakeEntry: boolean;
  [key: string]: any;
}
