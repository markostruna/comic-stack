import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PublisherService } from '../publisher.service';

import { ComicComponent } from './comic.component';

describe('ComicComponent', () => {
  let component: ComicComponent;
  let fixture: ComponentFixture<ComicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComicComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: {} } },
        },
        {
          provide: PublisherService,
          useValue: { getComics: () => [] },
        },
        {
          provide: MatDialog,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
