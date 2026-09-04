import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Subject, takeUntil } from 'rxjs';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatLabel, MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelectSearchComponent } from 'ngx-mat-select-search';
import { MatButton } from '@angular/material/button';

export interface FilterForm {
  title: FormControl<string | null>;
  hero: FormControl<string | null>;
  publisher: FormControl<string | null>;
  collection: FormControl<string | null>;
  availability: FormControl<string | null>;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [
    MatCard,
    MatCardContent,
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatInput,
    MatSelect,
    MatOption,
    MatSelectSearchComponent,
    MatButton,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('singleSelect', { static: true })
  readonly singleSelect!: MatSelect;

  readonly publishers: string[] = ['All', 'Ludens', 'Veseli četvrtak', 'Zlatna Serija'];
  readonly allHeroes: string[] = ['All', 'Veliki Blek', 'Kapetan Miki', 'Teks Viler', 'Zagor'];
  readonly collections: string[] = ['All', 'Maxi', 'Giant', 'Specijalno Izdanje'];
  readonly heroes = signal<string[]>([]);

  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.group<FilterForm>({
    hero: this.fb.control<string>('All'),
    title: this.fb.control<string>(''),
    publisher: this.fb.control<string>('All'),
    collection: this.fb.control<string>('All'),
    availability: this.fb.control<string>('All'),
  });

  readonly heroCtrl = new FormControl<string | null>(null);
  readonly heroFilterCtrl = new FormControl<string | null>(null);
  readonly filteredHeroes = signal<string[]>([]);
  protected readonly _onDestroy = new Subject<void>();

  ngOnInit(): void {
    this.heroes.set(this.allHeroes);

    this.heroCtrl.setValue(this.allHeroes[3]);
    this.filteredHeroes.set(this.allHeroes.slice());

    this.heroFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.filterHeroes();
    });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  protected setInitialValue() {
    this.singleSelect.compareWith = (a: string, b: string) => a > b;
  }

  protected filterHeroes() {
    if (!this.allHeroes) {
      return;
    }
    // get the search keyword
    const search = this.heroFilterCtrl.value;
    if (!search) {
      this.filteredHeroes.set(this.allHeroes.slice());
      return;
    }
    this.filteredHeroes.set(this.allHeroes.filter((hero) => hero.toLowerCase().indexOf(search.toLowerCase()) > -1));
  }

  searchComics() {
    // this.comics = [];
    // const selectedTitle = (this.form.get('title')?.value ?? '').toLowerCase();
    // const selectedHero = (this.form.get('hero')?.value ?? '').toLowerCase();
    // const selectedPublisher = (this.form.get('publisher')?.value ?? '').toLowerCase();
    // const selectedCollection = (this.form.get('collection')?.value ?? '').toLowerCase();
    // const selectedAvailability = (this.form.get('availability')?.value ?? 'All').toLowerCase();
    // this.allComics.forEach((comic) => {
    //   const hero2 = comic.hero2 ?? '';
    //   if (comic.hero.toLowerCase().indexOf(selectedHero) < 0 && hero2.toLowerCase().indexOf(selectedHero) < 0) {
    //     return;
    //   }
    //   const title2 = comic.title2 ?? '';
    //   if (comic.title.toLowerCase().indexOf(selectedTitle) < 0 && title2.toLowerCase().indexOf(selectedTitle) < 0) {
    //     return;
    //   }
    //   if (comic.publisher.toLowerCase().indexOf(selectedPublisher) < 0) {
    //     return;
    //   }
    //   const collection = comic.collection ?? '';
    //   if (collection?.toLowerCase()?.indexOf(selectedCollection) < 0) {
    //     return;
    //   }
    //   if (selectedAvailability === 'available' && comic.missing === true) {
    //     return;
    //   }
    //   if (selectedAvailability === 'missing' && comic.missing !== true) {
    //     return;
    //   }
    //   this.comics.push(comic);
    // });
    // this.searchResults.displayComics();
  }
}
