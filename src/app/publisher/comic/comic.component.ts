import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ComicResolved, Hero } from '@app/@shared/models';
import { environment } from '@env/environment';
import { PublisherService } from '../publisher.service';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicComponent implements OnInit, OnDestroy {
  @Input() comicsInput: ComicResolved[] = [];
  @Input() displayPublisher: boolean = false;

  environment = environment;

  displayedComics: ComicResolved[] = [];
  comics: ComicResolved[] = [];
  private renderToken = 0;
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

  comicsPath = '';
  publisher = '';

  constructor(
    private route: ActivatedRoute,
    private publisherService: PublisherService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.publisher = this.route.snapshot?.params['publisher'];
    this.comicsPath = 'Publishers/' + this.route.snapshot?.params['publisher'] + '/';

    if (this.comicsInput?.length > 0) {
      this.renderComicsInChunks(this.comicsInput);
    } else if (this.publisher != null) {
      this.loadData();
    }
  }

  ngOnDestroy(): void {
    this.renderToken++;
    if (this.renderTimeout) {
      clearTimeout(this.renderTimeout);
    }
  }

  loadData(): void {
    this.publisherService.getComics(this.comicsPath, this.publisher).subscribe((data) => {
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
    const token = ++this.renderToken;
    const chunkSize = 24;

    this.comics = [];
    this.displayedComics = [];

    let index = 0;
    let chunkCounter = 0;

    const processChunk = () => {
      if (token !== this.renderToken) {
        return;
      }

      const end = Math.min(index + chunkSize, source.length);

      for (; index < end; index++) {
        const item = this.toViewModel(source[index]);
        this.comics.push(item);
        this.displayedComics.push(item);
      }

      chunkCounter++;

      // Render every second chunk to reduce change-detection overhead on huge lists.
      if (chunkCounter % 2 === 0 || index >= source.length) {
        this.cdr.detectChanges();
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
