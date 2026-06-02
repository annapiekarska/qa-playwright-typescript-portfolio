const apiBaseUrl = process.env.API_BASE_URL;

if (!apiBaseUrl) {
  throw new Error('API_BASE_URL is not configured');
}
export const apiUrls = {
  users: 'https://jsonplaceholder.typicode.com/users',
  posts: 'https://jsonplaceholder.typicode.com/posts',

};