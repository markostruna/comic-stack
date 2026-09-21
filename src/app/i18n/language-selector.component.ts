import { ChangeDetectionStrategy, Component, OnInit, inject, input, signal } from '@angular/core';

import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { I18nService } from './i18n.service';

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
