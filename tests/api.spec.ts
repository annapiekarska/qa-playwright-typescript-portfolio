import { test, expect } from '@playwright/test';
import { apiUrls } from '../test-data/apiUrls';
import { PostSchema, PostsSchema } from '../schemas/postSchema';

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
type ApiPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

test('GET users returns users with valid data', async ({ request }) => {
  const response = await request.get(apiUrls.users);

  expect(response.status()).toBe(200);

  const users: ApiUser[] = await response.json();

  expect(users.length).toBeGreaterThan(0);

  const userWithValidData = users.find(
    (user) =>
      typeof user.id === 'number' && user.name !== '' && user.username !== '' && user.email !== ''
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
  const response = await request.post(apiUrls.posts, {
    data: payload,
  });
  expect(response.status()).toBe(201);

  const createdPost: CreatedPost = await response.json();

  expect(createdPost.id).toBeTruthy();
  expect(createdPost.title).toBe(payload.title);
  expect(createdPost.body).toBe(payload.body);
  expect(createdPost.userId).toBe(payload.userId);
});
test('GET posts returns posts with valid data', async ({ request }) => {
  const response = await request.get(apiUrls.posts);

  expect(response.status()).toBe(200);
  const posts: ApiPost[] = await response.json();

  expect(posts.length).toBeGreaterThan(0);

  PostsSchema.parse(posts);

  const firstPost = posts[0];

  expect(firstPost.title).not.toBe('');
  expect(firstPost.body).not.toBe('');
});
test('GET post by id', async ({ request }) => {
  const response = await request.get(`${apiUrls.posts}/1`);
  expect(response.status()).toBe(200);

  const post: ApiPost = await response.json();

  PostSchema.parse(post);

  expect(post.id).toBe(1);
  expect(post.title).not.toBe('');
  expect(post.body).not.toBe('');
});
test('GET non-existing post returns 404', async ({ request }) => {
  const response = await request.get(`${apiUrls.posts}/999999`);
  expect(response.status()).toBe(404);
});
test('PATCH post updates existing post', async ({ request }) => {
  const response = await request.patch(`${apiUrls.posts}/1`, {
    data: {
      title: 'Updated title',
    },
  });
  expect(response.status()).toBe(200);

  const updatedPost: ApiPost = await response.json();
  expect(updatedPost.title).toBe('Updated title');
  expect(updatedPost.id).toBe(1);
  expect(updatedPost.userId).toBe(1);
});
test('DELETE post deletes existing post', async ({ request }) => {
  const response = await request.delete(`${apiUrls.posts}/1`);
  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body).toEqual({});
});
