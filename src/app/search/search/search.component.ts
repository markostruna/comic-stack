import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { ComicResolved } from '@app/@shared/models';
import { ComicComponent } from '@app/publisher/comic/comic.component';
import {
  AvailabilityFilter,
  ComicSearchFilters,
  ComicSearchOptions,
  PublisherService,
} from '@app/publisher/publisher.service';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    ComicComponent,
    MatFormField,
    MatInput,
    MatButton,
    MatPaginator,
    MatSelectModule,
    NgxMatSelectSearchModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly publisherService = inject(PublisherService);

  readonly options = signal<ComicSearchOptions>({ heroes: [], publishers: [], collections: [] });
  readonly results = signal<ComicSearchFilters & { comics: ComicResolved[] }>({
    title: '',
    hero: 'All',
    publisher: 'All',
    collection: 'All',
    availability: 'All',
    comics: [],
  });
  readonly isLoading = signal(true);
  readonly pageIndex = signal(0);
  readonly pageSize = 50;
  readonly openSelect = signal<string | null>(null);
  readonly heroFilterControl = new FormControl('', { nonNullable: true });
  readonly publisherFilterControl = new FormControl('', { nonNullable: true });
  readonly collectionFilterControl = new FormControl('', { nonNullable: true });
  readonly filteredHeroes = computed(() => this.filterOptions(this.options().heroes, this.heroFilter()));
  readonly filteredPublishers = computed(() => this.filterOptions(this.options().publishers, this.publisherFilter()));
  readonly filteredCollections = computed(() =>
    this.filterOptions(this.options().collections, this.collectionFilter())
  );
  readonly pagedComics = computed(() => {
    const start = this.pageIndex() * this.pageSize;
    return this.results().comics.slice(start, start + this.pageSize);
  });
  readonly form = new FormGroup({
    title: new FormControl('', { nonNullable: true }),
    hero: new FormControl('All', { nonNullable: true }),
    publisher: new FormControl('All', { nonNullable: true }),
    collection: new FormControl('All', { nonNullable: true }),
    availability: new FormControl<AvailabilityFilter>('All', { nonNullable: true }),
  });

  private readonly heroFilter = toSignal(this.heroFilterControl.valueChanges, { initialValue: '' });
  private readonly publisherFilter = toSignal(this.publisherFilterControl.valueChanges, { initialValue: '' });
  private readonly collectionFilter = toSignal(this.collectionFilterControl.valueChanges, { initialValue: '' });

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const filters = this.filtersFromParams(params);
      this.form.patchValue(filters, { emitEvent: false });
      this.isLoading.set(true);
      this.publisherService.getSearchOptionsFromApi().subscribe({
        next: (options) => {
          this.options.set(options);
          this.publisherService.searchComics(filters).subscribe({
            next: (comics) => {
              this.results.set({ ...filters, comics });
              this.pageIndex.set(0);
              this.isLoading.set(false);
            },
            error: () => {
              this.results.set({ ...filters, comics: [] });
              this.pageIndex.set(0);
              this.isLoading.set(false);
            },
          });
        },
        error: () => {
          this.results.set({ ...filters, comics: [] });
          this.pageIndex.set(0);
          this.isLoading.set(false);
        },
      });
    });
  }

  setOpenSelect(select: string): void {
    this.openSelect.set(select);
  }

  clearOpenSelect(select: string): void {
    if (this.openSelect() === select) {
      this.openSelect.set(null);
    }
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
  }

  searchComics(): void {
    const filters = this.form.getRawValue();
    const queryParams = Object.fromEntries(Object.entries(filters).filter(([, value]) => value && value !== 'All'));
    this.router.navigate(['/search'], { queryParams });
  }

  private filtersFromParams(params: Record<string, string>): ComicSearchFilters {
    return {
      title: params['title'] ?? '',
      hero: params['hero'] ?? 'All',
      publisher: params['publisher'] ?? 'All',
      collection: params['collection'] ?? 'All',
      availability: (params['availability'] as AvailabilityFilter) ?? 'All',
    };
  }

  resetFilter(control: FormControl<string>): void {
    control.reset();
  }

  private filterOptions(options: string[], searchTerm: string): string[] {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    return normalizedSearchTerm
      ? options.filter((option) => option.toLowerCase().includes(normalizedSearchTerm))
      : options;
  }
}
