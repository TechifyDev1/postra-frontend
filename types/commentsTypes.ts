import { Dispatch, SetStateAction } from "react";

export interface commentInterface {
    content: string;
    authorUsername: string;
    profilePictureUrl?: string;
}

export interface commentsContextInterface {
    comments: commentInterface[] | null;
    addComment: (content: string) => Promise<void>;
    refetchComments: () => Promise<void>;
}