import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { ComicResolved, PublisherResolved } from '@app/@shared/models';
import { PublisherService } from '../publisher.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { ComicCardComponent } from '../comic-card.component';

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
  imports: [ReactiveFormsModule, MatIcon, TranslateModule, ComicCardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PublisherComponent implements OnInit, AfterViewInit {
  private readonly router = inject(Router);
  private readonly publisherService = inject(PublisherService);

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

        forkJoin(
          publishers.map((publisher) =>
            this.publisherService.getComics(`${this.publishersFolder}${publisher.name}/`, publisher.name)
          )
        ).subscribe({
          next: (comicGroups) => {
            this.sections.set(
              publishers
                .map((publisher, index) => this.createSection(publisher, comicGroups[index]))
                .filter((section): section is PublisherSection => section !== undefined)
            );
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

  slidePrevious(sectionPath: string, swiper: { swiper?: { slidePrev: () => void } }): void {
    swiper.swiper?.slidePrev();
    setTimeout(() => this.updateSwiperNavigation(sectionPath, swiper));
  }

  slideNext(sectionPath: string, swiper: { swiper?: { slideNext: () => void } }): void {
    swiper.swiper?.slideNext();
    setTimeout(() => this.updateSwiperNavigation(sectionPath, swiper));
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
      total: comics.length,
      rows: availableComics.length >= 10 ? 2 : 1,
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

    swiper.update?.();
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
