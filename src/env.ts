const e = import.meta.env

export const env = {
  baseUrl: e.NEXT_PUBLIC_BASE_URL,
  dbUrl: e.DB_URL,
  githubClientId: e.GITHUB_CLIENT_ID,
  githubClientSecret: e.GITHUB_CLIENT_SECRET,
  googleClientId: e.GOOGLE_CLIENT_ID,
  googleClientSecret: e.GOOGLE_CLIENT_SECRET,
  googleRefreshToken: e.GOOGLE_REFRESH_TOKEN,
  googleUser: e.GOOGLE_USER,
};
