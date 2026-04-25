'use client';

import Image from 'next/image';
import { FollowButton } from './FollowButton';
import { ProfileCounts } from './ProfileCounts';
import { DefaultAvatar } from './DefaultAvatar';
import { useToast } from '@/contexts/ToastContext';
import { useEffect, useState } from 'react';

interface ProfileHeaderProps {
  userData: {
    fullName: string;
    username: string;
    bio?: string;
    profilePictureUrl?: string;
    profilePic?: string;
    currentUser?: boolean;
  };
}

export const ProfileHeader = ({ userData }: ProfileHeaderProps) => {
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    // Check if viewing own profile - use currentUser from API if available
    if (userData.currentUser !== undefined) {
      setIsOwnProfile(userData.currentUser);
    } else {
      // Fallback: decode JWT token
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const username = payload.sub || payload.username;
          setIsOwnProfile(username === userData.username);
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
    }
  }, [userData.username, userData.currentUser]);

  const handleSubscribe = () => {
    showToast('Coming soon!', 'info');
  };

  return (
    <section className="flex flex-col items-start gap-4 mb-16">
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-2 border border-zinc-300 relative">
        {(userData.profilePictureUrl || userData.profilePic) ? (
          <Image
            src={userData.profilePictureUrl || userData.profilePic || ''}
            alt={userData.fullName}
            fill
            sizes="(max-width: 768px) 96px, 128px"
            className="object-cover grayscale"
          />
        ) : (
          <DefaultAvatar size={128} className="w-full h-full" />
        )}
      </div>
      <h1 className="text-6xl font-semibold leading-tight tracking-tight text-black">{userData.fullName}</h1>
      <ProfileCounts />
      <p className="text-xl leading-relaxed text-zinc-600 max-w-[600px]">
        {userData.bio || 'Writer on Postra'}
      </p>
      <div className="flex gap-4 mt-4">
        <FollowButton targetUsername={userData.username} isOwnProfile={isOwnProfile} />
        <button 
          onClick={handleSubscribe}
          className="border border-black text-black text-xs uppercase tracking-widest px-8 py-3 hover:bg-zinc-100 transition-colors flex items-center gap-2 font-semibold"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Subscribe
        </button>
      </div>
    </section>
  );
};
