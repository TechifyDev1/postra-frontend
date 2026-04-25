'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { checkFollowUrl, followUrl, getAuthHeaders } from '@/lib/api/client';
import { useToast } from '@/contexts/ToastContext';

interface FollowCardProps {
  name: string;
  role: string;
  username: string;
}

export const FollowCard = ({ name, role, username }: FollowCardProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    };
    
    checkAuth();
  }, []);

  const checkFollowStatus = async () => {
    if (!isAuthenticated) return;

    try {
      const res = await fetch(checkFollowUrl(username), {
        method: 'GET',
        headers: getAuthHeaders(),
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json();
        setIsFollowing(data.data || data.isFollowing || false);
      }
    } catch (error) {
      console.error('Error checking follow status:', error);
    }
  };

  useEffect(() => {
    checkFollowStatus();
  }, [username, isAuthenticated]);

  const handleFollow = async () => {
    if (!isAuthenticated) {
      showToast('Please sign in to follow users', 'info');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(followUrl(username), {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json();
        const message = data.message || (isFollowing ? 'Unfollowed successfully' : 'Followed successfully');
        showToast(message, 'success');
        await checkFollowStatus();
      } else {
        const error = await res.json();
        showToast(error.message || 'Failed to update follow status', 'error');
      }
    } catch (error) {
      console.error('Error toggling follow:', error);
      showToast('An error occurred', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <Link href={`/${username}`} className="flex flex-col hover:opacity-70 transition-opacity">
        <span className="text-base font-bold text-black">{name}</span>
        <span className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">{role}</span>
      </Link>
      <button
        onClick={handleFollow}
        disabled={isLoading}
        className="border border-black text-black text-xs px-3 py-1 uppercase tracking-widest font-semibold hover:bg-black hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? '...' : isFollowing ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  );
};
