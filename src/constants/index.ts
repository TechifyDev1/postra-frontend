// Application constants
export const APP_NAME = 'Postra';
export const APP_VERSION = '1.0.0';

export const ROUTES = {
  HOME: '/',
  FEED: '/home',
  PROFILE: '/profile',
  LIBRARY: '/library',
  FOLLOWING: '/following',
} as const;

export const API_ENDPOINTS = {
  USERS: '/api/users',
  POSTS: '/api/posts',
  PROFILE: '/api/profile',
} as const;
