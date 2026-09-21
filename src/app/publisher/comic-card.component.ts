import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ComicResolved } from '@app/@shared/models';
import { ComicDetailsDialogComponent } from '../tools/comic-details-dialog.component';

@Component({
  selector: 'app-comic-card',
  templateUrl: './comic-card.component.html',
  styleUrls: ['./comic-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIcon, MatButton],
})
export class ComicCardComponent {
  readonly comic = input.required<ComicResolved>();
  readonly displayPublisher = input(false);
  readonly isInfoVisible = signal(false);

  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);

  openCard(event: MouseEvent): void {
    if (!window.matchMedia('(hover: none)').matches || this.comic().comicMissing === true) {
      return;
    }

    event.preventDefault();
    this.navigateToReader(this.comic());
  }

  toggleInfo(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isInfoVisible.update((visible) => !visible);
  }

  openDetails(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dialog.open(ComicDetailsDialogComponent, {
      width: 'min(900px, 96vw)',
      maxHeight: '90vh',
      data: this.comic(),
    });
  }

  openReader(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const comic = this.comic();

    if (comic.comicMissing === true) {
      return;
    }

    this.navigateToReader(comic);
  }

  private navigateToReader(comic: ComicResolved): void {
    this.router.navigate(['/reader', (comic as ComicResolved & { id: number }).id]);
  }
}
