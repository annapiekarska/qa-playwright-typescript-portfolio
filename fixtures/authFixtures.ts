import { test as base, expect, Page } from '@playwright/test';
import { loginAsStandardUser } from '../helpers/auth';

type AuthFixtures = {
  loggedInPage: Page;
};

const test = base.extend<AuthFixtures>({
  loggedInPage: async ({ page }, use) => {
    await loginAsStandardUser(page);
    await use(page);
  },
});

export { test, expect };