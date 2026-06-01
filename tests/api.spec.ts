import { test, expect } from '@playwright/test';
import { apiUrls } from '../test-data/apiUrls';

type ApiUser = {
  id: number;
  name: string;
  username: string;
  email: string;

};
type CreatePostPayload = {
    title: string;
    body: string;
    userId: number;
};
type CreatedPost = CreatePostPayload & {
    id: number;
};

test('GET users returns users with valid data', async ({ request }) => {
  const response = await request.get(apiUrls.users);

  expect(response.status()).toBe(200);

  const users: ApiUser[] = await response.json();

  expect(users.length).toBeGreaterThan(0);

  const userWithValidData = users.find((user) =>
    typeof user.id === 'number' &&
    user.name !== '' &&
    user.username !== '' &&
    user.email !== ''
  );

  expect(userWithValidData).toBeTruthy();
});
test('GET single user returns expected user details', async ({ request }) => {
  const response = await request.get(`${apiUrls.users}/1`);

  expect(response.status()).toBe(200);

  const user: ApiUser = await response.json();

  expect(user.id).toBe(1);
  expect(user.email).not.toBe('');
  expect(user.name).toBe('Leanne Graham');
});
test('POST posts creates a new post', async ({ request }) => {
    const payload: CreatePostPayload = {
        title: 'Playwright API test',
        body: 'This post was created by an automated API test',
        userId: 1,
    };
    const response = await request.post(
        'https://jsonplaceholder.typicode.com/posts',
    {

      data: payload,

    }
  );
 expect(response.status()).toBe(201);

  const createdPost: CreatedPost = await response.json(); expect(createdPost.id).toBeTruthy();
  expect(createdPost.title).toBe(payload.title);
  expect(createdPost.body).toBe(payload.body);
  expect(createdPost.userId).toBe(payload.userId);
});