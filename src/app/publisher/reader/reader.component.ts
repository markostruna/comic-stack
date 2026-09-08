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

// Describes where one final (post-split) page comes from: a whole source file, or one half of it.
interface PageSource {
  file: Blob & { name?: string; type: string };
  half: 'left' | 'right' | null;
}

// A source image is treated as a two-page spread scan when its aspect ratio is at least this wide.
const SPREAD_ASPECT_RATIO_THRESHOLD = 1.35;

// A single shared 1x1 transparent pixel used to fill page-flip's image array for pages that
// haven't been processed yet, so it doesn't eagerly load every page's real image up front.
const PLACEHOLDER_PAGE_URL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

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
  readonly canSplit = signal(false);
  readonly zoom = signal(1);
  readonly pageAspectRatio = signal(800 / 1120);
  readonly isLoading = signal(false);
  readonly error = signal('');
  readonly isFullscreen = signal(false);
  private imageFiles: Array<Blob & { name?: string; type: string }> = [];
  private pageSources: PageSource[] = [];
  private loadToken = 0;
  private pageFlipUrls: string[] = [];
  private fittedForPages: string[] | null = null;
  private readonly pageLetterboxCache = new Map<number, string>();
  private readonly processingPageIndices = new Set<number>();
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
    if (!this.canSplit()) {
      return;
    }

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
    this.imageFiles = [];
    this.pageSources = [];
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

      // A comic scanned as double-page spreads should start already split into readable
      // single pages; a normally-scanned (portrait) comic has nothing to split, so disable it.
      const isLandscapeScan = await this.detectLandscapeScan();
      if (token !== this.loadToken) {
        return;
      }
      this.canSplit.set(isLandscapeScan);
      this.splitSpreads.set(isLandscapeScan);
      // Default to a two-page spread only when the browser window itself is wide (landscape);
      // a narrow (portrait) window defaults to a single page at a time.
      this.twoPageMode.set(window.innerWidth > window.innerHeight);

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

  // Skip the cover (index 0), which is often a single portrait page even in an otherwise
  // double-page-per-scan comic - sample a later page to decide if the comic is scanned as
  // landscape spreads.
  private async detectLandscapeScan(): Promise<boolean> {
    const sampleIndex = Math.min(2, this.imageFiles.length - 1);
    const file = this.imageFiles[sampleIndex];
    if (!file) {
      return false;
    }

    const sourceUrl = URL.createObjectURL(file);
    try {
      const image = await this.loadImage(sourceUrl);
      return image.naturalWidth / image.naturalHeight >= SPREAD_ASPECT_RATIO_THRESHOLD;
    } catch {
      return false;
    } finally {
      URL.revokeObjectURL(sourceUrl);
    }
  }

  private async buildPages(token: number): Promise<void> {
    const pageSources = await this.buildPageSources(token);
    if (token !== this.loadToken) {
      return;
    }

    this.pageSources = pageSources;
    // Only holds placeholders for length/identity - actual page images are resolved lazily,
    // on demand, in ensurePagesProcessed().
    this.pages.set(pageSources.map((_, index) => String(index)));
    this.refreshPageFlip();
  }

  // Determines the final page list (splitting wide scans into two pages each) without
  // producing any page images yet - only decoding each source file once to read its
  // dimensions, since Split needs an accurate page count up front.
  private async buildPageSources(token: number): Promise<PageSource[]> {
    const pageSources: PageSource[] = [];
    const splitSpreads = this.splitSpreads();

    for (const [index, file] of this.imageFiles.entries()) {
      if (token !== this.loadToken) {
        return [];
      }

      // The cover (index 0) is never split, even if it happens to be a wide scan.
      if (!splitSpreads || index === 0) {
        pageSources.push({ file, half: null });
        continue;
      }

      const sourceUrl = URL.createObjectURL(file);
      try {
        const image = await this.loadImage(sourceUrl);
        const aspectRatio = image.naturalWidth / image.naturalHeight;
        if (aspectRatio < SPREAD_ASPECT_RATIO_THRESHOLD) {
          pageSources.push({ file, half: null });
        } else {
          pageSources.push({ file, half: 'left' }, { file, half: 'right' });
        }
      } finally {
        URL.revokeObjectURL(sourceUrl);
      }
    }

    return pageSources;
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
      const sourcePages = this.pages();
      const pageSources = this.pageSources;
      if (!container || sourcePages.length === 0) {
        return;
      }

      try {
        // Only decode/letterbox the page(s) actually about to be shown - not the whole
        // archive - unless the underlying page list itself changed (e.g. Split was toggled).
        if (sourcePages !== this.fittedForPages) {
          // Skip the cover (index 0), which is often a single portrait page even in an
          // otherwise double-page-per-scan comic - sample a later page instead.
          const sizingPageIndex = Math.min(2, sourcePages.length - 1);
          const pageRatio = await this.probePageRatio(pageSources[sizingPageIndex]);
          if (!Number.isFinite(pageRatio) || pageRatio <= 0) {
            return;
          }

          if (sourcePages !== this.pages()) {
            return;
          }

          this.pageAspectRatio.set(pageRatio);
          this.revokePageFlipUrls();
          this.processingPageIndices.clear();
          // page-flip immediately constructs an Image (and requests its src) for every entry
          // in this array, so a placeholder is used until a page is actually needed - handing
          // it every page's real blob URL up front would fetch/decode the whole archive at once.
          this.pageFlipUrls = sourcePages.map(() => PLACEHOLDER_PAGE_URL);
          this.fittedForPages = sourcePages;
        }

        const frameWidth = Math.max(1, container.nativeElement.clientWidth);
        const frameHeight = Math.max(1, container.nativeElement.clientHeight);
        const pageRatio = this.pageAspectRatio();
        const twoPageMode = this.twoPageMode();

        // Fit one (or two, side by side) pages into the available space while keeping
        // each page's true aspect ratio.
        let pageWidth = twoPageMode ? frameWidth / 2 : frameWidth;
        let pageHeight = pageWidth / pageRatio;
        if (pageHeight > frameHeight) {
          pageHeight = frameHeight;
          pageWidth = pageHeight * pageRatio;
        }
        pageWidth = Math.max(1, Math.floor(pageWidth));
        pageHeight = Math.max(1, Math.floor(pageHeight));

        const startPage = Math.min(this.currentPage(), this.pageFlipUrls.length - 1);

        // Make sure the page(s) about to be shown are fully processed before the book is
        // (re)built, so switching Pages/Split never flashes a blank placeholder for the
        // current view - only pages further ahead are left to load in the background.
        await this.ensurePagesProcessed(this.visibleIndicesFor(startPage));
        if (sourcePages !== this.pages()) {
          return;
        }

        // page-flip's destroy() removes the element it was given entirely from the DOM, so
        // it's never handed our own (Angular-owned, permanent) container - only a disposable
        // child of it, replaced on every rebuild.
        this.pageFlip?.destroy();
        const flipHost = document.createElement('div');
        container.nativeElement.replaceChildren(flipHost);
        this.pageFlip = new PageFlip(flipHost, {
          width: pageWidth,
          height: pageHeight,
          size: 'fixed' as SizeType,
          autoSize: false,
          showCover: true,
          drawShadow: true,
          maxShadowOpacity: 0.45,
          flippingTime: 1050,
          // Two-page mode always shows a spread; single-page mode always shows one page,
          // regardless of the container's own width.
          usePortrait: !twoPageMode,
          mobileScrollSupport: false,
          disableFlipByClick: true,
        });
        this.pageFlip.on('flip', (event) => {
          const pageIndex = Number(event.data);
          this.currentPage.set(pageIndex);
          void this.ensurePagesProcessed(this.prefetchIndicesFor(pageIndex));
        });
        this.pageFlip.loadFromImages(this.pageFlipUrls);
        this.pageFlip.turnToPage(startPage);
        void this.ensurePagesProcessed(this.prefetchIndicesFor(startPage));
      } catch (flipError) {
        this.error.set(flipError instanceof Error ? flipError.message : 'Unable to display the comic pages.');
      }
    });
  }

  // Pages paired in a spread starting right after the cover (index 0), matching page-flip's
  // own showCover pairing: [0], [1, 2], [3, 4], ...
  private visibleIndicesFor(pageIndex: number): number[] {
    if (!this.twoPageMode() || pageIndex === 0) {
      return [pageIndex];
    }

    const offset = pageIndex - 1;
    const pairStart = 1 + (offset - (offset % 2));
    return [pairStart, pairStart + 1].filter((index) => index < this.pages().length);
  }

  // The current spread plus several spreads ahead (and one behind), so flipping forward
  // never shows a blank placeholder while the destination page is still being processed.
  private prefetchIndicesFor(pageIndex: number): number[] {
    const pageCount = this.pages().length;
    const indices = new Set<number>();
    for (const candidate of [pageIndex - 1, pageIndex, pageIndex + 1, pageIndex + 2, pageIndex + 3, pageIndex + 4]) {
      if (candidate < 0 || candidate >= pageCount) {
        continue;
      }
      this.visibleIndicesFor(candidate).forEach((index) => indices.add(index));
    }
    return [...indices];
  }

  private async ensurePagesProcessed(indices: number[]): Promise<void> {
    const sourcePages = this.pages();
    const pageSources = this.pageSources;
    const pageRatio = this.pageAspectRatio();
    const pending = indices.filter(
      (index) =>
        index >= 0 &&
        index < sourcePages.length &&
        !this.pageLetterboxCache.has(index) &&
        !this.processingPageIndices.has(index)
    );
    if (pending.length === 0) {
      return;
    }

    pending.forEach((index) => this.processingPageIndices.add(index));
    try {
      const processedUrls = await Promise.all(
        pending.map((index) => this.resolveAndLetterboxPage(pageSources[index], pageRatio))
      );

      if (sourcePages !== this.pages()) {
        processedUrls.forEach((url) => URL.revokeObjectURL(url));
        return;
      }

      pending.forEach((index, position) => {
        this.pageLetterboxCache.set(index, processedUrls[position]);
        this.pageFlipUrls[index] = processedUrls[position];
      });
      this.pageFlip?.updateFromImages(this.pageFlipUrls);
    } finally {
      pending.forEach((index) => this.processingPageIndices.delete(index));
    }
  }

  // Reads just the natural dimensions of a page's source, cheap enough to do once per
  // rebuild without decoding the whole archive's worth of pages.
  private async probePageRatio(source: PageSource): Promise<number> {
    const sourceUrl = URL.createObjectURL(source.file);
    try {
      const image = await this.loadImage(sourceUrl);
      if (source.half === null) {
        return image.naturalWidth / image.naturalHeight;
      }
      const halfWidth = Math.floor(image.naturalWidth / 2);
      const width = source.half === 'left' ? halfWidth : image.naturalWidth - halfWidth;
      return width / image.naturalHeight;
    } finally {
      URL.revokeObjectURL(sourceUrl);
    }
  }

  // Decodes the source file once and, in a single pass, crops it to the requested half (if
  // any) and letterboxes it to the book's aspect ratio - only ever called for a page that's
  // actually about to be shown.
  private async resolveAndLetterboxPage(source: PageSource, pageRatio: number): Promise<string> {
    const sourceUrl = URL.createObjectURL(source.file);
    try {
      const image = await this.loadImage(sourceUrl);
      if (source.half === null) {
        return this.createContainedPageUrl(image, image.naturalWidth, image.naturalHeight, pageRatio);
      }

      const halfWidth = Math.floor(image.naturalWidth / 2);
      const sourceX = source.half === 'left' ? 0 : halfWidth;
      const width = source.half === 'left' ? halfWidth : image.naturalWidth - halfWidth;
      const region = this.extractRegion(image, sourceX, 0, width, image.naturalHeight);
      return this.createContainedPageUrl(region, width, image.naturalHeight, pageRatio);
    } finally {
      URL.revokeObjectURL(sourceUrl);
    }
  }

  private extractRegion(
    image: HTMLImageElement,
    sourceX: number,
    sourceY: number,
    width: number,
    height: number
  ): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Unable to prepare a split comic page.');
    }

    context.drawImage(image, sourceX, sourceY, width, height, 0, 0, width, height);
    return canvas;
  }

  private async createContainedPageUrl(
    source: CanvasImageSource,
    sourceWidth: number,
    sourceHeight: number,
    pageRatio: number
  ): Promise<string> {
    const imageBounds = this.findContentBounds(source, sourceWidth, sourceHeight);
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
    const boundsWidth = imageBounds.width;
    const boundsHeight = imageBounds.height;
    const scale = Math.min(canvasWidth / boundsWidth, canvasHeight / boundsHeight);
    const width = boundsWidth * scale;
    const height = boundsHeight * scale;
    context.drawImage(
      source,
      imageBounds.x,
      imageBounds.y,
      boundsWidth,
      boundsHeight,
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

  private findContentBounds(
    source: CanvasImageSource,
    sourceWidth: number,
    sourceHeight: number
  ): { x: number; y: number; width: number; height: number } {
    const scanWidth = Math.min(800, sourceWidth);
    const scanHeight = Math.max(1, Math.round((sourceHeight / sourceWidth) * scanWidth));
    const canvas = document.createElement('canvas');
    canvas.width = scanWidth;
    canvas.height = scanHeight;
    const context = canvas.getContext('2d');
    if (!context) {
      return { x: 0, y: 0, width: sourceWidth, height: sourceHeight };
    }

    context.drawImage(source, 0, 0, scanWidth, scanHeight);
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
      return { x: 0, y: 0, width: sourceWidth, height: sourceHeight };
    }

    const scaleX = sourceWidth / scanWidth;
    const scaleY = sourceHeight / scanHeight;
    return {
      x: Math.floor(left * scaleX),
      y: Math.floor(top * scaleY),
      width: Math.min(sourceWidth, Math.ceil((right - left + 1) * scaleX)),
      height: Math.min(sourceHeight, Math.ceil((bottom - top + 1) * scaleY)),
    };
  }

  private revokePageFlipUrls(): void {
    // pageFlipUrls is a mix of raw source URLs (owned by objectUrls) and letterboxed
    // URLs we created ourselves (cached in pageLetterboxCache) - only the latter are ours to revoke.
    this.pageLetterboxCache.forEach((pageUrl) => URL.revokeObjectURL(pageUrl));
    this.pageLetterboxCache.clear();
    this.pageFlipUrls = [];
  }

  private loadImage(sourceUrl: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error('Unable to decode a comic page image.'));
      image.src = sourceUrl;
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
