import { Comic } from './comic.model';

export interface Hero {
  name: string;
  imagePath: string;
}

export interface ComicResolved extends Comic {
  number?: number;
  seqNumber?: number;
  numberResolved: string;
  titles: string[];
  titlesResolved: string;
  heroes: Hero[];
  heroesResolved: string;
  collection?: string;
  thumbnailPath: string;
  currentBackgroundImage: string;
  coverPath: string;
  comicMissing: boolean | null;
  backgroundImageUrl: string;
  class: string;
  loaded: boolean;
  fakeEntry: boolean;
  publisherResolved: string;
  readingProgress?: { pageIndex: number; totalPages: number };
  bookmarked?: boolean;
  [key: string]: any;
}
