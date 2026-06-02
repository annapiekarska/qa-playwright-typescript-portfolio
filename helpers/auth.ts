import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { validUser } from '../test-data/users';

export async function loginAsStandardUser(page: Page) {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(validUser.username, validUser.password);
}
