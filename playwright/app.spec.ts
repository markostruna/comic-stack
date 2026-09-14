import { expect, test } from '@playwright/test';

import { AppSharedPage } from './page-objects/app-shared.po';
import { LoginPage } from './page-objects/login.po';

test.describe('when the app loads', () => {
  test('should display the login page and log in', async ({ page }) => {
    const app = new AppSharedPage(page);
    const login = new LoginPage(page);

    await app.navigateAndSetLanguage();
    await expect(page).toHaveURL(new RegExp(`${login.url}(?:\\?|$)`));
    await login.login();
  });
});
