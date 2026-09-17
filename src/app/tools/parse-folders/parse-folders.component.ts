import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
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
import { CatalogService } from '@app/@shared/catalog.service';
import { ComicResolved, PublisherResolved } from '@app/@shared/models';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateModule } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { ComicDetailsDialogComponent } from '../comic-details-dialog.component';
import { environment } from '@env/environment';
import { interval, startWith, switchMap, takeWhile } from 'rxjs';

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
    MatDialogModule,
    MatIcon,
    MatButton,
    TranslateModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParseFoldersComponent implements OnInit, AfterViewInit {
  @ViewChild('empTbSort') empTbSort = new MatSort();
  @ViewChild('paginator') paginator!: MatPaginator;

  readonly publishers = signal<PublisherResolved[]>([]);
  readonly comics = signal<ComicResolved[]>([]);

  readonly storedColumns: string[] = [
    marker('publisherResolved'),
    marker('numberResolved'),
    marker('heroesResolved'),
    marker('collection'),
    marker('titlesResolved'),
    marker('originalFilename'),
    marker('missingInformation'),
    marker('actions'),
  ];

  readonly dataSource = signal(new MatTableDataSource<ComicResolved>());
  readonly isBusy = signal(false);
  readonly scanStatus = signal('');
  readonly scanRunId = signal<number | null>(null);

  readonly pageSizes = [5, 10, 25, 50, 100];

  private readonly catalogService = inject(CatalogService);
  private readonly dialog = inject(MatDialog);
  private readonly http = inject(HttpClient);

  ngOnInit(): void {
    this.loadStoredData();
  }

  ngAfterViewInit() {
    this.dataSource().paginator = this.paginator;
    this.dataSource().sort = this.empTbSort;
  }

  loadStoredData() {
    forkJoin({ publishers: this.catalogService.readPublishers(), comics: this.catalogService.readComics() }).subscribe({
      next: (publishers) => {
        this.publishers.set(publishers.publishers);
        this.setComics(publishers.comics);
      },
    });
  }

  importData() {
    this.dialog.closeAll();
    this.isBusy.set(true);
    this.http.post<{ scanRunId: number }>(`${environment.apiUrl}admin/scan`, {}).subscribe({
      next: ({ scanRunId }) => {
        this.scanRunId.set(scanRunId);
        this.scanStatus.set('queued');
        interval(5000)
          .pipe(
            startWith(0),
            switchMap(() => this.http.get<{ status: string }>(`${environment.apiUrl}admin/scan/${scanRunId}`)),
            takeWhile((run) => run.status === 'queued' || run.status === 'running', true)
          )
          .subscribe({
            next: (run) => this.scanStatus.set(run.status),
            complete: () => {
              this.isBusy.set(false);
              this.loadStoredData();
            },
            error: () => {
              this.scanStatus.set('failed');
              this.isBusy.set(false);
            },
          });
      },
      error: () => {
        this.scanStatus.set('failed');
        this.isBusy.set(false);
      },
    });
  }

  showDetails(comic: ComicResolved) {
    this.dialog.open(ComicDetailsDialogComponent, {
      width: 'min(900px, 96vw)',
      maxHeight: '90vh',
      data: comic,
    });
  }

  missingInformation(comic: ComicResolved): string[] {
    const missing: string[] = [];
    if (comic.comicMissing === true) missing.push('comic');
    return missing;
  }

  comicIndex(comic: ComicResolved): number {
    return this.comics().indexOf(comic);
  }

  private setComics(comics: ComicResolved[]) {
    this.comics.set(comics);
    const dataSource = new MatTableDataSource(comics);
    dataSource.sort = this.empTbSort;
    dataSource.paginator = this.paginator;
    this.dataSource.set(dataSource);
  }
}
