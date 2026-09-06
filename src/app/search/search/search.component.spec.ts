import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { CatalogService } from '@app/@shared/catalog.service';
import { PublisherService } from '@app/publisher/publisher.service';
import { vi } from 'vitest';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent],
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
