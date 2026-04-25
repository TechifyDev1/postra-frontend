'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserContext } from './useUserContext';

interface UseRequireAuthOptions {
  redirectTo?: string;
  redirectIfAuthenticated?: boolean;
}

export const useRequireAuth = (options: UseRequireAuthOptions = {}) => {
  const { 
    redirectTo = '/signin', 
    redirectIfAuthenticated = false 
  } = options;
  
  const { user, isLoading } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    // Wait for loading to complete
    if (isLoading) return;

    // Redirect unauthenticated users to signin
    if (!redirectIfAuthenticated && !user) {
      router.push(redirectTo);
    }

    // Redirect authenticated users away (for signin/signup pages)
    if (redirectIfAuthenticated && user) {
      router.push(redirectTo);
    }
  }, [user, isLoading, router, redirectTo, redirectIfAuthenticated]);

  return { user, isLoading };
};
