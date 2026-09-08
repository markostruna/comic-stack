import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { environment } from '@env/environment';
import { Archive } from 'libarchive.js';
import { PageFlip } from 'page-flip';
import type { FlipCorner, SizeType } from 'page-flip';

interface ExtractedFileEntry {
  file: Blob & {
    name?: string;
    size: number;
    type: string;
    extract?: () => Promise<File>;
  };
  path: string;
}

// A source image is treated as a two-page spread scan when its aspect ratio is at least this wide.
const SPREAD_ASPECT_RATIO_THRESHOLD = 1.35;

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIcon],
})
export class ReaderComponent implements AfterViewInit, OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly downloadTimeoutMs = 120_000;
  private readonly archiveOperationTimeoutMs = 300_000;
  @ViewChild('pageFlipContainer') private pageFlipContainer?: ElementRef<HTMLElement>;

  readonly title = signal('Comic reader');
  readonly pages = signal<string[]>([]);
  readonly downloadUrl = signal('');
  readonly currentPage = signal(0);
  readonly twoPageMode = signal(false);
  readonly splitSpreads = signal(false);
  readonly zoom = signal(1);
  readonly pageAspectRatio = signal(800 / 1120);
  readonly isLoading = signal(false);
  readonly error = signal('');
  readonly isFullscreen = signal(false);
  private objectUrls: string[] = [];
  private imageFiles: Array<Blob & { name?: string; type: string }> = [];
  private loadToken = 0;
  private pageFlipUrls: string[] = [];
  private pageFlip: PageFlip | null = null;
  private resizeTimeoutId?: number;

  ngAfterViewInit(): void {
    this.refreshPageFlip();
  }

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
    this.pageFlip?.destroy();
    this.revokePageFlipUrls();
    this.revokeObjectUrls();
    window.clearTimeout(this.resizeTimeoutId);
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

  @HostListener('window:resize')
  handleWindowResize(): void {
    window.clearTimeout(this.resizeTimeoutId);
    this.resizeTimeoutId = window.setTimeout(() => this.refreshPageFlip(), 150);
  }

  nextPage(): void {
    if (!this.canGoNext()) {
      return;
    }

    this.pageFlip?.flipNext('bottom' as FlipCorner);
  }

  previousPage(): void {
    if (!this.canGoPrevious()) {
      return;
    }

    this.pageFlip?.flipPrev('bottom' as FlipCorner);
  }

  toggleTwoPageMode(): void {
    this.twoPageMode.update((enabled) => !enabled);
    this.refreshPageFlip();
  }

  toggleSplitSpreads(): void {
    this.splitSpreads.update((enabled) => !enabled);
    void this.renderPages();
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

  canGoPrevious(): boolean {
    return this.currentPage() > 0;
  }

  canGoNext(): boolean {
    return this.currentPage() + 1 < this.pages().length;
  }

  private async loadArchive(url: string): Promise<void> {
    const token = ++this.loadToken;
    this.revokeObjectUrls();
    this.imageFiles = [];
    this.pages.set([]);
    this.currentPage.set(0);
    this.error.set('');
    this.isLoading.set(true);
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), this.downloadTimeoutMs);

    try {
      const workerUrl = new URL(`${environment.assetPath}worker-bundle.js`, document.baseURI);
      Archive.init({ workerUrl });
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) {
        throw new Error(`Unable to load comic (${response.status}).`);
      }

      const archiveFile = new File([await response.arrayBuffer()], url.split('/').pop() || 'comic.archive');
      const archive = await this.withTimeout(Archive.open(archiveFile), 'The comic reader worker timed out.');
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

      if (token !== this.loadToken) {
        return;
      }

      if (this.imageFiles.length === 0) {
        this.error.set('No readable pages were found in this comic.');
        return;
      }

      await this.buildPages(token);
    } catch (loadError) {
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

  private async renderPages(): Promise<void> {
    if (this.imageFiles.length === 0) {
      return;
    }

    const token = ++this.loadToken;
    this.currentPage.set(0);
    this.error.set('');
    this.isLoading.set(true);

    try {
      await this.buildPages(token);
    } catch (renderError) {
      if (token === this.loadToken) {
        this.error.set(renderError instanceof Error ? renderError.message : 'Unable to prepare comic pages.');
      }
    } finally {
      if (token === this.loadToken) {
        this.isLoading.set(false);
      }
    }
  }

  private async buildPages(token: number): Promise<void> {
    const pageUrls = await this.createPageUrls(this.imageFiles, token);
    if (token !== this.loadToken) {
      pageUrls.forEach((page) => URL.revokeObjectURL(page));
      return;
    }

    this.revokeObjectUrls();
    this.objectUrls = pageUrls;
    this.pages.set(pageUrls);
    this.refreshPageFlip();
  }

  private revokeObjectUrls(): void {
    this.objectUrls.forEach((url) => URL.revokeObjectURL(url));
    this.objectUrls = [];
  }

  private refreshPageFlip(): void {
    if (this.pages().length === 0) {
      return;
    }

    if (!this.pageFlipContainer) {
      window.setTimeout(() => this.refreshPageFlip(), 0);
      return;
    }

    window.setTimeout(async () => {
      const container = this.pageFlipContainer;
      if (!container || this.pages().length === 0) {
        return;
      }

      // Skip the cover (index 0), which is often a single portrait page even in an
      // otherwise double-page-per-scan comic - sample a later page instead.
      const sizingPageIndex = Math.min(2, this.pages().length - 1);
      const sizingPage = await this.loadImage(this.pages()[sizingPageIndex]);
      const pageRatio = sizingPage.naturalWidth / sizingPage.naturalHeight;
      if (!Number.isFinite(pageRatio) || pageRatio <= 0) {
        return;
      }

      const fittedPageUrls = await this.createContainedPageUrls(this.pages(), pageRatio);
      this.pageAspectRatio.set(pageRatio);
      this.pageFlip?.destroy();
      this.revokePageFlipUrls();
      this.pageFlipUrls = fittedPageUrls;

      const containerWidth = Math.max(1, container.nativeElement.getBoundingClientRect().width);
      const twoPageMode = this.twoPageMode();
      this.pageFlip = new PageFlip(container.nativeElement, {
        width: 1000,
        height: Math.round(1000 / pageRatio),
        size: 'stretch' as SizeType,
        // In single-page mode, force portrait (one page at a time) regardless of container
        // width by making the portrait threshold match the container's own width. In
        // two-page mode, usePortrait:false skips that check entirely, always showing spreads.
        minWidth: twoPageMode ? 1 : containerWidth,
        maxWidth: 10000,
        minHeight: 1,
        maxHeight: 10000,
        autoSize: false,
        showCover: true,
        drawShadow: true,
        maxShadowOpacity: 0.45,
        flippingTime: 1050,
        usePortrait: !twoPageMode,
        mobileScrollSupport: false,
        disableFlipByClick: true,
      });
      this.pageFlip.on('flip', (event) => this.currentPage.set(Number(event.data)));
      this.pageFlip.loadFromImages(fittedPageUrls);
      this.pageFlip.turnToPage(Math.min(this.currentPage(), fittedPageUrls.length - 1));
    });
  }

  private async createPageUrls(files: Array<Blob & { name?: string; type: string }>, token: number): Promise<string[]> {
    const pageUrls: string[] = [];
    for (const [index, file] of files.entries()) {
      if (token !== this.loadToken) {
        pageUrls.forEach((page) => URL.revokeObjectURL(page));
        return [];
      }

      pageUrls.push(...(await this.pagesForFile(file, index)));
    }
    return pageUrls;
  }

  private async pagesForFile(file: Blob & { name?: string; type: string }, index: number): Promise<string[]> {
    if (!this.splitSpreads()) {
      return [URL.createObjectURL(file)];
    }

    // The cover (index 0) is never split, even if it happens to be a wide scan.
    if (index === 0) {
      return [URL.createObjectURL(file)];
    }

    return this.normalizeImage(file);
  }

  private async createContainedPageUrls(pageUrls: string[], pageRatio: number): Promise<string[]> {
    const fittedPageUrls: string[] = [];
    try {
      for (const pageUrl of pageUrls) {
        fittedPageUrls.push(await this.createContainedPageUrl(pageUrl, pageRatio));
      }
      return fittedPageUrls;
    } catch (error) {
      fittedPageUrls.forEach((pageUrl) => URL.revokeObjectURL(pageUrl));
      throw error;
    }
  }

  private async createContainedPageUrl(pageUrl: string, pageRatio: number): Promise<string> {
    const image = await this.loadImage(pageUrl);
    const imageBounds = this.findContentBounds(image);
    const canvasWidth = 1000;
    const canvasHeight = Math.max(1, Math.round(canvasWidth / pageRatio));
    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Unable to prepare a comic page for display.');
    }

    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    const sourceWidth = imageBounds.width;
    const sourceHeight = imageBounds.height;
    const scale = Math.min(canvasWidth / sourceWidth, canvasHeight / sourceHeight);
    const width = sourceWidth * scale;
    const height = sourceHeight * scale;
    context.drawImage(
      image,
      imageBounds.x,
      imageBounds.y,
      sourceWidth,
      sourceHeight,
      (canvasWidth - width) / 2,
      (canvasHeight - height) / 2,
      width,
      height
    );

    return new Promise<string>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(URL.createObjectURL(blob));
        } else {
          reject(new Error('Unable to prepare a comic page for display.'));
        }
      }, 'image/png');
    });
  }

  private findContentBounds(image: HTMLImageElement): { x: number; y: number; width: number; height: number } {
    const scanWidth = Math.min(800, image.naturalWidth);
    const scanHeight = Math.max(1, Math.round((image.naturalHeight / image.naturalWidth) * scanWidth));
    const canvas = document.createElement('canvas');
    canvas.width = scanWidth;
    canvas.height = scanHeight;
    const context = canvas.getContext('2d');
    if (!context) {
      return { x: 0, y: 0, width: image.naturalWidth, height: image.naturalHeight };
    }

    context.drawImage(image, 0, 0, scanWidth, scanHeight);
    const pixels = context.getImageData(0, 0, scanWidth, scanHeight).data;
    let left = scanWidth;
    let top = scanHeight;
    let right = -1;
    let bottom = -1;

    for (let y = 0; y < scanHeight; y += 1) {
      for (let x = 0; x < scanWidth; x += 1) {
        const pixel = (y * scanWidth + x) * 4;
        if (pixels[pixel] < 245 || pixels[pixel + 1] < 245 || pixels[pixel + 2] < 245) {
          left = Math.min(left, x);
          top = Math.min(top, y);
          right = Math.max(right, x);
          bottom = Math.max(bottom, y);
        }
      }
    }

    if (right < left || bottom < top) {
      return { x: 0, y: 0, width: image.naturalWidth, height: image.naturalHeight };
    }

    const scaleX = image.naturalWidth / scanWidth;
    const scaleY = image.naturalHeight / scanHeight;
    return {
      x: Math.floor(left * scaleX),
      y: Math.floor(top * scaleY),
      width: Math.min(image.naturalWidth, Math.ceil((right - left + 1) * scaleX)),
      height: Math.min(image.naturalHeight, Math.ceil((bottom - top + 1) * scaleY)),
    };
  }

  private revokePageFlipUrls(): void {
    this.pageFlipUrls.forEach((pageUrl) => URL.revokeObjectURL(pageUrl));
    this.pageFlipUrls = [];
  }

  private async normalizeImage(file: Blob & { name?: string; type: string }): Promise<string[]> {
    const sourceUrl = URL.createObjectURL(file);
    const image = await this.loadImage(sourceUrl);
    const aspectRatio = image.naturalWidth / image.naturalHeight;

    if (aspectRatio < SPREAD_ASPECT_RATIO_THRESHOLD) {
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
      const timeoutId = window.setTimeout(() => reject(new Error(message)), this.archiveOperationTimeoutMs);
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
