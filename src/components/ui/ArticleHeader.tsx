'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LikeButton } from './LikeButton';
import { DefaultAvatar } from './DefaultAvatar';
import { useToast } from '@/contexts/ToastContext';
import { deletePostUrl, getAuthHeaders } from '@/lib/api/client';

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
  authorUsername?: string;
}

export const ArticleHeader = ({ 
  category, 
  readTime, 
  title, 
  subtitle, 
  author, 
  date, 
  slug, 
  initialLikes = 0,
  authorUsername 
}: ArticleHeaderProps) => {
  const [isOwner, setIsOwner] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    // Check if current user is the post owner
    const token = localStorage.getItem('token');
    if (token && authorUsername) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log(payload)
        const username = payload.sub || payload.username;
        setIsOwner(username === authorUsername);
      } catch (error) {
        console.error('Error checking ownership:', error);
      }
    }
  }, [authorUsername]);

  const handleEdit = () => {
    router.push(`/edit/${slug}`);
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    try {
      const res = await fetch(deletePostUrl(slug), {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (res.ok) {
        showToast('Post deleted successfully', 'success');
        router.push('/home');
      } else {
        throw new Error('Failed to delete post');
      }
    } catch (error) {
      showToast('Failed to delete post', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <header className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4 text-zinc-600 text-xs uppercase tracking-widest font-semibold">
          <span>{category}</span>
          <span className="w-1 h-1 bg-zinc-400 rounded-full"></span>
          <span>{readTime}</span>
        </div>

        {isOwner && (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-zinc-600 hover:text-black transition-colors p-2"
              aria-label="Post options"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>

            {showMenu && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white border border-zinc-200 shadow-lg rounded z-50">
                  <button
                    onClick={handleEdit}
                    className="w-full text-left px-4 py-3 text-sm text-black hover:bg-zinc-100 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Post
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    {isDeleting ? 'Deleting...' : 'Delete Post'}
                  </button>
                </div>
              </>
            )}
          </div>
        )}
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
