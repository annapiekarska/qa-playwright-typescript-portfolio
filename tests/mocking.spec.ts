import { test, expect } from '@playwright/test';

test('mock API response in browser context', async ({ page }) => {
  await page.route('https://jsonplaceholder.typicode.com/posts', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });

  await page.goto('https://jsonplaceholder.typicode.com/posts');

  const bodyText = await page.locator('body').innerText();
  const body = JSON.parse(bodyText);

  expect(body).toEqual([]);
});
