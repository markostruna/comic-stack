import { Page } from '@playwright/test';

export class AppSharedPage {
  constructor(private readonly page: Page) {}

  async navigateAndSetLanguage() {
    await this.page.addInitScript(() => {
      window.localStorage.setItem('language', 'en-US');
    });
    await this.page.goto('/');
  }
}
