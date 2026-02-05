import { Dispatch, SetStateAction } from "react";

export interface profileCountType {
    followersCount: number;
    followingCount: number;
    postCount: number;
}

export interface ProfileCountsContextType {
    profile: profileCountType;
    setProfile: Dispatch<SetStateAction<profileCountType|null>>;
    refetchProfile: () => void;
}