'use client';

import Image from 'next/image';
import { LikeButton } from './LikeButton';
import { DefaultAvatar } from './DefaultAvatar';

interface ArticleHeaderProps {
  category: string;
  readTime: string;
  title: string;
  subtitle: string;
  author: {
    name: string;
    image?: string;
  };
  date: string;
  slug: string;
  initialLikes?: number;
}

export const ArticleHeader = ({ category, readTime, title, subtitle, author, date, slug, initialLikes = 0 }: ArticleHeaderProps) => {
  return (
    <header className="mb-16">
      <div className="flex items-center gap-4 mb-8 text-zinc-600 text-xs uppercase tracking-widest font-semibold">
        <span>{category}</span>
        <span className="w-1 h-1 bg-zinc-400 rounded-full"></span>
        <span>{readTime}</span>
      </div>

      <h1 className="text-6xl font-semibold leading-tight tracking-tight mb-8 text-black">
        {title}
      </h1>

      <p className="text-3xl leading-relaxed text-zinc-600 mb-16 italic font-serif">
        {subtitle}
      </p>

      <div className="flex justify-between items-center border-y border-zinc-200 py-4 mb-16">
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-zinc-300">
            {author.image ? (
              <Image
                src={author.image}
                alt={author.name}
                fill
                sizes="48px"
                className="object-cover grayscale"
              />
            ) : (
              <DefaultAvatar size={48} />
            )}
          </div>
          <div>
            <div className="text-xs text-black uppercase tracking-widest mb-1 font-semibold">
              BY {author.name}
            </div>
            <div className="text-xs text-zinc-600 uppercase tracking-widest font-semibold">
              {date}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="[&>button]:flex [&>button]:items-center [&>button]:gap-1">
            <LikeButton count={initialLikes} slug={slug} />
          </div>
          <button 
            aria-label="Save Article" 
            className="text-zinc-600 hover:text-black transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
          <button aria-label="Share Article" className="text-zinc-600 hover:text-black transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};
