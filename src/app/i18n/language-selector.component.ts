import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { I18nService } from './i18n.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSelectorComponent implements OnInit {
  @Input() icon = false;
  currentLanguage = '';
  languages: string[] = [];

  constructor(private i18nService: I18nService) {}

  ngOnInit() {
    this.currentLanguage = this.i18nService.language;
    this.languages = this.i18nService.supportedLanguages;
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
    this.currentLanguage = this.i18nService.language;
  }
}
