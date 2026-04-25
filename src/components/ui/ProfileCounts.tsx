'use client';

import { useProfileCounts } from '@/hooks/useProfileCounts';

export const ProfileCounts = () => {
  const { profile } = useProfileCounts();

  if (!profile) return null;

  return (
    <div className="flex gap-6 items-center text-xs text-black uppercase tracking-widest mt-2 mb-4 font-semibold">
      <span><strong>{profile.followersCount}</strong> Followers</span>
      <span><strong>{profile.followingCount}</strong> Following</span>
    </div>
  );
};
