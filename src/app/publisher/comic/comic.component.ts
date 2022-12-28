import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ComicResolved } from '@app/@shared/models/all-models';
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
      this.displayedComics.push({
        ...this.comics[0],
        fakeEntry: true,
      });
    });
  }

  openDialog(item: any) {}

  loadMore() {}
}
