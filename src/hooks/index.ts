// Custom React hooks
'use client';

import { useState, useCallback } from 'react';

export const useAsync = <T,>(
  asyncFunction: () => Promise<T>,
  immediate = true
) => {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    setStatus('pending');
    try {
      const response = await asyncFunction();
      setData(response);
      setStatus('success');
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      setStatus('error');
    }
  }, [asyncFunction]);

  if (immediate) {
    execute();
  }

  return { execute, status, data, error };
};

export { useProfileCounts } from './useProfileCounts';
export { useUserContext } from './useUserContext';
export { useRequireAuth } from './useRequireAuth';
