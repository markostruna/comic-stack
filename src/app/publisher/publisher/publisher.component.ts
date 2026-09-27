import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  QueryList,
  signal,
  ViewChildren,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ComicResolved, PublisherResolved } from '@app/@shared/models';
import { UserStateService } from '@app/@shared/user-state.service';
import { TranslateModule } from '@ngx-translate/core';
import { Grid, Keyboard } from 'swiper/modules';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ComicCardComponent } from '../comic-card.component';
import { AvailabilityFilter, ComicSearchFilters, PublisherService } from '../publisher.service';

export interface PublisherSection {
  name: string;
  path: string;
  comics: ComicResolved[];
  total: number;
  rows: number;
}

interface SwiperNavigationState {
  isBeginning: boolean;
  isEnd: boolean;
}

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgTemplateOutlet,
    ReactiveFormsModule,
    MatIcon,
    MatButton,
    MatIconButton,
    TranslateModule,
    ComicCardComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PublisherComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly publisherService = inject(PublisherService);
  private readonly userState = inject(UserStateService);

  readonly publishersFolder = 'Publishers/';
  readonly sections = signal<PublisherSection[]>([]);
  readonly swiperNavigation = signal<Record<string, SwiperNavigationState>>({});
  readonly isMobile = signal(false);
  readonly isLoading = signal(true);
  readonly search = new FormControl('', { nonNullable: true });
  readonly swiperModules = [Grid, Keyboard];
  private initialSlidesPerView = 2.2;
  private mobileQuery?: MediaQueryList;

  private readonly updateMobileLayout = (event: MediaQueryListEvent): void => {
    this.isMobile.set(event.matches);
  };

  @ViewChildren('sectionSwiper', { read: ElementRef })
  private readonly swiperElements!: QueryList<ElementRef<HTMLElement & { swiper?: unknown }>>;

  ngOnInit(): void {
    this.initialSlidesPerView = this.getSlidesPerView(window.innerWidth);
    this.mobileQuery = window.matchMedia?.('(max-width: 599px)');
    this.isMobile.set(this.mobileQuery?.matches ?? window.innerWidth < 600);
    this.mobileQuery?.addEventListener('change', this.updateMobileLayout);
    this.loadData();
  }

  ngOnDestroy(): void {
    this.mobileQuery?.removeEventListener('change', this.updateMobileLayout);
  }

  ngAfterViewInit(): void {
    this.swiperElements.changes.subscribe(() => {
      this.initializeSwipers();
      this.refreshSwiperNavigation();
    });
    this.initializeSwipers();
    this.refreshSwiperNavigation();
  }

  loadData() {
    forkJoin({
      publishers: this.publisherService.getPublishers(this.publishersFolder),
      comics: this.publisherService.getPublisherPreviewComics(),
      continueReadingComics: this.publisherService.searchComics(this.filtersFor('InProgress'), 1, 20),
      bookmarkedComics: this.publisherService.searchComics(this.filtersFor('Bookmarked'), 1, 20),
      continueReading: this.userState.readContinueReading().pipe(catchError(() => of([]))),
      bookmarks: this.userState.readBookmarks().pipe(catchError(() => of([]))),
    }).subscribe({
      next: ({ publishers, comics, continueReadingComics, bookmarkedComics, continueReading, bookmarks }) => {
        if (publishers.length === 0) {
          this.sections.set([]);
          this.isLoading.set(false);
          return;
        }

        const comicsByPublisher = new Map<string, ComicResolved[]>();
        for (const comic of comics) {
          const group = comicsByPublisher.get(comic.publisher);
          if (group) {
            group.push(comic);
          } else {
            comicsByPublisher.set(comic.publisher, [comic]);
          }
        }
        const comicGroups = publishers.map((publisher) => comicsByPublisher.get(publisher.name) ?? []);
        const markedContinueReading = this.decorateComics(
          [continueReadingComics.items],
          continueReading,
          bookmarks
        ).continueReading;
        const markedBookmarks = this.decorateComics([bookmarkedComics.items], continueReading, bookmarks).bookmarks;
        this.updateSections(
          publishers,
          comicGroups,
          continueReading,
          bookmarks,
          markedContinueReading,
          continueReadingComics.total,
          markedBookmarks,
          bookmarkedComics.total
        );
        this.isLoading.set(false);
      },
      error: () => {
        this.sections.set([]);
        this.isLoading.set(false);
      },
    });
  }

  private updateSections(
    publishers: PublisherResolved[],
    comicGroups: ComicResolved[][],
    continueReading: Array<{ id: number; pageIndex: number; totalPages: number }>,
    bookmarks: Array<{ comicId: number }>,
    continueReadingComics: ComicResolved[],
    continueReadingTotal: number,
    bookmarkedComics: ComicResolved[],
    bookmarkedTotal: number
  ): void {
    const markedComics = this.decorateComics(comicGroups, continueReading, bookmarks);
    const specialSections = [
      this.createSpecialSection('Continue reading', 'continue-reading', continueReadingComics, continueReadingTotal),
      this.createSpecialSection(
        'Bookmarks',
        'bookmarks',
        bookmarkedComics,
        bookmarkedTotal
      ),
    ].filter((section): section is PublisherSection => section !== undefined);
    this.sections.set([
      ...specialSections,
      ...publishers
        .map((publisher, index) => this.createSection(publisher, markedComics.allByPublisher[index]))
        .filter((section): section is PublisherSection => section !== undefined),
    ]);
    this.initializeSwiperNavigation(this.sections());
  }

  submitSearch(): void {
    const title = this.search.value.trim();
    this.router.navigate(['/search'], { queryParams: title ? { title } : {} });
  }

  searchPublisher(publisher: string): void {
    this.router.navigate(['/search'], { queryParams: { publisher } });
  }

  searchSpecialSection(sectionPath: string): void {
    const availability = sectionPath === 'continue-reading' ? 'InProgress' : 'Bookmarked';
    this.router.navigate(['/search'], { queryParams: { availability } });
  }

  private filtersFor(availability: AvailabilityFilter): ComicSearchFilters {
    return { title: '', hero: 'All', publisher: 'All', collection: 'All', availability };
  }

  trackByPublisher(_index: number, item: PublisherSection): string {
    return item.path;
  }

  trackByComic(_index: number, item: ComicResolved): string {
    return item.path;
  }

  isInitialViewportComic(sectionIndex: number, comicIndex: number, rows: number): boolean {
    if (sectionIndex !== 0) {
      return false;
    }

    return comicIndex < Math.ceil(this.initialSlidesPerView) * rows;
  }

  private getSlidesPerView(viewportWidth: number): number {
    return viewportWidth >= 1200 ? 7.5 : viewportWidth >= 900 ? 5.5 : viewportWidth >= 600 ? 3.5 : 2.2;
  }

  slidePrevious(sectionPath: string): void {
    const swiper = this.getSectionSwiper(sectionPath);
    (swiper as (HTMLElement & { swiper?: { slidePrev: () => void } }) | undefined)?.swiper?.slidePrev();
    if (swiper) {
      setTimeout(() => this.updateSwiperNavigation(sectionPath, swiper));
    }
  }

  slideNext(sectionPath: string): void {
    const swiper = this.getSectionSwiper(sectionPath);
    (swiper as (HTMLElement & { swiper?: { slideNext: () => void } }) | undefined)?.swiper?.slideNext();
    if (swiper) {
      setTimeout(() => this.updateSwiperNavigation(sectionPath, swiper));
    }
  }

  onSwiperStateChange(sectionPath: string, event: Event): void {
    const customEvent = event as CustomEvent;
    const swiperFromEvent = Array.isArray(customEvent.detail) ? customEvent.detail[0] : customEvent.detail;
    this.updateSwiperNavigation(sectionPath, {
      swiper: swiperFromEvent ?? (event.target as { swiper?: unknown } | null)?.swiper,
    });
  }

  private createSection(publisher: PublisherResolved, comics: ComicResolved[]): PublisherSection | undefined {
    const availableComics = comics.filter((comic) => comic.missing !== true && comic.comicMissing !== true);
    if (availableComics.length < 2) {
      return undefined;
    }

    return {
      name: publisher.name,
      path: publisher.path,
      comics: availableComics.slice(0, 20),
      total: availableComics.length,
      rows: availableComics.length >= 10 ? 2 : 1,
    };
  }

  private createSpecialSection(
    name: string,
    path: string,
    comics: ComicResolved[],
    total = comics.length
  ): PublisherSection | undefined {
    if (comics.length === 0) {
      return undefined;
    }

    return { name, path, comics, total, rows: comics.length >= 10 ? 2 : 1 };
  }

  private decorateComics(
    comicGroups: ComicResolved[][],
    continueReading: Array<{ id: number; pageIndex: number; totalPages: number }>,
    bookmarks: Array<{ comicId: number }>
  ): {
    allByPublisher: ComicResolved[][];
    continueReading: ComicResolved[];
    bookmarks: ComicResolved[];
  } {
    const comics = comicGroups.flat();
    const progressById = new Map(
      continueReading.filter((entry) => entry.pageIndex > 0).map((entry) => [entry.id, entry])
    );
    const bookmarkedIds = new Set(bookmarks.map((bookmark) => bookmark.comicId));
    const decorated = comics.map((comic) => {
      const id = (comic as ComicResolved & { id?: number }).id;
      const progress = id === undefined ? undefined : progressById.get(id);
      return {
        ...comic,
        readingProgress: progress ? { pageIndex: progress.pageIndex, totalPages: progress.totalPages } : undefined,
        bookmarked: id !== undefined && bookmarkedIds.has(id),
      };
    });
    const decoratedByComic = new Map(comics.map((comic, index) => [comic, decorated[index]]));

    return {
      allByPublisher: comicGroups.map((group) => group.map((comic) => decoratedByComic.get(comic)!)),
      continueReading: decorated.filter((comic) => comic.readingProgress !== undefined),
      bookmarks: decorated.filter((comic) => comic.bookmarked === true),
    };
  }

  private updateSwiperNavigation(sectionPath: string, target: { swiper?: unknown }): void {
    const section = this.sections().find((item) => item.path === sectionPath);
    const swiper = target.swiper as
      | { isBeginning?: boolean; isEnd?: boolean; slides?: unknown[]; update?: () => void }
      | undefined;
    if (!swiper) {
      return;
    }

    if (swiper.slides && section && swiper.slides.length < section.comics.length) {
      return;
    }

    this.swiperNavigation.update((states) => ({
      ...states,
      [sectionPath]: {
        isBeginning: swiper.isBeginning === true,
        isEnd: swiper.isEnd === true,
      },
    }));
  }

  private initializeSwiperNavigation(sections: PublisherSection[]): void {
    this.swiperNavigation.set(
      Object.fromEntries(
        sections.map((section) => [
          section.path,
          {
            isBeginning: true,
            isEnd: section.comics.length <= 2,
          },
        ])
      )
    );
  }

  private refreshSwiperNavigation(): void {
    this.swiperElements?.forEach((element, index) => {
      const section = this.sections()[index];
      if (section) {
        this.updateSwiperNavigation(section.path, element.nativeElement);
      }
    });
  }

  private getSectionSwiper(sectionPath: string): HTMLElement & { swiper?: unknown } | undefined {
    return this.swiperElements
      ?.find((element) => element.nativeElement.dataset['sectionPath'] === sectionPath)
      ?.nativeElement as (HTMLElement & { swiper?: unknown }) | undefined;
  }

  private initializeSwipers(): void {
    requestAnimationFrame(() => {
      this.swiperElements?.forEach((element) => {
        const swiperElement = element.nativeElement as HTMLElement & {
          initialize?: () => void;
          swiper?: unknown;
        };
        if (!swiperElement.swiper) {
          swiperElement.initialize?.();
        }
      });
    });
  }
}
