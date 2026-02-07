"use client"
import { ProfileCountsContext } from "@/contexts/ProfileCountsContext";
import { profileCountType } from "@/types/profileCount";
import { getUserUrl } from "@/utils";
import { ReactNode, useEffect, useState } from "react";

export const ProfileCountsProvider = ({ children, username }: { children: ReactNode, username: string }) => {
    const [profileCount, setProfileCount] = useState<profileCountType | null>(null);
    useEffect(() => {
        fetchUserProfile();
    }, [username])
    const fetchUserProfile = async () => {
        try {
            const res = await fetch(getUserUrl(username), {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });
            const result = await res.json();
            const user = result.data;
            const fetchedProfileCounts: profileCountType = {
                followersCount: user.numOfFollowers || 0,
                followingCount: user.numOfFollowing || 0,
                postCount: user.postCount || 0
            }
            setProfileCount(fetchedProfileCounts);
            console.log("Fetched profile counts",fetchedProfileCounts)
        } catch (error) {
            console.error(error);
            setProfileCount(null);
        }
    }

    return (
        <ProfileCountsContext.Provider value={{ profile: profileCount!, setProfile: setProfileCount, refetchProfile: fetchUserProfile }}>
            {children}
        </ProfileCountsContext.Provider>
    )
}