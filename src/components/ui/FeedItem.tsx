'use client';

import Link from 'next/link';
import Image from 'next/image';
import { LikeButton } from './LikeButton';

interface FeedItemProps {
  author: string;
  username: string;
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
  initialLikes?: number;
  initialComments?: number;
  postBanner?: string;
  featured?: boolean;
}

export const FeedItem = ({ 
  author, 
  username,
  slug,
  date, 
  title, 
  excerpt, 
  readTime, 
  initialLikes = 0, 
  initialComments = 0,
  postBanner,
  featured = false
}: FeedItemProps) => {
  // Featured post layout (first post)
  if (featured) {
    return (
      <article className="flex flex-col gap-6 pb-12 border-b border-zinc-200">
        {/* Banner Image */}
        {postBanner && (
          <Link href={`/${username}/${slug}`}>
            <div className="relative w-full aspect-video overflow-hidden border border-zinc-300 cursor-pointer group">
              <Image
                src={postBanner}
                alt={title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 720px"
                className="object-cover grayscale group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>
        )}

        <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-zinc-600">
          <Link href={`/${username}`} className="hover:text-black transition-colors">
            {author}
          </Link>
          <span className="text-zinc-400">•</span>
          <span className="text-zinc-400">{date}</span>
        </div>
        
        <Link href={`/${username}/${slug}`}>
          <h2 className="text-4xl font-semibold text-black font-serif cursor-pointer hover:underline decoration-1 underline-offset-4 leading-tight tracking-tight">
            {title}
          </h2>
        </Link>
        
        <p className="text-lg leading-relaxed text-zinc-600 line-clamp-3">
          {excerpt}
        </p>
        
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-4">
            <span className="text-xs text-zinc-500 border border-zinc-300 px-2 py-1 uppercase tracking-widest font-semibold">
              {readTime}
            </span>
            
            <LikeButton count={initialLikes} slug={slug} />

            <Link href={`/${username}/${slug}#comments`} className="flex items-center gap-1 text-zinc-500 hover:text-black transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {initialComments > 0 && <span className="text-xs font-semibold">{initialComments}</span>}
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // Regular post layout with side banner
  return (
    <article className="flex flex-col md:flex-row gap-6 pb-8 border-b border-zinc-200">
      {/* Banner Image - Top on mobile, right on desktop */}
      {postBanner && (
        <Link href={`/${username}/${slug}`} className="shrink-0 md:order-2">
          <div className="relative w-full md:w-32 aspect-video md:aspect-square overflow-hidden border border-zinc-300 cursor-pointer group">
            <Image
              src={postBanner}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 128px"
              className="object-cover grayscale group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
      )}

      <div className="flex-grow flex flex-col gap-4 md:order-1">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-zinc-600">
          <Link href={`/${username}`} className="hover:text-black transition-colors">
            {author}
          </Link>
          <span className="text-zinc-400">•</span>
          <span className="text-zinc-400">{date}</span>
        </div>
        
        <Link href={`/${username}/${slug}`}>
          <h2 className="text-2xl font-medium text-black font-serif cursor-pointer hover:underline decoration-1 underline-offset-4 leading-tight">
            {title}
          </h2>
        </Link>
        
        <p className="text-base leading-relaxed text-zinc-600 line-clamp-2">
          {excerpt}
        </p>
        
        <div className="flex items-center gap-4 mt-2">
          <span className="text-xs text-zinc-500 border border-zinc-300 px-2 py-1 uppercase tracking-widest font-semibold">
            {readTime}
          </span>
          
          <LikeButton count={initialLikes} slug={slug} />

          <Link href={`/${username}/${slug}#comments`} className="flex items-center gap-1 text-zinc-500 hover:text-black transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {initialComments > 0 && <span className="text-xs font-semibold">{initialComments}</span>}
          </Link>
        </div>
      </div>
    </article>
  );
};
