import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { environment } from '@env/environment';
import { Archive } from 'libarchive.js';

interface ExtractedFileEntry {
  file: Blob & {
    name?: string;
    size: number;
    type: string;
    extract?: () => Promise<File>;
  };
  path: string;
}

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIcon],
})
export class ReaderComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);

  readonly title = signal('Comic reader');
  readonly pages = signal<string[]>([]);
  readonly downloadUrl = signal('');
  readonly currentPage = signal(0);
  readonly twoPageMode = signal(false);
  readonly splitSpreads = signal(false);
  readonly splitPageNumber = signal(1);
  readonly zoom = signal(1);
  readonly isLoading = signal(false);
  readonly error = signal('');
  readonly isFullscreen = signal(false);
  private objectUrls: string[] = [];
  private imageFiles: Array<Blob & { name?: string; type: string }> = [];
  private splitEntries: ExtractedFileEntry[] = [];
  private splitSourceIndex = 0;
  private splitHalf = 0;
  private splitImageIsSpread = false;
  private splitLoadedSourceIndex = -1;
  private splitLoadedSource: (Blob & { name?: string; type: string }) | null = null;
  private loadToken = 0;

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const path = params.get('path');
      if (!path) {
        this.error.set('No comic was selected.');
        return;
      }

      this.title.set(params.get('title') || 'Comic reader');
      const url = environment.serverUrl + path;
      this.downloadUrl.set(url);
      void this.loadArchive(url);
    });
  }

  ngOnDestroy(): void {
    this.revokeObjectUrls();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') {
      this.nextPage();
    } else if (event.key === 'ArrowLeft') {
      this.previousPage();
    } else if (event.key === '+' || event.key === '=') {
      this.changeZoom(0.1);
    } else if (event.key === '-') {
      this.changeZoom(-0.1);
    }
  }

  nextPage(): void {
    if (this.splitSpreads()) {
      void this.nextSplitPage();
      return;
    }

    const step = this.twoPageMode() ? 2 : 1;
    this.currentPage.update((page) => Math.min(page + step, Math.max(0, this.pages().length - step)));
  }

  previousPage(): void {
    if (this.splitSpreads()) {
      void this.previousSplitPage();
      return;
    }

    const step = this.twoPageMode() ? 2 : 1;
    this.currentPage.update((page) => Math.max(0, page - step));
  }

  toggleTwoPageMode(): void {
    this.twoPageMode.update((enabled) => !enabled);
    this.currentPage.update((page) => page - (page % 2));
  }

  toggleSplitSpreads(): void {
    const enabled = !this.splitSpreads();
    this.splitSpreads.set(enabled);
    this.twoPageMode.set(false);
    if (enabled) {
      this.splitSourceIndex = 0;
      this.splitHalf = 0;
      this.splitPageNumber.set(1);
      void this.loadSplitPage();
    } else {
      void this.renderPages();
    }
  }

  changeZoom(delta: number): void {
    this.zoom.update((value) => Math.min(2.5, Math.max(0.5, Math.round((value + delta) * 10) / 10)));
  }

  async toggleFullscreen(container: HTMLElement): Promise<void> {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      this.isFullscreen.set(false);
      return;
    }

    await container.requestFullscreen();
    this.isFullscreen.set(true);
  }

  pageRange(): number[] {
    const count = this.twoPageMode() ? 2 : 1;
    return Array.from({ length: count }, (_, offset) => this.currentPage() + offset).filter(
      (index) => index < this.pages().length
    );
  }

  private async loadArchive(url: string): Promise<void> {
    const token = ++this.loadToken;
    this.revokeObjectUrls();
    this.imageFiles = [];
    this.splitEntries = [];
    this.splitLoadedSourceIndex = -1;
    this.splitLoadedSource = null;
    this.pages.set([]);
    this.currentPage.set(0);
    this.error.set('');
    this.isLoading.set(true);
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 15000);
    let pageUrls: string[] = [];

    try {
      const workerUrl = new URL(`${environment.assetPath}worker-bundle.js`, document.baseURI);
      Archive.init({ workerUrl });
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) {
        throw new Error(`Unable to load comic (${response.status}).`);
      }

      const archiveFile = new File([await response.arrayBuffer()], url.split('/').pop() || 'comic.archive');
      const archive = await this.withTimeout(Archive.open(archiveFile), 'The comic reader worker timed out.');
      const entries = (await this.withTimeout(
        archive.getFilesArray(),
        'Reading the comic archive entries timed out.'
      )) as ExtractedFileEntry[];
      const imageEntries = entries
        .filter(({ file }) => file && typeof file.size === 'number')
        .filter(({ file, path }) => {
          const name = `${path}${file.name ?? ''}`;
          return (file.type ?? '').startsWith('image/') || /\.(avif|bmp|gif|jpe?g|png|webp)$/i.test(name);
        })
        .sort(({ path: leftPath, file: leftFile }, { path: rightPath, file: rightFile }) =>
          `${leftPath}${leftFile.name ?? ''}`.localeCompare(`${rightPath}${rightFile.name ?? ''}`, undefined, {
            numeric: true,
          })
        );
      if (this.splitSpreads()) {
        this.splitEntries = imageEntries;
        this.imageFiles = [];
        this.splitSourceIndex = 0;
        this.splitHalf = 0;
        await this.loadSplitPage(token);
        return;
      }

      await this.withTimeout(archive.extractFiles(), 'Extracting the comic pages timed out.');
      const extractedEntries = (await this.withTimeout(
        archive.getFilesArray(),
        'Reading the extracted comic pages timed out.'
      )) as ExtractedFileEntry[];
      this.imageFiles = extractedEntries
        .filter(({ file }) => file && typeof file.size === 'number' && typeof file.slice === 'function')
        .filter(({ file, path }) => {
          const name = `${path}${file.name ?? ''}`;
          return (file.type ?? '').startsWith('image/') || /\.(avif|bmp|gif|jpe?g|png|webp)$/i.test(name);
        })
        .sort(({ path: leftPath, file: leftFile }, { path: rightPath, file: rightFile }) =>
          `${leftPath}${leftFile.name ?? ''}`.localeCompare(`${rightPath}${rightFile.name ?? ''}`, undefined, {
            numeric: true,
          })
        )
        .map(({ file }) => file);
      pageUrls = await this.createPageUrls(this.imageFiles, token);

      if (token !== this.loadToken) {
        pageUrls.forEach((page) => URL.revokeObjectURL(page));
        return;
      }

      this.objectUrls = pageUrls;
      this.pages.set(pageUrls);
      if (pageUrls.length === 0) {
        this.error.set('No readable pages were found in this comic.');
      }
    } catch (loadError) {
      pageUrls.forEach((page) => URL.revokeObjectURL(page));
      if (token === this.loadToken) {
        this.error.set(
          loadError instanceof DOMException && loadError.name === 'AbortError'
            ? 'The comic download timed out.'
            : loadError instanceof Error
            ? loadError.message
            : 'Unable to read this comic archive.'
        );
      }
    } finally {
      window.clearTimeout(timeoutId);
      if (token === this.loadToken) {
        this.isLoading.set(false);
      }
    }
  }

  private revokeObjectUrls(): void {
    this.objectUrls.forEach((url) => URL.revokeObjectURL(url));
    this.objectUrls = [];
  }

  private async renderPages(): Promise<void> {
    if (this.imageFiles.length === 0) {
      return;
    }

    const token = ++this.loadToken;
    this.revokeObjectUrls();
    this.pages.set([]);
    this.currentPage.set(0);
    this.error.set('');
    this.isLoading.set(true);
    let pageUrls: string[] = [];

    try {
      pageUrls = await this.createPageUrls(this.imageFiles, token);
      if (token !== this.loadToken) {
        pageUrls.forEach((page) => URL.revokeObjectURL(page));
        return;
      }

      this.objectUrls = pageUrls;
      this.pages.set(pageUrls);
    } catch (renderError) {
      pageUrls.forEach((page) => URL.revokeObjectURL(page));
      if (token === this.loadToken) {
        this.error.set(renderError instanceof Error ? renderError.message : 'Unable to prepare comic pages.');
      }
    } finally {
      if (token === this.loadToken) {
        this.isLoading.set(false);
      }
    }
  }

  private async nextSplitPage(): Promise<void> {
    if (this.isLoading() || this.imageFiles.length === 0) {
      return;
    }

    if (this.splitImageIsSpread && this.splitHalf === 0) {
      this.splitHalf = 1;
      this.splitPageNumber.update((page) => page + 1);
    } else {
      if (this.splitSourceIndex >= this.imageFiles.length - 1) {
        return;
      }
      this.splitSourceIndex += 1;
      this.splitHalf = 0;
      this.splitPageNumber.update((page) => page + 1);
    }

    await this.loadSplitPage();
  }

  private async previousSplitPage(): Promise<void> {
    if (this.isLoading() || this.imageFiles.length === 0) {
      return;
    }

    if (this.splitImageIsSpread && this.splitHalf === 1) {
      this.splitHalf = 0;
      this.splitPageNumber.update((page) => Math.max(1, page - 1));
    } else if (this.splitSourceIndex > 0) {
      this.splitSourceIndex -= 1;
      this.splitHalf = 0;
      this.splitPageNumber.update((page) => Math.max(1, page - 1));
    } else {
      return;
    }

    await this.loadSplitPage();
  }

  private async loadSplitPage(existingToken?: number): Promise<void> {
    const token = existingToken ?? ++this.loadToken;
    this.revokeObjectUrls();
    this.pages.set([]);
    this.error.set('');
    this.isLoading.set(true);
    let pageUrls: string[] = [];

    try {
      let sourceFile = this.splitLoadedSourceIndex === this.splitSourceIndex ? this.splitLoadedSource : null;
      if (!sourceFile) {
        sourceFile = this.imageFiles.length
          ? this.imageFiles[this.splitSourceIndex]
          : (await this.splitEntries[this.splitSourceIndex]?.file.extract?.()) ?? null;
        this.splitLoadedSourceIndex = this.splitSourceIndex;
        this.splitLoadedSource = sourceFile;
      }
      if (!sourceFile) {
        throw new Error('Unable to extract the selected comic page.');
      }

      const sourceUrl = URL.createObjectURL(sourceFile);
      const image = await this.loadImage(sourceUrl);
      this.splitImageIsSpread = image.naturalWidth / image.naturalHeight >= 1.35;

      if (!this.splitImageIsSpread) {
        this.splitHalf = 0;
        pageUrls = [sourceUrl];
      } else {
        const pageWidth = Math.floor(image.naturalWidth / 2);
        pageUrls = [
          await this.createCroppedPage(
            image,
            this.splitHalf === 0 ? 0 : pageWidth,
            this.splitHalf === 0 ? pageWidth : image.naturalWidth - pageWidth,
            image.naturalHeight,
            this.imageFiles[this.splitSourceIndex].type
          ),
        ];
        URL.revokeObjectURL(sourceUrl);
      }

      if (token !== this.loadToken) {
        pageUrls.forEach((page) => URL.revokeObjectURL(page));
        return;
      }

      this.objectUrls = pageUrls;
      this.pages.set(pageUrls);
    } catch (loadError) {
      pageUrls.forEach((page) => URL.revokeObjectURL(page));
      if (token === this.loadToken) {
        this.error.set(loadError instanceof Error ? loadError.message : 'Unable to load this comic page.');
      }
    } finally {
      if (token === this.loadToken) {
        this.isLoading.set(false);
      }
    }
  }

  canGoPrevious(): boolean {
    return this.splitSpreads() ? this.splitPageNumber() > 1 : this.currentPage() > 0;
  }

  canGoNext(): boolean {
    if (!this.splitSpreads()) {
      return this.currentPage() + (this.twoPageMode() ? 2 : 1) < this.pages().length;
    }

    return (this.splitImageIsSpread && this.splitHalf === 0) || this.splitSourceIndex < this.imageFiles.length - 1;
  }

  private async createPageUrls(files: Array<Blob & { name?: string; type: string }>, token: number): Promise<string[]> {
    const pageUrls: string[] = [];
    for (const file of files) {
      if (token !== this.loadToken) {
        pageUrls.forEach((page) => URL.revokeObjectURL(page));
        return [];
      }

      pageUrls.push(...(this.splitSpreads() ? await this.normalizeImage(file) : [URL.createObjectURL(file)]));
    }
    return pageUrls;
  }

  private async normalizeImage(file: Blob & { name?: string; type: string }): Promise<string[]> {
    const sourceUrl = URL.createObjectURL(file);
    const image = await this.loadImage(sourceUrl);
    const aspectRatio = image.naturalWidth / image.naturalHeight;

    if (aspectRatio < 1.35) {
      return [sourceUrl];
    }

    try {
      const pageWidth = Math.floor(image.naturalWidth / 2);
      const pageUrls = await Promise.all([
        this.createCroppedPage(image, 0, pageWidth, image.naturalHeight, file.type),
        this.createCroppedPage(image, pageWidth, image.naturalWidth - pageWidth, image.naturalHeight, file.type),
      ]);
      URL.revokeObjectURL(sourceUrl);
      return pageUrls;
    } catch (error) {
      URL.revokeObjectURL(sourceUrl);
      throw error;
    }
  }

  private loadImage(sourceUrl: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error('Unable to decode a comic page image.'));
      image.src = sourceUrl;
    });
  }

  private createCroppedPage(
    image: HTMLImageElement,
    sourceX: number,
    width: number,
    height: number,
    sourceType: string
  ): Promise<string> {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    if (!context) {
      return Promise.reject(new Error('Unable to prepare a split comic page.'));
    }

    context.drawImage(image, sourceX, 0, width, height, 0, 0, width, height);
    const outputType = sourceType === 'image/jpeg' ? sourceType : 'image/png';
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(URL.createObjectURL(blob));
        } else {
          reject(new Error('Unable to create a split comic page.'));
        }
      }, outputType);
    });
  }

  private withTimeout<T>(promise: Promise<T>, message: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const timeoutId = window.setTimeout(() => reject(new Error(message)), 15000);
      promise.then(
        (value) => {
          window.clearTimeout(timeoutId);
          resolve(value);
        },
        (error: unknown) => {
          window.clearTimeout(timeoutId);
          reject(error);
        }
      );
    });
  }
}
