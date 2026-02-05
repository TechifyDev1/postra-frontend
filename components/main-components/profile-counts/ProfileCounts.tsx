"use client";

import { FC } from "react";
import SmallText from "@/components/main-components/cell/small-text/SmallText";
import { UseProfileCounts } from "@/hooks/useProfileCounts";

const ProfileCounts: FC = () => {
  const { profile } = UseProfileCounts();

  if (!profile) return null;

  return (
    <SmallText align="alignLeft">
      Followers: {profile.followersCount} | 
      Following: {profile.followingCount} | 
      Posts: {profile.postCount}
    </SmallText>
  );
};

export default ProfileCounts;
