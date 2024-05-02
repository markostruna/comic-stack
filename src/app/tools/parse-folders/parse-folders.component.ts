import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ComicResolved, PublisherResolved } from '@app/@shared/models';
import { PublisherService } from '@app/publisher/publisher.service';
import { forEach } from 'lodash';
import { Observable, Subscription, forkJoin } from 'rxjs';

@Component({
  selector: 'app-parse-folders',
  templateUrl: './parse-folders.component.html',
  styleUrls: ['./parse-folders.component.scss'],
})
export class ParseFoldersComponent implements OnInit, AfterViewInit {
  @ViewChild('empTbSort') empTbSort = new MatSort();
  @ViewChild('paginator') paginator!: MatPaginator;

  publishersFolder = 'Publishers/';
  publishers: PublisherResolved[] = [];
  comics: ComicResolved[] = [];

  displayedColumns: string[] = [
    'publisher',
    'number',
    'seqNumber',
    'hero',
    'titlesResolved',
    'hero2',
    'title2',
    'collection',
    // 'thumbnailPath',
    // 'currentBackgroundImage',
    // 'coverPath',
    // 'backgroundImageUrl',
    // 'class',
    // 'loaded',
    // 'fakeEntry',
    // 'heroImageUrl',
    // 'hero2ImageUrl',
    'filename',
    //    'originalFilename',
    'extension',
    'missing',
    //    'path',
  ];

  dataSource: MatTableDataSource<ComicResolved> = new MatTableDataSource();

  pageSizes = [5, 10, 25, 50, 100];

  constructor(private publisherService: PublisherService) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.empTbSort;
  }

  loadData() {
    this.publisherService.getPublishers(this.publishersFolder).subscribe({
      next: (publishers) => {
        this.publishers = publishers;
        this.loadComics();
      },
    });
  }

  loadComics() {
    const requests: Observable<ComicResolved[]>[] = [];
    this.comics = [];

    forEach(this.publishers, (publisher) => {
      const comicsPath = this.publishersFolder + publisher.name + '/';
      requests.push(this.publisherService.getComics(comicsPath, publisher.name));
    });

    forkJoin(requests).subscribe((data) => {
      forEach(data, (resolvedComics) => {
        this.comics.push(...resolvedComics);
        this.dataSource = new MatTableDataSource(this.comics);
        this.dataSource.sort = this.empTbSort;
        this.dataSource.paginator = this.paginator;
      });
    });
  }
}
