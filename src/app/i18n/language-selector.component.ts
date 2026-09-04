import { ChangeDetectionStrategy, Component, OnInit, input, signal, inject } from '@angular/core';

import { I18nService } from './i18n.service';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconButton, MatMenuTrigger, MatIcon, MatButton, MatMenu, MatMenuItem],
})
export class LanguageSelectorComponent implements OnInit {
  private readonly i18nService = inject(I18nService);

  readonly icon = input(false);
  readonly currentLanguage = signal('');
  readonly languages = signal<string[]>([]);

  ngOnInit() {
    this.currentLanguage.set(this.i18nService.language);
    this.languages.set(this.i18nService.supportedLanguages);
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
    this.currentLanguage.set(this.i18nService.language);
  }
}
