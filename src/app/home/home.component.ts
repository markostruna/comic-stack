import { ChangeDetectionStrategy, Component, OnInit, signal, inject } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';
import { MatCard, MatCardContent, MatCardTitle, MatCardSubtitle } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { LoaderComponent } from '../@shared/loader/loader.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [MatCard, MatCardContent, MatCardTitle, TranslateModule, MatCardSubtitle, LoaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private readonly quoteService = inject(QuoteService);

  readonly quote = signal<string | undefined>(undefined);
  readonly isLoading = signal(false);

  ngOnInit() {
    this.isLoading.set(true);
    this.quoteService
      .getRandomQuote({ category: 'dev' })
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
        })
      )
      .subscribe((quote: string) => {
        this.quote.set(quote);
      });
  }
}
