import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CatalogService } from '../../@shared/catalog.service';
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
            searchComics: () => of([]),
            searchComicsFromList: () => [],
          },
        },
        {
          provide: CatalogService,
          useValue: { recordAvailability: () => of({}), checkAvailability: () => of({}) },
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
});
