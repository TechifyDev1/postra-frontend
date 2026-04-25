import { Metadata } from 'next';

interface ArticleMetadata {
  title: string;
  description: string;
  author: string;
  publishedTime: string;
  modifiedTime?: string;
  tags?: string[];
  image?: string;
  slug: string;
}

interface ProfileMetadata {
  name: string;
  bio: string;
  username: string;
  image?: string;
}

const SITE_NAME = 'Postra';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://postra.com';
const SITE_DESCRIPTION = 'A sanctuary for the written word. Join a community of thinkers, writers, and readers dedicated to depth in the age of speed.';

export function generateArticleMetadata(article: ArticleMetadata): Metadata {
  const url = `${SITE_URL}/article/${article.slug}`;
  const imageUrl = article.image || `${SITE_URL}/og-default.png`;

  return {
    title: `${article.title} | ${SITE_NAME}`,
    description: article.description,
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: article.publishedTime,
      modifiedTime: article.modifiedTime,
      authors: [article.author],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [imageUrl],
      creator: `@${article.author}`,
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generateProfileMetadata(profile: ProfileMetadata): Metadata {
  const url = `${SITE_URL}/writer/${profile.username}`;
  const imageUrl = profile.image || `${SITE_URL}/og-default.png`;

  return {
    title: `${profile.name} | ${SITE_NAME}`,
    description: profile.bio,
    openGraph: {
      title: profile.name,
      description: profile.bio,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: profile.name,
        },
      ],
      locale: 'en_US',
      type: 'profile',
    },
    twitter: {
      card: 'summary',
      title: profile.name,
      description: profile.bio,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generateHomeMetadata(): Metadata {
  return {
    title: `${SITE_NAME} - The essence of thought, captured in ink`,
    description: SITE_DESCRIPTION,
    openGraph: {
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      siteName: SITE_NAME,
      images: [
        {
          url: `${SITE_URL}/og-default.png`,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      images: [`${SITE_URL}/og-default.png`],
    },
  };
}
