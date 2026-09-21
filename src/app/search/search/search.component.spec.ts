import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CatalogService } from '../../@shared/catalog.service';
import { UserStateService } from '../../@shared/user-state.service';
import { PublisherService } from '../../publisher/publisher.service';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), SearchComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { queryParams: of({}) },
        },
        {
          provide: Router,
          useValue: { navigate: vi.fn() },
        },
        {
          provide: PublisherService,
          useValue: {
            getAllComics: () => of([]),
            getSearchOptions: () => ({ heroes: [], publishers: [], collections: [] }),
            getSearchOptionsFromApi: () => of({ heroes: [], publishers: [], collections: [] }),
            searchComics: () =>
              of([
                {
                  id: 7,
                  path: 'comic.cbz',
                  titles: ['Comic'],
                  titlesResolved: 'Comic',
                },
              ]),
            searchComicsFromList: () => [],
          },
        },
        {
          provide: CatalogService,
          useValue: { recordAvailability: () => of({}), checkAvailability: () => of({}) },
        },
        {
          provide: UserStateService,
          useValue: {
            readContinueReading: () => of([{ id: 7, pageIndex: 12, totalPages: 100 }]),
            readBookmarks: () => of([{ comicId: 7 }]),
          },
        },
        {
          provide: MatDialog,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('decorates search results with reading progress and bookmark state', () => {
    expect(component.results().comics[0]).toMatchObject({
      readingProgress: { pageIndex: 12, totalPages: 100 },
      bookmarked: true,
    });
  });
});
