'use client';

import { ProfileCountsContext, ProfileCounts } from '@/contexts/ProfileCountsContext';
import { getUserUrl } from '@/lib/api/client';
import { ReactNode, useEffect, useState } from 'react';

export const ProfileCountsProvider = ({ 
  children, 
  username 
}: { 
  children: ReactNode; 
  username: string;
}) => {
  const [profileCount, setProfileCount] = useState<ProfileCounts | null>(null);

  const fetchUserProfile = async () => {
    try {
      const res = await fetch(getUserUrl(username), {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'X-Client-Type': 'web',
        },
        credentials: 'include',
      });
      
      const result = await res.json();
      const user = result.data || result;
      
      const fetchedProfileCounts: ProfileCounts = {
        followersCount: user.numOfFollowers || 0,
        followingCount: user.numOfFollowing || 0,
        postCount: user.postCount || 0,
      };
      
      setProfileCount(fetchedProfileCounts);
    } catch (error) {
      console.error('Error fetching profile counts:', error);
      setProfileCount(null);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [username]);

  return (
    <ProfileCountsContext.Provider 
      value={{ 
        profile: profileCount, 
        setProfile: setProfileCount, 
        refetchProfile: fetchUserProfile 
      }}
    >
      {children}
    </ProfileCountsContext.Provider>
  );
};
