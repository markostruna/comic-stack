import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject, input, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ComicResolved, Hero } from '@app/@shared/models';
import { environment } from '@env/environment';
import { PublisherService } from '../publisher.service';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, MatIcon],
})
export class ComicComponent implements OnInit, OnDestroy {
  readonly comicsInput = input<ComicResolved[]>([]);
  readonly displayPublisher = input(false);

  readonly environment = environment;

  readonly displayedComics = signal<ComicResolved[]>([]);
  readonly comics = signal<ComicResolved[]>([]);
  private readonly renderToken = signal(0);
  private renderTimeout: ReturnType<typeof setTimeout> | undefined;

  private readonly supportedHeroes = new Set<string>([
    'zagor',
    'dilandog',
    'dampir',
    'misterno',
    'martimisterija',
    'teksviler',
    'bradbarron',
    'timidasti',
    'kitteler',
    'velikiblek',
    'kenparker',
    'kapetanmiki',
    'komandantmark',
  ]);

  readonly comicsPath = signal('');
  readonly publisher = signal('');

  private readonly route = inject(ActivatedRoute);
  private readonly publisherService = inject(PublisherService);
  readonly dialog = inject(MatDialog);

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

  openDialog(item: any) {}

  trackByComic(_index: number, item: ComicResolved): string {
    return item.path;
  }

  trackByHero(_index: number, hero: Hero): string {
    return hero.name;
  }

  trackByTitle(_index: number, title: string): string {
    return title;
  }

  classHeroExists(hero: Hero | undefined) {
    if (!hero?.name) {
      return false;
    }

    return this.supportedHeroes.has(hero.name.toLowerCase().replace(/ /g, ''));
  }

  decodeURIComponent(url: string) {
    return decodeURIComponent(url);
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
      heroDisplay: comic.heroes?.map((hero) => ({
        ...hero,
        exists: this.classHeroExists(hero),
      })),
    };
  }
}
