'use client';

import { useState, useEffect } from 'react';
import { checkFollowUrl, followUrl, getAuthHeaders } from '@/lib/api/client';
import { useToast } from '@/contexts/ToastContext';
import { useProfileCounts } from '@/hooks/useProfileCounts';

interface FollowButtonProps {
  targetUsername: string;
  isOwnProfile?: boolean;
}

export const FollowButton = ({ targetUsername, isOwnProfile = false }: FollowButtonProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { showToast } = useToast();
  const { refetchProfile } = useProfileCounts();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    };
    
    checkAuth();
  }, []);

  const checkFollowStatus = async () => {
    if (!isAuthenticated || isOwnProfile) return;

    try {
      const res = await fetch(checkFollowUrl(targetUsername), {
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
  }, [targetUsername, isAuthenticated, isOwnProfile]);

  const handleFollow = async () => {
    if (!isAuthenticated) {
      showToast('Please sign in to follow users', 'info');
      return;
    }

    if (isOwnProfile) return;

    setIsLoading(true);
    showToast('Please wait...', 'info');

    try {
      const res = await fetch(followUrl(targetUsername), {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json();
        const message = data.message || (isFollowing ? 'Unfollowed successfully' : 'Followed successfully');
        showToast(message, 'success');
        await checkFollowStatus();
        await refetchProfile();
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

  if (isOwnProfile) {
    return null;
  }

  return (
    <button
      onClick={handleFollow}
      disabled={isLoading}
      className="bg-black text-white text-xs uppercase tracking-widest px-8 py-3 hover:bg-zinc-800 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? 'Please wait...' : isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};
