import { Dispatch, SetStateAction } from "react";

export interface userInterface {
    fullname: string;
    username: string;
    noOffollowers: number;
    noOffollowing: number;
    profileImage: string;
    coverImage?: string;
}

export interface userContextInterface {
    user: userInterface | null;
    setUser: Dispatch<SetStateAction<userInterface | null>>;
    isLoading: boolean;
}