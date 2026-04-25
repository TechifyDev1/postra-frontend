'use client';

import { useState, useEffect } from 'react';
import { FeedItem } from './FeedItem';

interface FeaturedCarouselProps {
  posts: Array<{
    id: string;
    authorFullName: string;
    username: string;
    slug: string;
    createdAt: string;
    title: string;
    subTitle: string;
    likeCount: number;
    commentCount: number;
    postBanner?: string;
  }>;
}

export const FeaturedCarousel = ({ posts }: FeaturedCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying || posts.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % posts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, posts.length]);

  if (posts.length === 0) return null;

  const currentPost = posts[currentIndex];

  return (
    <div className="relative">
      <FeedItem
        key={currentPost.id}
        author={currentPost.authorFullName}
        username={currentPost.username}
        slug={currentPost.slug}
        date={new Date(currentPost.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        title={currentPost.title}
        excerpt={currentPost.subTitle || ''}
        readTime="5 min read"
        initialLikes={currentPost.likeCount || 0}
        initialComments={currentPost.commentCount || 0}
        postBanner={currentPost.postBanner}
        featured={true}
      />

      {/* Carousel Controls */}
      {posts.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          {/* Dots */}
          <div className="flex gap-2">
            {posts.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-black w-8'
                    : 'bg-zinc-300 hover:bg-zinc-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Play/Pause */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="text-zinc-500 hover:text-black transition-colors"
            aria-label={isAutoPlaying ? 'Pause' : 'Play'}
          >
            {isAutoPlaying ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
