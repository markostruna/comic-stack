import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ComicComponent } from '@app/publisher/comic/comic.component';
import { ComicResolved } from '@app/@shared/models';
import {
  AvailabilityFilter,
  ComicSearchFilters,
  ComicSearchOptions,
  PublisherService,
} from '@app/publisher/publisher.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [ReactiveFormsModule, TranslateModule, ComicComponent],
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
  readonly form = new FormGroup({
    title: new FormControl('', { nonNullable: true }),
    hero: new FormControl('All', { nonNullable: true }),
    publisher: new FormControl('All', { nonNullable: true }),
    collection: new FormControl('All', { nonNullable: true }),
    availability: new FormControl<AvailabilityFilter>('All', { nonNullable: true }),
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const filters = this.filtersFromParams(params);
      this.form.patchValue(filters, { emitEvent: false });
      this.isLoading.set(true);
      this.publisherService.getAllComics().subscribe({
        next: (comics) => {
          this.options.set(this.publisherService.getSearchOptions(comics));
          this.results.set({ ...filters, comics: this.publisherService.searchComicsFromList(comics, filters) });
          this.isLoading.set(false);
        },
        error: () => {
          this.results.set({ ...filters, comics: [] });
          this.isLoading.set(false);
        },
      });
    });
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
}
