'use client';

import { UserContext, User } from '@/contexts/UserContext';
import { getUserUrl, getAuthHeaders } from '@/lib/api/client';
import { getToken } from '@/lib/auth/authGuard';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchMe = async () => {
    try {
      const token = getToken(); // Use iOS-compatible getToken
      if (!token) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      const res = await fetch(getUserUrl('me'), {
        method: 'GET',
        headers: getAuthHeaders(),
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.data || data);
        router.refresh();
      } else {
        // Token might be invalid or expired
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const refetchUser = async () => {
    await fetchMe();
  };

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, refetchUser }}>
      {children}
    </UserContext.Provider>
  );
};
