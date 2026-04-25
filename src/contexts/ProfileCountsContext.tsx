'use client';

import { createContext } from 'react';

export interface ProfileCounts {
  followersCount: number;
  followingCount: number;
  postCount: number;
}

export interface ProfileCountsContextType {
  profile: ProfileCounts | null;
  setProfile: (profile: ProfileCounts | null) => void;
  refetchProfile: () => Promise<void>;
}

export const ProfileCountsContext = createContext<ProfileCountsContextType | null>(null);
