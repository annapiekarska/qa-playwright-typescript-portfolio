import { test, expect } from '@playwright/test';
import { PostsSchema } from '../schemas/postSchema';

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
test('mock API server error response', async ({ page }) => {
  await page.route('https://jsonplaceholder.typicode.com/posts', async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({
        error: 'Internal Server Error',
      }),
    });
  });

  const response = await page.goto('https://jsonplaceholder.typicode.com/posts');

  expect(response?.status()).toBe(500);

  const bodyText = await page.locator('body').innerText();
  const body = JSON.parse(bodyText);

  expect(body.error).toBe('Internal Server Error');
});
test('mock API server error response with delay', async ({ page }) => {
  await page.route('https://jsonplaceholder.typicode.com/posts', async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({
        error: 'Internal Server Error',
      }),
    });
  });
  const response = await page.goto('https://jsonplaceholder.typicode.com/posts');
  expect(response?.status()).toBe(500);

  const bodyText = await page.locator('body').innerText();
  const body = JSON.parse(bodyText);

  expect(body.error).toBe('Internal Server Error');
});
test('mock API response with invalid data shape', async ({ page }) => {
  await page.route('https://jsonplaceholder.typicode.com/posts', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          userId: 1,
          id: 'wrong-id',
          title: 'Mocked post',
          body: 'This post has invalid id type',
        },
      ]),
    });
  });
  const response = await page.goto('https://jsonplaceholder.typicode.com/posts');
  expect(response?.status()).toBe(200);
  const bodyText = await page.locator('body').innerText();
  const body = JSON.parse(bodyText);
  expect(() => PostsSchema.parse(body)).toThrow();
});
test('mock API response with valid data shape but invalid business values', async ({ page }) => {
  await page.route('https://jsonplaceholder.typicode.com/posts', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          userId: 1,
          id: 1,
          title: '',
          body: '',
        },
      ]),
    });
  });

  const response = await page.goto('https://jsonplaceholder.typicode.com/posts');

  expect(response?.status()).toBe(200);

  const bodyText = await page.locator('body').innerText();
  const body = JSON.parse(bodyText);

  expect(() => PostsSchema.parse(body)).not.toThrow();

  const post = body[0];

  expect(post.title).toBe('');
  expect(post.body).toBe('');
});
test('mock API response with valid data shape', async ({ page }) => {
  await page.route('https://jsonplaceholder.typicode.com/posts', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          userId: 1,
          id: 1,
          title: 'Mocked post',
          body: 'This is a mocked post',
        },
      ]),
    });
  });

  const response = await page.goto('https://jsonplaceholder.typicode.com/posts');

  expect(response?.status()).toBe(200);
  const bodyText = await page.locator('body').innerText();
  const body = JSON.parse(bodyText);

  expect(() => PostsSchema.parse(body)).not.toThrow();

  const post = body[0];
  expect(post.title).toBe('Mocked post');
});
