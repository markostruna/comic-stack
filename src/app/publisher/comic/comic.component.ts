import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ComicResolved } from '@app/@shared/models';
import { environment } from '@env/environment';
import { PublisherService } from '../publisher.service';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.scss'],
})
export class ComicComponent implements OnInit {
  @Input() comicsInput: ComicResolved[] = [];
  @Input() displayPublisher: boolean = false;

  environment = environment;

  comics: ComicResolved[] = [];
  displayedComics: ComicResolved[] = [];

  comicsPath = '';
  publisher = '';

  pageSize = 100;
  numPreloadedComics = this.pageSize;

  constructor(private route: ActivatedRoute, private publisherService: PublisherService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.publisher = this.route.snapshot?.params['publisher'];
    this.comicsPath = 'Publishers/' + this.route.snapshot?.params['publisher'] + '/';

    if (this.comicsInput?.length > 0) {
      this.comics = this.comicsInput;
      this.displayedComics = this.comics.slice(0, this.numPreloadedComics);

      this.displayedComics.push({
        ...this.comics[0],
        fakeEntry: true,
      });
    } else if (this.publisher != null) {
      this.loadData();
    }
  }

  loadData(): void {
    this.publisherService.getComics(this.comicsPath, this.publisher).subscribe((data) => {
      this.comics = data;
      this.displayedComics = this.comics.slice(0, this.numPreloadedComics);

      if (this.displayedComics?.length < this.comics?.length) {
        this.displayedComics.push({
          ...this.comics[0],
          fakeEntry: true,
        });
      }
    });
  }

  openDialog(item: any) {}

  loadMore() {
    if (this.displayedComics[this.displayedComics.length - 1].fakeEntry) {
      this.displayedComics.pop();
    }

    if (this.numPreloadedComics + this.pageSize > this.comics.length) {
      this.numPreloadedComics = this.comics.length;
      this.displayedComics = this.comics;
      return;
    }

    this.displayedComics = this.displayedComics.concat(
      this.comics.slice(this.numPreloadedComics, this.numPreloadedComics + this.pageSize)
    );

    if (this.displayedComics?.length < this.comics?.length) {
      this.displayedComics.push({
        ...this.comics[0],
        fakeEntry: true,
      });
    }

    this.numPreloadedComics += this.pageSize;
  }

  calculateClass(item: ComicResolved | undefined) {
    let ret = '';

    if (item?.hero) {
      ret = item.hero.toLowerCase().replace(/ /g, '');
    }

    return ret;
  }
}
