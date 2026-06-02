const apiBaseUrl = process.env.API_BASE_URL;

if (!apiBaseUrl) {
  throw new Error('API_BASE_URL is not configured');
}
export const apiUrls = {
  users: `${apiBaseUrl}/users`,
  posts: `${apiBaseUrl}/posts`,
};