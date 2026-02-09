"use client"
import { CommentsContext } from "@/contexts/CommentsContext";
import { ModalContext } from "@/contexts/ModalContext";
import { useToast } from "@/contexts/ToastContext";
import { useUserContext } from "@/hooks/use-user-context";
import { commentInterface } from "@/types/commentsTypes";
import { addCommentUrl, getCommentsUrl } from "@/utils";
import { ReactNode, useContext, useEffect, useState } from "react";

export const CommentsProvider = ({ children, postSlug }: { children: ReactNode, postSlug?: string }) => {
    const [comments, setComments] = useState<commentInterface[] | null>(null);
    const { user } = useUserContext();
    const { showToast } = useToast();
    const { openModal } = useContext(ModalContext);
    const username = user?.username;

    const fetchComments = async () => {
        if(!postSlug) return;
        try {
            const res = await fetch(getCommentsUrl(postSlug), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const fetchedComments = await res.json();
            console.log(fetchedComments);
            setComments(fetchedComments);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message)
            }
            console.log(error);
            setComments([]);
        }
    }
    const addComment = async (content: string) => {
        if (username === undefined) {
            showToast('You are not logged in, log in to add comment', 'error');
            openModal("signUp");
            return;
        }

        // Optimistic update
        const tempId = Date.now().toString(); // Temporary ID for key
        const commentObject: commentInterface = {
            authorUsername: username,
            content
        }

        // Add to state immediately
        setComments(prev => prev ? [commentObject, ...prev] : [commentObject]);

        try {
            if(!postSlug) return;
            const res = await fetch(addCommentUrl(postSlug), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(commentObject),
            });

            if (!res.ok) {
                throw new Error("Failed to add comment")
            };

            // Silently refetch to get real IDs and data
            await fetchComments();
        } catch (error) {
            // Revert optimistic update on error
            setComments(prev => prev ? prev.filter(c => c !== commentObject) : []);
            showToast("An unknown error occured while adding your comment", 'error')
            console.error(error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [postSlug])

    return (
        <CommentsContext.Provider value={{ comments, addComment, refetchComments: fetchComments }}>
            {children}
        </CommentsContext.Provider>
    )
}