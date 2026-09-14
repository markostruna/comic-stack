import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { of } from 'rxjs';
import { CatalogService } from '@app/@shared/catalog.service';
import { PublisherService } from '@app/publisher/publisher.service';
import { provideHttpClient } from '@angular/common/http';

import { ParseFoldersComponent } from './parse-folders.component';

describe('ParseFoldersComponent', () => {
  let component: ParseFoldersComponent;
  let fixture: ComponentFixture<ParseFoldersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MatTableModule, MatSortModule, MatPaginatorModule, ParseFoldersComponent],
      providers: [
        provideHttpClient(),
        {
          provide: PublisherService,
          useValue: {
            importPublishers: () => of([]),
            importComics: () => of([]),
          },
        },
        {
          provide: CatalogService,
          useValue: {
            readPublishers: () => of([]),
            readComics: () => of([]),
            replaceCatalog: () => of(undefined),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ParseFoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
