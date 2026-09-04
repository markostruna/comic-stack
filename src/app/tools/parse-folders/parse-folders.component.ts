import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import {
  MatTableDataSource,
  MatTable,
  MatColumnDef,
  MatHeaderCellDef,
  MatHeaderCell,
  MatCellDef,
  MatCell,
  MatHeaderRowDef,
  MatHeaderRow,
  MatRowDef,
  MatRow,
} from '@angular/material/table';
import { ConfigurationService } from '@app/@shared/configuration.service';
import { ComicResolved, PublisherResolved } from '@app/@shared/models';
import { PublisherService } from '@app/publisher/publisher.service';
import { Observable, Subscription, forkJoin } from 'rxjs';

@Component({
  selector: 'app-parse-folders',
  templateUrl: './parse-folders.component.html',
  styleUrls: ['./parse-folders.component.scss'],
  imports: [
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatSortHeader,
    MatCellDef,
    MatCell,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatPaginator,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParseFoldersComponent implements OnInit, AfterViewInit {
  @ViewChild('empTbSort') empTbSort = new MatSort();
  @ViewChild('paginator') paginator!: MatPaginator;

  readonly publishersFolder = 'Publishers/';
  readonly publishers = signal<PublisherResolved[]>([]);
  readonly comics = signal<ComicResolved[]>([]);

  readonly displayedColumns: string[] = [
    'publisherResolved',
    'numberResolved',
    'heroesResolved',
    'titlesResolved',
    'filename',
    'missing',
  ];

  readonly dataSource = signal(new MatTableDataSource<ComicResolved>());

  readonly pageSizes = [5, 10, 25, 50, 100];

  private readonly publisherService = inject(PublisherService);
  private readonly configurationService = inject(ConfigurationService);

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource().paginator = this.paginator;
    this.dataSource().sort = this.empTbSort;
  }

  loadData() {
    this.publisherService.getPublishers(this.publishersFolder).subscribe({
      next: (publishers) => {
        this.publishers.set(publishers);
        this.loadComics();
      },
    });
  }

  loadComics() {
    const requests: Observable<ComicResolved[]>[] = [];
    this.comics.set([]);

    this.publishers().forEach((publisher) => {
      const comicsPath = this.publishersFolder + publisher.name + '/';
      requests.push(this.publisherService.getComics(comicsPath, publisher.name));
    });

    forkJoin(requests).subscribe((data) => {
      const comics: ComicResolved[] = [];

      data.forEach((resolvedComics) => {
        comics.push(...resolvedComics);
      });

      this.comics.set(comics);
      const dataSource = new MatTableDataSource(comics);
      dataSource.sort = this.empTbSort;
      dataSource.paginator = this.paginator;
      this.dataSource.set(dataSource);

      this.configurationService.writeFile(this.publishers(), this.comics());
    });
  }
}
