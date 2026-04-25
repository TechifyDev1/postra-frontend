# Postra - Implementation Guide

## Overview
This document outlines the implementation of API integration, caching with Next.js 16, and SEO optimization for the Postra frontend.

## Key Features Implemented

### 1. API Integration (`src/lib/api/client.ts`)
- Centralized API client matching the main branch implementation
- Base URL: `https://postra-backend.onrender.com/api`
- Helper functions:
  - `getAuthHeaders()` - Handles Bearer token authentication
  - `truncate()` - Text truncation utility
  - `getRelativeTime()` - Formats dates as relative time
- Endpoints for:
  - Posts (create, update, delete, fetch)
  - Users/Profiles
  - Comments
  - Likes
  - Follow/Unfollow
  - Authentication (register, login, logout)
  - File uploads

### 2. Caching with Next.js 16 Cache Components
**What it does:** Pre-renders pages at build time and keeps them cached. Even when the backend is down, users and search engines see the last successfully generated version.

**Implementation:**
- `cacheComponents: true` in `next.config.ts` - Enables automatic caching
- `cache: 'force-cache'` in fetch calls - Caches responses
- `generateStaticParams()` - Pre-generates popular articles and profiles at build time
- Fallback pages ensure SEO doesn't collapse when backend is unavailable

**Benefits:**
- ✅ Fast page loads (served from cache)
- ✅ SEO-friendly (search engines always see content)
- ✅ Resilient to backend downtime
- ✅ Automatic cache management by Next.js 16

### 3. SEO Optimization
- Dynamic metadata generation for articles and profiles
- Open Graph tags for social media sharing
- Twitter Card support
- Canonical URLs
- Structured data for search engines

### 4. Pages with Caching + SEO

#### Article Page (`/article/[slug]`)
- Pre-renders top 50 articles at build time
- Generates SEO metadata dynamically
- Uses force-cache strategy
- Falls back to cached version if API fails

#### Writer Profile (`/writer/[username]`)
- Generates profile metadata for SEO
- Shows follower counts, bio, and articles
- Uses force-cache strategy

#### Home Feed (`/home`)
- Fetches latest posts from API
- Uses force-cache strategy
- Shows like and comment counts

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://postra-backend.onrender.com/api
NEXT_PUBLIC_SITE_URL=https://postra-frontend.vercel.app
```

## How Caching Works in Next.js 16

1. **Build Time:**
   - Next.js calls `generateStaticParams()` to get list of popular articles/profiles
   - Pre-renders these pages as static HTML
   - Stores them in cache

2. **Runtime:**
   - First request serves cached version (instant)
   - Cache is managed automatically by Next.js 16
   - `cacheComponents` enables intelligent cache invalidation

3. **Backend Down:**
   - Cached version continues to serve
   - SEO remains intact
   - Users see last successful version
   - No 404 errors for search engines

## API Integration Points

### Posts
```typescript
// Fetch posts
const res = await fetch(getPosts(0, 30));
const data = await res.json();
const posts = data.content;

// Get specific post
const res = await fetch(getApost(username, slug));
const post = await res.json();

// Like post
await fetch(likeUrl(slug), {
  method: 'POST',
  headers: getAuthHeaders(),
});

// Add comment
await fetch(addCommentUrl(postSlug), {
  method: 'POST',
  headers: getAuthHeaders(),
  body: JSON.stringify({ content }),
});
```

### Users
```typescript
// Fetch user profile
const res = await fetch(getUserUrl(username));
const user = await res.json();

// Get user posts
const res = await fetch(getUserPostsUrl(username, 0, 20));
const data = await res.json();
const posts = data.content;
```

### Authentication
```typescript
// Register
await fetch(createUserUrl, {
  method: 'POST',
  headers: getAuthHeaders(),
  body: JSON.stringify({ fullName, email, password }),
});

// Login
await fetch(loginUrl, {
  method: 'POST',
  headers: getAuthHeaders(),
  body: JSON.stringify({ email, password }),
});
```

## Next Steps

1. **Authentication Context:**
   - Create auth provider for token management
   - Store tokens in localStorage (client) or cookies (server)
   - Add protected route middleware

2. **Complete Comment Integration:**
   - CommentSection now fetches from API
   - Add error handling and loading states

3. **Add Like Functionality:**
   - Update FeedItem and ArticleHeader to call like API
   - Toggle like state on click

4. **Follow/Unfollow:**
   - Implement follow button functionality
   - Update follower counts dynamically

5. **Image Uploads:**
   - Connect ImageUpload component to upload API
   - Handle Cloudinary integration

## Performance Optimizations

- ✅ Cache Components for fast page loads
- ✅ Image optimization with Next.js Image
- ✅ Font optimization (Google Fonts)
- ✅ Code splitting (automatic with Next.js)
- ✅ Lazy loading components
- ✅ Minimal JavaScript bundle
- ✅ Cloudinary for image hosting

## SEO Checklist

- ✅ Dynamic meta tags
- ✅ Open Graph tags
- ✅ Twitter Cards
- ✅ Canonical URLs
- ✅ Semantic HTML
- ✅ Alt text for images
- ✅ Structured data ready
- ⏳ Sitemap (add `sitemap.xml`)
- ⏳ Robots.txt (add `robots.txt`)

## Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Monitoring

Monitor cache effectiveness:
- Check Next.js build output for pre-rendered pages
- Monitor cache hit rates
- Track API response times
- Monitor backend availability

## Troubleshooting

**Pages not pre-rendering:**
- Check `generateStaticParams()` returns valid data
- Verify API is accessible during build
- Check build logs for errors

**SEO not working:**
- Verify metadata is generated correctly
- Check page source for meta tags
- Use Google Search Console to test

**Cache not working:**
- Verify `cacheComponents: true` in `next.config.ts`
- Check fetch calls use `cache: 'force-cache'`
- Clear Next.js cache: `rm -rf .next`

**API Errors:**
- Check CORS settings on backend
- Verify API endpoints match main branch
- Check authentication headers

## API Response Structure

### Posts List
```json
{
  "content": [
    {
      "id": "string",
      "title": "string",
      "subTitle": "string",
      "content": "html string",
      "slug": "string",
      "postBanner": "url",
      "authorFullName": "string",
      "username": "string",
      "profilePic": "url",
      "likeCount": 0,
      "commentCount": 0,
      "createdAt": "ISO date"
    }
  ]
}
```

### User Profile
```json
{
  "fullName": "string",
  "username": "string",
  "bio": "string",
  "profilePictureUrl": "url",
  "bgImage": "url",
  "numOfFollowers": 0,
  "numOfFollowing": 0,
  "postCount": 0
}
```
