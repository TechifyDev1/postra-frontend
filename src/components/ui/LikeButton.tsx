'use client';

import { FC, MouseEventHandler, useEffect, useState } from 'react';
import { likeUrl, getAuthHeaders } from '@/lib/api/client';
import { useToast } from '@/contexts/ToastContext';

interface LikeButtonProps {
  count: number;
  slug: string;
}

export const LikeButton: FC<LikeButtonProps> = ({ count, slug }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCounts, setLikeCounts] = useState<number>(count);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const checkIsLiked = async () => {
      if (!isAuthenticated) return;
      
      try {
        const res = await fetch(likeUrl(slug) + '/is-liked', {
          method: 'GET',
          headers: getAuthHeaders(),
          credentials: 'include',
        });
        
        const result = await res.json();
        
        if (typeof result === 'boolean') {
          setIsLiked(result);
        } else if (result.data !== undefined) {
          setIsLiked(result.data);
        } else {
          setIsLiked(false);
        }
      } catch (error) {
        console.error('Error checking like status:', error);
      }
    };

    checkIsLiked();
    setLikeCounts(count);
  }, [slug, count, isAuthenticated]);

  const handleLike: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      showToast('Please sign in to like posts', 'info');
      return;
    }

    if (loading) return;

    setLoading(true);
    showToast('Please wait...', 'info');

    try {
      const res = await fetch(likeUrl(slug), {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
      });

      const result = await res.json();

      if (result.error) {
        showToast(result.error, 'error');
        return;
      }

      if (result.message === 'Liked') {
        showToast('Post liked successfully', 'success');
        setIsLiked(true);
      } else if (result.message === 'Unliked') {
        showToast('Post unliked successfully', 'success');
        setIsLiked(false);
      }

      if (result.totalLikes !== undefined) {
        setLikeCounts(result.totalLikes);
      }
    } catch (error) {
      console.error('Error liking post:', error);
      showToast('Error liking the post', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className={`flex items-center gap-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
        isLiked ? 'text-black' : 'text-zinc-500 hover:text-black'
      }`}
      aria-label="Like"
    >
      <svg 
        className="w-5 h-5" 
        fill={isLiked ? 'currentColor' : 'none'} 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
        />
      </svg>
      {likeCounts > 0 && <span className="text-xs font-semibold">{likeCounts}</span>}
    </button>
  );
};
