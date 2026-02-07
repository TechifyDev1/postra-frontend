import { Dispatch, SetStateAction } from "react";

export interface userInterface {
    fullName: string;
    username: string;
    noOffollowers: number;
    noOffollowing: number;
    profileImage: string;
    bgImage?: string;
    bio?: string;
    profilePictureUrl?: string;
}

export interface userContextInterface {
    user: userInterface | null;
    setUser: Dispatch<SetStateAction<userInterface | null>>;
    isLoading: boolean;
    refetchUser?: () => {};
}