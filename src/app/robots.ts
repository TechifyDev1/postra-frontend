import { MetadataRoute } from 'next';
import { frontendBaseUrl } from '@/lib/api/client';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = frontendBaseUrl || 'https://postra-frontend.vercel.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/edit/',
          '/new',
          '/settings',
          '/profile',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
