import { test, expect } from '@playwright/test';

type ApiUser = {
  id: number;
  name: string;
  username: string;
  email: string;

};

test('GET users returns users with valid data', async ({ request }) => {
  const response = await request.get(
    'https://jsonplaceholder.typicode.com/users'
  );

  expect(response.status()).toBe(200);

const users: ApiUser[] = await response.json(); 

expect(users.length).toBeGreaterThan(0);

const userWithValidData = users.find((user) =>
typeof  user.id === 'number' &&
    user.name !== '' &&
    user.username !== '' &&
    user.email !== ''
);

expect(userWithValidData).toBeTruthy();
});
test('GET single user returns expected user details', async ({ request }) => {
  const response = await request.get(
    'https://jsonplaceholder.typicode.com/users/1'
  );

  expect(response.status()).toBe(200);

  const user: ApiUser = await response.json();

  expect(user.id).toBe(1);
  expect(user.email).not.toBe('');
  expect(user.name).toBe('Leanne Graham');
});