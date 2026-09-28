import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ComicResolved, PublisherResolved } from '@app/@shared/models';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { HelperService } from '../../@shared/helper.service';
import { UserStateService } from '../../@shared/user-state.service';
import { PublisherService } from '../publisher.service';
import { PublisherComponent } from './publisher.component';

describe('PublisherComponent', () => {
  let component: PublisherComponent;
  let fixture: ComponentFixture<PublisherComponent>;
  const navigate = vi.fn();

  beforeEach(async () => {
    navigate.mockReset();
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), PublisherComponent],
      providers: [
        {
          provide: Router,
          useValue: { navigate },
        },
        {
          provide: PublisherService,
          useValue: {
            getPublishers: () => of([]),
            getPublisherPreviewComics: () => of([]),
            searchComics: () => of({ items: [], total: 0 }),
          },
        },
        {
          provide: UserStateService,
          useValue: { readContinueReading: () => of([]), readBookmarks: () => of([]) },
        },
        {
          provide: HelperService,
          useValue: { transformTitleToFilename: () => '' },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PublisherComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should prioritize the initially visible comics in the first section', () => {
    const viewportWidth = window.innerWidth;
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1280 });

    try {
      fixture.detectChanges();
      expect(component.isInitialViewportComic(0, 7, 1)).toBe(true);
      expect(component.isInitialViewportComic(0, 8, 1)).toBe(false);
      expect(component.isInitialViewportComic(1, 0, 1)).toBe(false);
    } finally {
      Object.defineProperty(window, 'innerWidth', { configurable: true, value: viewportWidth });
    }
  });

  it('should prioritize the first two rows on a mobile viewport', () => {
    const viewportWidth = window.innerWidth;
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 390 });

    try {
      fixture.detectChanges();
      expect(component.isInitialViewportComic(0, 3, 2)).toBe(true);
      expect(component.isInitialViewportComic(0, 4, 2)).toBe(false);
    } finally {
      Object.defineProperty(window, 'innerWidth', { configurable: true, value: viewportWidth });
    }
  });

  it('should reload preview counts when switching between mobile and desktop', () => {
    const previewRequests: number[] = [];
    const publisherService = TestBed.inject(PublisherService);
    vi.spyOn(publisherService, 'getPublisherPreviewComics').mockImplementation((perPublisher = 20) => {
      previewRequests.push(perPublisher);
      return of([]);
    });
    const loadSwiperModules = vi
      .spyOn(component as unknown as { loadSwiperModules: () => void }, 'loadSwiperModules')
      .mockImplementation(() => {});
    const internals = component as unknown as {
      publisherPageData: {
        publishers: PublisherResolved[];
        continueReadingComics: ComicResolved[];
        continueReading: Array<{ id: number; pageIndex: number; totalPages: number }>;
        continueReadingTotal: number;
        bookmarkedComics: ComicResolved[];
        bookmarkedTotal: number;
        bookmarks: Array<{ comicId: number }>;
      };
      updateMobileLayout: (event: MediaQueryListEvent) => void;
    };
    internals.publisherPageData = {
      publishers: [{ name: 'Publisher', path: 'publisher', backgroundImageUrl: '' }],
      continueReadingComics: [],
      continueReading: [],
      continueReadingTotal: 0,
      bookmarkedComics: [],
      bookmarkedTotal: 0,
      bookmarks: [],
    };

    internals.updateMobileLayout({ matches: true } as MediaQueryListEvent);
    internals.updateMobileLayout({ matches: false } as MediaQueryListEvent);

    expect(previewRequests).toEqual([6, 20]);
    expect(loadSwiperModules).toHaveBeenCalledOnce();
  });

  it('should route Continue reading and Bookmarks links to their matching search options', () => {
    component.searchSpecialSection('continue-reading');
    component.searchSpecialSection('bookmarks');

    expect(navigate).toHaveBeenNthCalledWith(1, ['/search'], { queryParams: { availability: 'InProgress' } });
    expect(navigate).toHaveBeenNthCalledWith(2, ['/search'], { queryParams: { availability: 'Bookmarked' } });
  });

  it('should use the publisher comic count instead of the preview count', () => {
    const comics = Array.from({ length: 3 }, () => ({ missing: false } as ComicResolved));
    const createSection = (
      component as unknown as {
        createSection: (publisher: PublisherResolved, comics: ComicResolved[]) => { total: number } | undefined;
      }
    ).createSection.bind(component);

    const section = createSection(
      { name: 'Publisher', path: 'publisher', backgroundImageUrl: '', comicCount: 42 },
      comics
    );

    expect(section?.total).toBe(42);
  });

  it('should update navigation state without recursively updating Swiper', () => {
    const update = vi.fn();
    const swiper = { isBeginning: false, isEnd: true, slides: [{}, {}], update };

    (
      component as unknown as { updateSwiperNavigation: (path: string, target: { swiper: unknown }) => void }
    ).updateSwiperNavigation('publisher-path', { swiper });

    expect(update).not.toHaveBeenCalled();
    expect(component.swiperNavigation()['publisher-path']).toEqual({ isBeginning: false, isEnd: true });
  });
});
