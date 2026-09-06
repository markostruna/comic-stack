import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { ComicResolved } from '@app/@shared/models';
import { CatalogService } from '@app/@shared/catalog.service';
import { environment } from '@env/environment';

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
  readonly environment = environment;

  private readonly router = inject(Router);
  private readonly catalogService = inject(CatalogService);

  openReader(event: MouseEvent): void {
    event.preventDefault();
    const comic = this.comic();

    if (comic.comicMissing === true) {
      return;
    }

    if (comic.comicMissing === false) {
      this.navigateToReader(comic);
      return;
    }

    this.catalogService
      .checkAvailability(comic, 'comicMissing', environment.serverUrl + comic.path)
      .subscribe((updated) => {
        if (!updated.comicMissing) {
          this.navigateToReader(updated);
        }
      });
  }

  private navigateToReader(comic: ComicResolved): void {
    this.router.navigate(['/reader'], { queryParams: { path: comic.path, title: comic.titlesResolved } });
  }
}
