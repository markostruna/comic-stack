import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, UntypedFormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject, take, takeUntil } from 'rxjs';

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
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('singleSelect', { static: true })
  singleSelect!: MatSelect;

  publishers: string[] = ['All', 'Ludens', 'Veseli četvrtak', 'Zlatna Serija'];
  allHeroes: string[] = ['All', 'Veliki Blek', 'Kapetan Miki', 'Teks Viler', 'Zagor'];
  collections: string[] = ['All', 'Maxi', 'Giant', 'Specijalno Izdanje'];
  heroes: string[] = [];

  form = this.fb.group<FilterForm>({
    hero: this.fb.control<string>('All'),
    title: this.fb.control<string>(''),
    publisher: this.fb.control<string>('All'),
    collection: this.fb.control<string>('All'),
    availability: this.fb.control<string>('All'),
  });

  public heroCtrl: UntypedFormControl = new UntypedFormControl();
  public heroFilterCtrl: UntypedFormControl = new UntypedFormControl();
  public filteredHeroes: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  protected _onDestroy = new Subject<void>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.heroes = this.allHeroes;

    this.heroCtrl.setValue(this.allHeroes[10]);
    this.filteredHeroes.next(this.allHeroes.slice());

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
    this.filteredHeroes.pipe(take(1), takeUntil(this._onDestroy)).subscribe(() => {
      this.singleSelect.compareWith = (a: string, b: string) => a > b;
    });
  }

  protected filterHeroes() {
    if (!this.allHeroes) {
      return;
    }
    // get the search keyword
    let search = this.heroFilterCtrl.value;
    if (!search) {
      this.filteredHeroes.next(this.allHeroes.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredHeroes.next(this.allHeroes.filter((hero) => hero.toLowerCase().indexOf(search) > -1));
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
