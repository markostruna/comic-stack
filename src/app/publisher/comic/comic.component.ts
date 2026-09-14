import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject, input, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComicResolved } from '@app/@shared/models';
import { PublisherService } from '../publisher.service';
import { ComicCardComponent } from '../comic-card.component';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComicCardComponent],
})
export class ComicComponent implements OnInit, OnDestroy {
  readonly comicsInput = input<ComicResolved[]>([]);
  readonly displayPublisher = input(false);

  readonly displayedComics = signal<ComicResolved[]>([]);
  readonly comics = signal<ComicResolved[]>([]);
  private readonly renderToken = signal(0);
  private renderTimeout: ReturnType<typeof setTimeout> | undefined;

  readonly comicsPath = signal('');
  readonly publisher = signal('');

  private readonly route = inject(ActivatedRoute);
  private readonly publisherService = inject(PublisherService);

  ngOnInit(): void {
    const publisher = this.route.snapshot?.params['publisher'];
    this.publisher.set(publisher);
    this.comicsPath.set('Publishers/' + publisher + '/');

    if (this.comicsInput().length > 0) {
      this.renderComicsInChunks(this.comicsInput());
    } else if (publisher != null) {
      this.loadData();
    }
  }

  ngOnDestroy(): void {
    this.renderToken.update((value) => value + 1);
    if (this.renderTimeout) {
      clearTimeout(this.renderTimeout);
    }
  }

  loadData(): void {
    this.publisherService.getComics(this.comicsPath(), this.publisher()).subscribe((data) => {
      this.renderComicsInChunks(data);
    });
  }

  trackByComic(_index: number, item: ComicResolved): string {
    return item.path;
  }

  private renderComicsInChunks(source: ComicResolved[]): void {
    const token = this.renderToken() + 1;
    this.renderToken.set(token);
    const chunkSize = 24;

    this.comics.set([]);
    this.displayedComics.set([]);

    let index = 0;
    const processChunk = () => {
      if (token !== this.renderToken()) {
        return;
      }

      const end = Math.min(index + chunkSize, source.length);

      for (; index < end; index++) {
        const item = this.toViewModel(source[index]);
        this.comics.update((comics) => [...comics, item]);
        this.displayedComics.update((comics) => [...comics, item]);
      }

      if (index < source.length) {
        this.renderTimeout = setTimeout(processChunk, 8);
      } else {
        this.renderTimeout = undefined;
      }
    };

    processChunk();
  }

  private toViewModel(comic: ComicResolved): ComicResolved {
    return {
      ...comic,
      decodedPath: decodeURIComponent(comic.path),
    };
  }
}
