'use client';

import { createContext } from 'react';

export interface User {
  username: string;
  fullName: string;
  bio?: string;
  website?: string;
  profilePictureUrl?: string;
  numOfFollowers?: number;
  numOfFollowing?: number;
  postCount?: number;
}

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  refetchUser: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | null>(null);
