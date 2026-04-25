import { MetadataRoute } from 'next';
import { getPosts, frontendBaseUrl } from '@/lib/api/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = frontendBaseUrl || 'https://postra-frontend.vercel.app';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/home`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/signin`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  try {
    // Fetch up to 100 posts
    const res = await fetch(getPosts(0, 100), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Client-Type': 'web',
      },
      cache: 'no-store', // Always get fresh data for sitemap
    });

    if (!res.ok) {
      console.error('Failed to fetch posts for sitemap');
      return staticPages;
    }

    const data = await res.json();
    const posts = data.content || [];
    console.log(posts[0])

    // Extract unique usernames
    const uniqueUsernames = new Set<string>();
    posts.forEach((post: any) => {
      if (post.username) {
        uniqueUsernames.add(post.username);
      }
    });

    // Generate user profile URLs
    const userPages: MetadataRoute.Sitemap = Array.from(uniqueUsernames).map((username) => ({
      url: `${baseUrl}/${username}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    // Generate post URLs
    const postPages: MetadataRoute.Sitemap = posts.map((post: any) => ({
      url: `${baseUrl}/${post.username}/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.createdAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    // Combine all pages
    return [...staticPages, ...userPages, ...postPages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticPages;
  }
}
