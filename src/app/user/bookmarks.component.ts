import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Bookmark, UserStateService } from '@app/@shared/user-state.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIcon, MatIconButton],
})
export class BookmarksComponent implements OnInit {
  private readonly userState = inject(UserStateService);
  readonly bookmarks = signal<Bookmark[]>([]);
  readonly isLoading = signal(true);
  readonly error = signal('');
  readonly deletingId = signal<number | null>(null);

  ngOnInit(): void {
    this.loadBookmarks();
  }

  deleteBookmark(bookmark: Bookmark): void {
    if (this.deletingId() !== null) return;
    this.deletingId.set(bookmark.id);
    this.userState.deleteBookmark(bookmark.id).subscribe({
      next: () => this.bookmarks.update((items) => items.filter((item) => item.id !== bookmark.id)),
      error: () => this.error.set('Unable to delete bookmark.'),
      complete: () => this.deletingId.set(null),
    });
  }

  private loadBookmarks(): void {
    this.userState.readBookmarks().subscribe({
      next: (bookmarks) => this.bookmarks.set(bookmarks),
      error: () => this.error.set('Unable to load bookmarks.'),
      complete: () => this.isLoading.set(false),
    });
  }
}
