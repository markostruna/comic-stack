import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), PublisherComponent],
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should prioritize the initially visible comics in the first section', () => {
    const viewportWidth = window.innerWidth;
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1280 });

    try {
      expect(component.isInitialViewportComic(0, 7, 1)).toBe(true);
      expect(component.isInitialViewportComic(0, 8, 1)).toBe(false);
      expect(component.isInitialViewportComic(1, 0, 1)).toBe(false);
    } finally {
      Object.defineProperty(window, 'innerWidth', { configurable: true, value: viewportWidth });
    }
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
