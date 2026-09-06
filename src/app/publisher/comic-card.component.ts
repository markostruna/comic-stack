import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { ComicResolved } from '@app/@shared/models';

@Component({
  selector: 'app-comic-card',
  templateUrl: './comic-card.component.html',
  styleUrls: ['./comic-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIcon],
})
export class ComicCardComponent {
  readonly comic = input.required<ComicResolved>();
  readonly displayPublisher = input(false);

  private readonly router = inject(Router);

  openReader(event: MouseEvent): void {
    event.preventDefault();
    const comic = this.comic();

    if (comic.comicMissing === true) {
      return;
    }

    this.navigateToReader(comic);
  }

  private navigateToReader(comic: ComicResolved): void {
    this.router.navigate(['/reader'], { queryParams: { path: comic.path, title: comic.titlesResolved } });
  }
}
