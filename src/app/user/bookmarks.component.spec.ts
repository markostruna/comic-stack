import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';

import { Bookmark, UserStateService } from '@app/@shared/user-state.service';
import { BookmarksComponent } from './bookmarks.component';

describe('BookmarksComponent', () => {
  let component: BookmarksComponent;
  let fixture: ComponentFixture<BookmarksComponent>;
  let userState: { readBookmarks: ReturnType<typeof vi.fn>; deleteBookmark: ReturnType<typeof vi.fn> };
  const bookmark: Bookmark = {
    id: 1,
    comicId: 42,
    pageIndex: 3,
    note: 'Great page',
    createdAt: '2026-01-01T00:00:00Z',
  };

  beforeEach(async () => {
    userState = {
      readBookmarks: vi.fn(() => of([bookmark])),
      deleteBookmark: vi.fn(() => of({ ok: true })),
    };
    await TestBed.configureTestingModule({
      imports: [BookmarksComponent],
      providers: [provideRouter([]), { provide: UserStateService, useValue: userState }],
    }).compileComponents();

    fixture = TestBed.createComponent(BookmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load bookmarks', () => {
    expect(component.bookmarks()).toEqual([bookmark]);
    expect(component.isLoading()).toBe(false);
  });

  it('should delete a bookmark from the list', () => {
    component.deleteBookmark(bookmark);

    expect(userState.deleteBookmark).toHaveBeenCalledWith(bookmark.id);
    expect(component.bookmarks()).toEqual([]);
  });

  it('should expose a load error', () => {
    userState.readBookmarks.mockReturnValue(throwError(() => new Error('offline')));
    const errorFixture = TestBed.createComponent(BookmarksComponent);

    errorFixture.detectChanges();

    expect(errorFixture.componentInstance.error()).toBe('Unable to load bookmarks.');
  });
});
