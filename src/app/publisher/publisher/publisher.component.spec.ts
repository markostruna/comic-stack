import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HelperService } from '@app/@shared/helper.service';
import { PublisherService } from '../publisher.service';

import { PublisherComponent } from './publisher.component';
import { vi } from 'vitest';

describe('PublisherComponent', () => {
  let component: PublisherComponent;
  let fixture: ComponentFixture<PublisherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublisherComponent],
      providers: [
        {
          provide: Router,
          useValue: { navigate: vi.fn() },
        },
        {
          provide: PublisherService,
          useValue: { getPublishers: () => of([]) },
        },
        {
          provide: HelperService,
          useValue: { transformTitleToFilename: () => '' },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PublisherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
