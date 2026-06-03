import { test as setup } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { validUser } from '../../test-data/users';

setup('authenticate as standard user', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login(validUser.username, validUser.password);

  await page.context().storageState({
    path: 'playwright/.auth/standard-user.json',
  });
});
