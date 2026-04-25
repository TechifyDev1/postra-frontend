import { ProfileCountsContext } from '@/contexts/ProfileCountsContext';
import { useContext } from 'react';

export const useProfileCounts = () => {
  const context = useContext(ProfileCountsContext);
  if (!context) {
    throw new Error('useProfileCounts must be used within ProfileCountsProvider');
  }
  return context;
};
