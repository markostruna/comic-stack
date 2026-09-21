import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  OnInit,
  QueryList,
  signal,
  ViewChildren,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ComicResolved, PublisherResolved } from '@app/@shared/models';
import { UserStateService } from '@app/@shared/user-state.service';
import { TranslateModule } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { ComicCardComponent } from '../comic-card.component';
import { PublisherService } from '../publisher.service';

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
  imports: [ReactiveFormsModule, MatIcon, MatButton, MatIconButton, TranslateModule, ComicCardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PublisherComponent implements OnInit, AfterViewInit {
  private readonly router = inject(Router);
  private readonly publisherService = inject(PublisherService);
  private readonly userState = inject(UserStateService);

  readonly publishersFolder = 'Publishers/';
  readonly sections = signal<PublisherSection[]>([]);
  readonly swiperNavigation = signal<Record<string, SwiperNavigationState>>({});
  readonly isLoading = signal(true);
  readonly search = new FormControl('', { nonNullable: true });

  @ViewChildren('sectionSwiper', { read: ElementRef })
  private readonly swiperElements!: QueryList<ElementRef<HTMLElement & { swiper?: unknown }>>;

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.swiperElements.changes.subscribe(() => this.refreshSwiperNavigation());
    this.refreshSwiperNavigation();
    setTimeout(() => this.refreshSwiperNavigation());
  }

  loadData() {
    this.publisherService.getPublishers(this.publishersFolder).subscribe({
      next: (publishers) => {
        if (publishers.length === 0) {
          this.sections.set([]);
          this.isLoading.set(false);
          return;
        }

        forkJoin({
          comicGroups: forkJoin(
            publishers.map((publisher) =>
              this.publisherService.getComics(`${this.publishersFolder}${publisher.name}/`, publisher.name)
            )
          ),
          continueReading: this.userState.readContinueReading(),
          bookmarks: this.userState.readBookmarks(),
        }).subscribe({
          next: ({ comicGroups, continueReading, bookmarks }) => {
            const markedComics = this.decorateComics(comicGroups, continueReading, bookmarks);
            const specialSections = [
              this.createSpecialSection('Continue reading', 'continue-reading', markedComics.continueReading),
              this.createSpecialSection('Bookmarks', 'bookmarks', markedComics.bookmarks),
            ].filter((section): section is PublisherSection => section !== undefined);
            this.sections.set([
              ...specialSections,
              ...publishers
                .map((publisher, index) => this.createSection(publisher, markedComics.allByPublisher[index]))
                .filter((section): section is PublisherSection => section !== undefined),
            ]);
            this.initializeSwiperNavigation(this.sections());
            this.isLoading.set(false);
            queueMicrotask(() => this.refreshSwiperNavigation());
          },
          error: () => {
            this.sections.set([]);
            this.isLoading.set(false);
          },
        });
      },
      error: () => {
        this.sections.set([]);
        this.isLoading.set(false);
      },
    });
  }

  submitSearch(): void {
    const title = this.search.value.trim();
    this.router.navigate(['/search'], { queryParams: title ? { title } : {} });
  }

  searchPublisher(publisher: string): void {
    this.router.navigate(['/search'], { queryParams: { publisher } });
  }

  trackByPublisher(_index: number, item: PublisherSection): string {
    return item.path;
  }

  trackByComic(_index: number, item: ComicResolved): string {
    return item.path;
  }

  slidePrevious(sectionPath: string, swiper: HTMLElement): void {
    (swiper as HTMLElement & { swiper?: { slidePrev: () => void } }).swiper?.slidePrev();
    setTimeout(() => this.updateSwiperNavigation(sectionPath, swiper as HTMLElement & { swiper?: unknown }));
  }

  slideNext(sectionPath: string, swiper: HTMLElement): void {
    (swiper as HTMLElement & { swiper?: { slideNext: () => void } }).swiper?.slideNext();
    setTimeout(() => this.updateSwiperNavigation(sectionPath, swiper as HTMLElement & { swiper?: unknown }));
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

  private createSpecialSection(name: string, path: string, comics: ComicResolved[]): PublisherSection | undefined {
    if (comics.length === 0) {
      return undefined;
    }

    return { name, path, comics, total: comics.length, rows: comics.length >= 10 ? 2 : 1 };
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

    return {
      allByPublisher: comicGroups.map((group) =>
        group.map((groupComic) => decorated.find((comic) => comic.path === groupComic.path)!)
      ),
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
        const swiper = element.nativeElement.swiper as { update?: () => void } | undefined;
        swiper?.update?.();
        this.updateSwiperNavigation(section.path, element.nativeElement);
      }
    });
  }
}
