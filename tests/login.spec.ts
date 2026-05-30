import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { validUser, invalidUser } from '../test-data/users';

test('user can log in with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(validUser.username, validUser.password);

  await expect(page.getByText('Products')).toBeVisible();
});

test('user cannot log in with invalid password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(invalidUser.username, invalidUser.password);

  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});