'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/contexts/ToastContext';
import { deletePostUrl, getAuthHeaders } from '@/lib/api/client';

interface ProfileStoryItemProps {
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  slug?: string;
  username?: string;
}

export const ProfileStoryItem = ({ 
  date, 
  readTime, 
  title, 
  excerpt,
  slug,
  username
}: ProfileStoryItemProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    // Check ownership on client side only
    if (typeof window !== 'undefined' && username) {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const currentUsername = payload.sub || payload.username;
          setIsOwner(currentUsername === username);
        } catch (error) {
          console.error('Error checking ownership:', error);
        }
      }
    }
  }, [username]);

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (slug) {
      router.push(`/edit/${slug}`);
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    if (!slug) return;

    setIsDeleting(true);
    try {
      const res = await fetch(deletePostUrl(slug), {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (res.ok) {
        showToast('Post deleted successfully', 'success');
        router.refresh();
      } else {
        throw new Error('Failed to delete post');
      }
    } catch (error) {
      showToast('Failed to delete post', 'error');
    } finally {
      setIsDeleting(false);
      setShowMenu(false);
    }
  };

  return (
    <article className="group flex flex-col gap-3 cursor-pointer relative">
      {isOwner && slug && (
        <div className="absolute top-0 right-0 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className="bg-white border border-zinc-300 p-2 rounded hover:bg-zinc-100 transition-colors"
            aria-label="Post options"
          >
            <svg className="w-5 h-5 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>

          {showMenu && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowMenu(false);
                }}
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

      <div className="text-xs text-zinc-600 uppercase tracking-widest font-semibold">
        <span>{date}</span>
        <span className="mx-2 text-zinc-400">|</span>
        <span>{readTime}</span>
      </div>
      <h3 className="text-4xl font-medium leading-tight tracking-tight text-black group-hover:text-zinc-600 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-base text-zinc-600 leading-relaxed">{excerpt}</p>
    </article>
  );
};
