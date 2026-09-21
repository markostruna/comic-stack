import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { CatalogService } from '../../@shared/catalog.service';

import { ParseFoldersComponent } from './parse-folders.component';

describe('ParseFoldersComponent', () => {
  let component: ParseFoldersComponent;
  let fixture: ComponentFixture<ParseFoldersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        TranslateModule.forRoot(),
        ParseFoldersComponent,
      ],
      providers: [
        provideHttpClient(),
        {
          provide: CatalogService,
          useValue: {
            readPublishers: () => of([]),
            readComics: () => of([]),
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
