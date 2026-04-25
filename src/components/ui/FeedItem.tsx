'use client';

import Link from 'next/link';
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
  initialComments = 0 
}: FeedItemProps) => {
  return (
    <article className="flex flex-col gap-4 pb-8 border-b border-zinc-200">
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-zinc-600">
        <Link href={`/${username}`} className="hover:text-black transition-colors">
          {author}
        </Link>
        <span className="text-zinc-400">•</span>
        <span className="text-zinc-400">{date}</span>
      </div>
      
      <Link href={`/${username}/${slug}`}>
        <h2 className="text-3xl font-medium text-black font-serif cursor-pointer hover:underline decoration-1 underline-offset-4">
          {title}
        </h2>
      </Link>
      
      <p className="text-base leading-relaxed text-zinc-600 line-clamp-3">
        {excerpt}
      </p>
      
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-4">
          <span className="text-xs text-zinc-500 border border-zinc-300 px-2 py-1 uppercase tracking-widest font-semibold">
            {readTime}
          </span>
          
          {/* Like Button */}
          <LikeButton count={initialLikes} slug={slug} />

          {/* Comment Button */}
          <Link href={`/${username}/${slug}#comments`} className="flex items-center gap-1 text-zinc-500 hover:text-black transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {initialComments > 0 && <span className="text-xs font-semibold">{initialComments}</span>}
          </Link>
        </div>

        {/* Save Button */}
        <button 
          aria-label="Save for later" 
          className="text-zinc-500 hover:text-black transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div>
    </article>
  );
};
