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
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { environment } from '@env/environment';
import { UserStateService } from '@app/@shared/user-state.service';
import { PageFlip } from 'page-flip';
import type { Page, SizeType } from 'page-flip';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIcon, MatButton, MatIconButton],
})
export class ReaderComponent implements AfterViewInit, OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly http = inject(HttpClient);
  private readonly userState = inject(UserStateService);
  @ViewChild('pageFlipContainer') private pageFlipContainer?: ElementRef<HTMLElement>;

  readonly title = signal('Comic reader');
  readonly pages = signal<string[]>([]);
  readonly currentPage = signal(0);
  readonly twoPageMode = signal(false);
  readonly splitSpreads = signal(false);
  readonly canSplit = signal(false);
  readonly zoom = signal(1);
  readonly pageAspectRatio = signal(800 / 1120);
  private sourcePageAspectRatio = 800 / 1120;
  readonly isLoading = signal(false);
  readonly error = signal('');
  readonly isFullscreen = signal(false);
  readonly isControlsOpen = signal(true);
  readonly isSavingBookmark = signal(false);
  readonly bookmarkMessage = signal('');
  private loadToken = 0;
  private pageFlipUrls: string[] = [];
  private fittedForPages: string[] | null = null;
  private pageFlip: PageFlip | null = null;
  private remoteMode = false;
  private comicId = 0;
  private pageAspectRatioPages: string[] | null = null;
  private pageSpreadFlags: boolean[] = [];
  private displayPageUrls: string[] = [];
  private displayPageSourceIndices: number[] = [];
  private displayPageHalves: Array<'left' | 'right' | null> = [];
  private readonly processedDisplayPageUrls = new Map<number, string>();
  private displayPagesAreSplit = false;
  private initializingPageFlip = false;
  private readonly pagePrefetchBehind = 4;
  private readonly pagePrefetchAhead = 4;
  private pageFlipWindowStart = 0;
  private pageFlipWindowEnd = 0;
  private readonly prefetchedPageUrls = new Set<string>();
  private readonly unloadedPagePlaceholder = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
  private progressTimeoutId?: number;
  private resizeTimeoutId?: number;

  ngAfterViewInit(): void {
    this.refreshPageFlip();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const comicId = params.get('comicId');
      if (!comicId) {
        this.error.set('No comic was selected.');
        return;
      }

      void this.loadRemoteComic(Number(comicId));
    });
  }

  ngOnDestroy(): void {
    this.pageFlip?.destroy();
    this.revokePageFlipUrls();
    window.clearTimeout(this.resizeTimeoutId);
    window.clearTimeout(this.progressTimeoutId);
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
    this.setAutomaticPageMode();
  }

  @HostListener('document:fullscreenchange')
  handleFullscreenChange(): void {
    const isFullscreen = document.fullscreenElement === this.pageFlipContainer?.nativeElement.closest('.reader-page');
    this.isFullscreen.set(isFullscreen);
    requestAnimationFrame(() => requestAnimationFrame(() => this.refreshPageFlip()));
  }

  nextPage(): void {
    if (!this.canGoNext()) {
      return;
    }

    this.flipFromCorner('forward', 'bottom');
  }

  previousPage(): void {
    if (!this.canGoPrevious()) {
      return;
    }

    if (this.twoPageMode()) {
      this.flipFromCorner('back', 'top');
      return;
    }

    this.flipBackRevealingPreviousPage();
  }

  // In single-page mode page-flip draws a full two-page book but hard-clips the canvas to
  // its right half, so nothing rendered into the left half is ever visible - which is where
  // its own backward flip lives. The only motion it can show here is the forward one, so
  // play that backwards: the previous page swings out from the spine and covers the current
  // page left-to-right, the exact mirror of the forward peel.
  private flipBackRevealingPreviousPage(): void {
    const pageFlip = this.pageFlip;
    if (!pageFlip) {
      return;
    }

    const render = pageFlip.getRender();
    // Settle any flip still in flight before taking over the animation slot.
    render.finishAnimation();

    const pageCollection = pageFlip.getPageCollection();
    const currentPageIndex = pageCollection.getCurrentPageIndex();
    const flipController = pageFlip.getFlipController();
    const rect = pageFlip.getBoundsRect();

    // Set up a forward flip purely for its geometry - it is the one drawn in the visible
    // half. A forward flip is refused on the last page, so report one more while it starts.
    const originalGetPageCount = pageFlip.getPageCount;
    pageFlip.getPageCount = () => originalGetPageCount.call(pageFlip) + 1;
    let started = false;
    try {
      started = flipController.start({ x: rect.left + rect.width - 10, y: rect.top + rect.height - 2 });
    } finally {
      pageFlip.getPageCount = originalGetPageCount;
    }

    if (!started) {
      return;
    }

    // A flip only draws the folded-over flap; the flat part of the turning page is the
    // static right page, and the page being revealed is the bottom one. Played in reverse
    // the turning page is the one arriving, so the previous page has to be both the flap
    // and the static page, with the current page revealed beneath it.
    const internals = flipController as unknown as {
      flippingPage: Page | null;
      bottomPage: Page | null;
      calc: unknown;
      state: string;
    };
    const previousPage = pageCollection.getPage(currentPageIndex - 1);
    internals.flippingPage = previousPage;
    internals.bottomPage = pageCollection.getPage(currentPageIndex);
    render.setRightPage(previousPage);

    // Walk the forward flip's path in reverse: from fully turned over (off to the left,
    // out of view) to lying flat across the page.
    const margin = rect.height / 10;
    const from = { x: -rect.pageWidth, y: rect.height };
    const to = { x: rect.pageWidth - margin, y: rect.height - margin };
    const steps = Math.max(1, Math.round(Math.max(Math.abs(to.x - from.x), Math.abs(to.y - from.y))));
    const frames = [];
    for (let step = 0; step <= steps; step++) {
      const progress = step / steps;
      const point = render.convertToGlobal({
        x: from.x + (to.x - from.x) * progress,
        y: from.y + (to.y - from.y) * progress,
      });
      frames.push(() => flipController.fold(point));
    }

    const flippingTime = pageFlip.getSettings().flippingTime;
    render.startAnimation(frames, steps >= 1000 ? flippingTime : (steps / 1000) * flippingTime, () => {
      // The previous page is already the one on screen, so this settles without a jump.
      pageFlip.turnToPrevPage();
      // page-flip clears these with null itself; its typings just don't admit it.
      render.setBottomPage(null as unknown as Page);
      render.setFlippingPage(null as unknown as Page);
      render.clearShadow();
      internals.flippingPage = null;
      internals.bottomPage = null;
      internals.calc = null;
      internals.state = 'read';
    });
  }

  // page-flip's own flipNext()/flipPrev() build the synthetic touch point from hard-coded
  // window coordinates that only line up when the book fills its container. Whenever the
  // pages are letterboxed (the frame is wider/taller than the fitted spread) the point
  // falls outside the book, disableFlipByClick rejects it, and the flip is dropped. Build
  // the point from the book's own bounds instead so it always lands on the right corner.
  private flipFromCorner(direction: 'forward' | 'back', corner: 'top' | 'bottom'): void {
    const pageFlip = this.pageFlip;
    if (!pageFlip) {
      return;
    }

    const rect = pageFlip.getBoundsRect();
    pageFlip.getFlipController().flip({
      x: direction === 'forward' ? rect.left + rect.width - 10 : rect.left + 10,
      y: rect.top + (corner === 'top' ? 1 : rect.height - 2),
    });
  }

  toggleTwoPageMode(): void {
    const currentPage = this.pageFlip?.getCurrentPageIndex();
    if (currentPage !== undefined) {
      this.currentPage.set(currentPage);
    }
    this.twoPageMode.update((enabled) => !enabled);
    this.fittedForPages = null;
    this.refreshPageFlip();
  }

  toggleSplitSpreads(): void {
    if (!this.canSplit()) return;
    const enabled = !this.splitSpreads();
    if (!enabled) {
      this.currentPage.set(this.displayPageSourceIndices[this.currentPage()] ?? this.currentPage());
    }
    this.splitSpreads.set(enabled);
    this.fittedForPages = null;
    this.processedDisplayPageUrls.clear();
    this.refreshPageFlip();
  }

  changeZoom(delta: number): void {
    this.zoom.update((value) => Math.min(2.5, Math.max(0.5, Math.round((value + delta) * 10) / 10)));
  }

  toggleControls(): void {
    this.isControlsOpen.update((open) => !open);
  }

  saveBookmark(): void {
    if (!this.comicId || this.isSavingBookmark()) return;
    this.isSavingBookmark.set(true);
    this.bookmarkMessage.set('');
    firstValueFrom(this.userState.createBookmark(this.comicId, this.currentPage()))
      .then(() => {
        this.bookmarkMessage.set('Bookmark saved.');
      })
      .catch(() => {
        this.bookmarkMessage.set('Unable to save bookmark.');
      })
      .finally(() => this.isSavingBookmark.set(false));
  }

  async toggleFullscreen(container: HTMLElement): Promise<void> {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    await container.requestFullscreen();
  }

  canGoPrevious(): boolean {
    return (this.pageFlip?.getCurrentPageIndex() ?? this.currentPage()) > 0;
  }

  canGoNext(): boolean {
    const pageCount = this.displayPageUrls.length || this.pages().length;
    return (this.pageFlip?.getCurrentPageIndex() ?? this.currentPage()) + 1 < pageCount;
  }

  private async loadRemoteComic(comicId: number): Promise<void> {
    const token = ++this.loadToken;
    this.comicId = comicId;
    this.remoteMode = true;
    this.prefetchedPageUrls.clear();
    this.isLoading.set(true);
    this.error.set('');
    this.sourcePageAspectRatio = 800 / 1120;
    this.pageAspectRatio.set(this.sourcePageAspectRatio);
    try {
      const [comic, pages, progress] = await Promise.all([
        firstValueFrom(
          this.http.get<{ title_resolved?: string; titlesResolved?: string }>(`${environment.apiUrl}comics/${comicId}`)
        ),
        firstValueFrom(
          this.http.get<Array<{ idx: number; width: number | null; height: number | null; isSpread: boolean }>>(
            `${environment.apiUrl}comics/${comicId}/pages`
          )
        ),
        firstValueFrom(this.http.get<{ pageIndex: number }>(`${environment.apiUrl}comics/${comicId}/progress`)),
      ]);
      if (token !== this.loadToken) return;
      this.title.set(comic.titlesResolved || comic.title_resolved || 'Comic reader');
      const sizedPage = pages.find((page) => page.width && page.height);
      if (sizedPage?.width && sizedPage.height) {
        this.sourcePageAspectRatio = sizedPage.width / sizedPage.height;
        this.pageAspectRatio.set(this.sourcePageAspectRatio);
      }
      this.pages.set(pages.map((page) => `${environment.apiUrl}comics/${comicId}/pages/${page.idx}`));
      this.currentPage.set(Math.min(progress.pageIndex ?? 0, Math.max(0, this.pages().length - 1)));
      this.fittedForPages = null;
      this.pageAspectRatioPages = null;
      this.displayPageUrls = [];
      this.displayPageSourceIndices = [];
      this.displayPageHalves = [];
      this.pageSpreadFlags = pages.map(
        (page) => Boolean(page.isSpread) || Boolean(page.width && page.height && page.width / page.height >= 1.35)
      );
      this.processedDisplayPageUrls.clear();
      this.setOrientationDefaults(this.pageAspectRatio());
      this.refreshPageFlip();
    } catch (loadError) {
      this.error.set(loadError instanceof Error ? loadError.message : 'Unable to load comic pages.');
    } finally {
      if (token === this.loadToken) {
        this.isLoading.set(false);
        window.setTimeout(() => this.refreshPageFlip(), 0);
      }
    }
  }

  private refreshPageFlip(): void {
    if (this.pages().length === 0) {
      return;
    }

    if (!this.pageFlipContainer) {
      return;
    }

    window.setTimeout(async () => {
      const container = this.pageFlipContainer;
      const sourcePages = this.pages();
      if (!container || sourcePages.length === 0) {
        return;
      }

      try {
        const wasSplit = this.displayPagesAreSplit;
        if (sourcePages !== this.fittedForPages) {
          let pageRatio = this.sourcePageAspectRatio;
          if (sourcePages !== this.pageAspectRatioPages) {
            const orientationPage = sourcePages[Math.min(3, sourcePages.length - 1)];
            const detectedRatio = await this.detectPageAspectRatio(orientationPage);
            if (detectedRatio) {
              pageRatio = detectedRatio;
              this.sourcePageAspectRatio = detectedRatio;
              this.pageAspectRatio.set(detectedRatio);
              if (!this.pageSpreadFlags.some(Boolean) && detectedRatio >= 1.35) {
                this.pageSpreadFlags = sourcePages.map((_pageUrl, pageIndex) => pageIndex > 0);
              }
            }
            this.setOrientationDefaults(pageRatio);
            this.pageAspectRatioPages = sourcePages;
          }

          if (!Number.isFinite(pageRatio) || pageRatio <= 0) {
            return;
          }

          if (sourcePages !== this.pages()) {
            return;
          }

          this.pageAspectRatio.set(pageRatio);
          this.revokePageFlipUrls();
          if (this.splitSpreads()) {
            this.displayPageUrls = [];
            this.displayPageSourceIndices = [];
            this.displayPageHalves = [];
            sourcePages.forEach((pageUrl, pageIndex) => {
              if (pageIndex > 0 && this.pageSpreadFlags[pageIndex]) {
                this.displayPageUrls.push(pageUrl, pageUrl);
                this.displayPageSourceIndices.push(pageIndex, pageIndex);
                this.displayPageHalves.push('left', 'right');
              } else {
                this.displayPageUrls.push(pageUrl);
                this.displayPageSourceIndices.push(pageIndex);
                this.displayPageHalves.push(null);
              }
            });
            if (pageRatio >= 1.35) {
              this.pageAspectRatio.set(pageRatio / 2);
            }
          } else {
            this.displayPageUrls = sourcePages;
            this.displayPageSourceIndices = sourcePages.map((_pageUrl, pageIndex) => pageIndex);
            this.displayPageHalves = sourcePages.map(() => null);
          }
          this.displayPagesAreSplit = this.splitSpreads();
          this.fittedForPages = sourcePages;
        }

        const displayPages = this.displayPageUrls;
        const currentPage = this.currentPage();
        const visiblePageCount = this.twoPageMode() ? 2 : 1;
        this.pageFlipWindowStart = Math.max(0, currentPage - this.pagePrefetchBehind);
        this.pageFlipWindowEnd = Math.min(
          displayPages.length - 1,
          currentPage + visiblePageCount + this.pagePrefetchAhead - 1
        );
        this.pageFlipUrls = displayPages.map(() => this.unloadedPagePlaceholder);
        await this.processDisplayPageWindow(displayPages);

        const frameWidth = Math.max(1, container.nativeElement.clientWidth);
        const frameHeight = Math.max(1, container.nativeElement.clientHeight);
        const pageRatio = this.pageAspectRatio();
        const twoPageMode = this.twoPageMode();

        // Fit one (or two, side by side) pages into the available space while keeping
        // each page's true aspect ratio.
        // page-flip switches to portrait only when the container is narrower than
        // two configured page widths, so make single-page mode explicit here.
        let pageWidth = twoPageMode ? frameWidth / 2 : frameWidth + 1;
        let pageHeight = pageWidth / pageRatio;
        if (pageHeight > frameHeight) {
          pageHeight = frameHeight;
          pageWidth = pageHeight * pageRatio;
        }
        pageWidth = Math.max(1, Math.floor(pageWidth));
        pageHeight = Math.max(1, Math.floor(pageHeight));

        const startPage = Math.min(
          Math.max(
            0,
            this.splitSpreads() && !wasSplit
              ? this.displayPageSourceIndices.findIndex((pageIndex) => pageIndex >= this.currentPage())
              : this.currentPage()
          ),
          this.pageFlipUrls.length - 1
        );

        if (sourcePages !== this.pages()) {
          return;
        }

        // page-flip's destroy() removes the element it was given entirely from the DOM, so
        // it's never handed our own (Angular-owned, permanent) container - only a disposable
        // child of it, replaced on every rebuild.
        this.pageFlip?.destroy();
        const flipHost = document.createElement('div');
        if (!twoPageMode) {
          flipHost.style.width = `${pageWidth}px`;
          flipHost.style.margin = '0 auto';
        }
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
          this.queueProgressWrite(this.displayPageSourceIndices[pageIndex] ?? pageIndex);
          const visiblePageCount = this.twoPageMode() ? 2 : 1;
          if (!this.splitSpreads()) {
            this.prefetchPages(sourcePages, pageIndex + visiblePageCount, this.pagePrefetchAhead);
          }
          const needsWindowRefresh =
            pageIndex < this.pageFlipWindowStart + 1 || pageIndex >= this.pageFlipWindowEnd - visiblePageCount + 1;
          if (!this.initializingPageFlip && needsWindowRefresh) {
            this.refreshPageFlip();
          }
        });
        this.initializingPageFlip = true;
        this.pageFlip.loadFromImages(this.pageFlipUrls);
        this.pageFlip.turnToPage(startPage);
        this.initializingPageFlip = false;
      } catch (flipError) {
        this.error.set(flipError instanceof Error ? flipError.message : 'Unable to display the comic pages.');
      }
    });
  }

  private queueProgressWrite(pageIndex: number): void {
    if (!this.remoteMode || !this.comicId) return;
    window.clearTimeout(this.progressTimeoutId);
    this.progressTimeoutId = window.setTimeout(() => {
      void firstValueFrom(
        this.http.put(`${environment.apiUrl}comics/${this.comicId}/progress`, {
          pageIndex,
          totalPages: this.pages().length,
        })
      );
    }, 500);
  }

  private revokePageFlipUrls(): void {
    this.pageFlipUrls = [];
  }

  private detectPageAspectRatio(pageUrl: string): Promise<number | null> {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = () =>
        resolve(image.naturalWidth > 0 && image.naturalHeight > 0 ? image.naturalWidth / image.naturalHeight : null);
      image.onerror = () => resolve(null);
      image.src = pageUrl;
    });
  }

  private async processDisplayPageWindow(displayPages: string[]): Promise<void> {
    const imagePromises = new Map<string, Promise<HTMLImageElement>>();
    const pending: Promise<void>[] = [];

    for (let pageIndex = this.pageFlipWindowStart; pageIndex <= this.pageFlipWindowEnd; pageIndex++) {
      const pageUrl = displayPages[pageIndex];
      const half = this.displayPageHalves[pageIndex];
      if (!pageUrl) continue;

      const cachedUrl = this.processedDisplayPageUrls.get(pageIndex);
      if (cachedUrl) {
        this.pageFlipUrls[pageIndex] = cachedUrl;
        continue;
      }

      if (!half) {
        this.pageFlipUrls[pageIndex] = pageUrl;
        continue;
      }

      let imagePromise = imagePromises.get(pageUrl);
      if (!imagePromise) {
        imagePromise = this.loadImage(pageUrl);
        imagePromises.set(pageUrl, imagePromise);
      }

      pending.push(
        imagePromise.then((image) => {
          const halfWidth = Math.floor(image.naturalWidth / 2);
          const sourceX = half === 'left' ? 0 : halfWidth;
          const width = half === 'left' ? halfWidth : image.naturalWidth - halfWidth;
          const processedUrl = this.cropImage(image, sourceX, width);
          this.processedDisplayPageUrls.set(pageIndex, processedUrl);
          this.pageFlipUrls[pageIndex] = processedUrl;
        })
      );
    }

    await Promise.all(pending);
  }

  private loadImage(pageUrl: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error('Unable to load comic page.'));
      image.src = pageUrl;
    });
  }

  private cropImage(image: HTMLImageElement, sourceX: number, width: number): string {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = image.naturalHeight;
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Unable to split comic page.');
    }

    context.drawImage(image, sourceX, 0, width, image.naturalHeight, 0, 0, width, image.naturalHeight);
    return canvas.toDataURL('image/jpeg', 0.92);
  }

  private setOrientationDefaults(pageRatio: number): void {
    const isLandscape = pageRatio > 1;
    this.canSplit.set(isLandscape);
    this.splitSpreads.set(isLandscape);
    this.setAutomaticPageMode();
  }

  private setAutomaticPageMode(): void {
    const isLandscapeViewport = window.innerWidth > window.innerHeight;
    this.twoPageMode.set(isLandscapeViewport);
    this.fittedForPages = null;
  }

  private prefetchPages(sourcePages: string[], startPage: number, count: number): void {
    for (let pageIndex = startPage; pageIndex < startPage + count && pageIndex < sourcePages.length; pageIndex++) {
      const pageUrl = sourcePages[pageIndex];
      if (!pageUrl || this.prefetchedPageUrls.has(pageUrl)) {
        continue;
      }

      this.prefetchedPageUrls.add(pageUrl);
      const image = new Image();
      image.src = pageUrl;
    }
  }
}
