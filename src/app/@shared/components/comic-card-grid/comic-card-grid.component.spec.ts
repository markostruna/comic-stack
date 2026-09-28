import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import { ComicService } from '@app/@shared/services/comic.service';

import { ComicCardGridComponent } from './comic-card-grid.component';

describe('ComicCardGridComponent', () => {
  let component: ComicCardGridComponent;
  let fixture: ComponentFixture<ComicCardGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComicCardGridComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: {} } },
        },
        {
          provide: ComicService,
          useValue: { getComics: () => [] },
        },
        {
          provide: MatDialog,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ComicCardGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
