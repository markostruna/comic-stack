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
import { environment } from '@env/environment';
import { UserStateService } from '@app/@shared/user-state.service';
import { PageFlip } from 'page-flip';
import type { FlipCorner, SizeType } from 'page-flip';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIcon],
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
  readonly isLoading = signal(false);
  readonly error = signal('');
  readonly isFullscreen = signal(false);
  readonly isSavingBookmark = signal(false);
  readonly bookmarkMessage = signal('');
  private loadToken = 0;
  private pageFlipUrls: string[] = [];
  private fittedForPages: string[] | null = null;
  private pageFlip: PageFlip | null = null;
  private remoteMode = false;
  private comicId = 0;
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
    if (this.canSplit()) this.splitSpreads.update((enabled) => !enabled);
  }

  changeZoom(delta: number): void {
    this.zoom.update((value) => Math.min(2.5, Math.max(0.5, Math.round((value + delta) * 10) / 10)));
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

  private async loadRemoteComic(comicId: number): Promise<void> {
    const token = ++this.loadToken;
    this.comicId = comicId;
    this.remoteMode = true;
    this.isLoading.set(true);
    this.error.set('');
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
      this.canSplit.set(false);
      this.splitSpreads.set(false);
      const sizedPage = pages.find((page) => page.width && page.height);
      if (sizedPage?.width && sizedPage.height) {
        this.pageAspectRatio.set(sizedPage.width / sizedPage.height);
      }
      this.pages.set(pages.map((page) => `${environment.apiUrl}comics/${comicId}/pages/${page.idx}`));
      this.pageFlipUrls = this.pages();
      this.currentPage.set(Math.min(progress.pageIndex ?? 0, Math.max(0, this.pages().length - 1)));
      this.fittedForPages = null;
      this.refreshPageFlip();
    } catch (loadError) {
      this.error.set(loadError instanceof Error ? loadError.message : 'Unable to load comic pages.');
    } finally {
      if (token === this.loadToken) this.isLoading.set(false);
    }
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
      if (!container || sourcePages.length === 0) {
        return;
      }

      try {
        if (sourcePages !== this.fittedForPages) {
          const pageRatio = this.pageAspectRatio();
          if (!Number.isFinite(pageRatio) || pageRatio <= 0) {
            return;
          }

          if (sourcePages !== this.pages()) {
            return;
          }

          this.pageAspectRatio.set(pageRatio);
          this.revokePageFlipUrls();
          this.pageFlipUrls = sourcePages;
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
          this.queueProgressWrite(pageIndex);
        });
        this.pageFlip.loadFromImages(this.pageFlipUrls);
        this.pageFlip.turnToPage(startPage);
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
}
