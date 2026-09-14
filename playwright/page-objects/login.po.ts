import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly url = '/login';
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;

  constructor(private readonly page: Page) {
    this.usernameField = page.locator('[formControlName="username"]');
    this.passwordField = page.locator('[formcontrolname="password"]');
    this.loginButton = page.locator('[type="submit"]');
  }

  async login() {
    await this.usernameField.fill('test');
    await this.passwordField.fill('123');
    await this.page.evaluate(() => {
      setTimeout(() => {
        document.querySelector('form')?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      }, 0);
    });
  }
}
