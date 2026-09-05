export interface Comic {
  missing: boolean;
  comicMissing: boolean | null;
  thumbnailMissing: boolean | null;
  coverMissing: boolean | null;
  filename: string;
  originalFilename: string;
  extension: string;
  path: string;
  publisher: string;
}
