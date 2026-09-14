import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly url = '/home';
  readonly welcomeText: Locator;

  constructor(page: Page) {
    this.welcomeText = page.locator('app-root mat-card-title');
  }
}
