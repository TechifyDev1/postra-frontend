"use client"

import { FC, FormEvent, useEffect, useState } from "react";
import style from "./CommentBox.module.css";
import MediumButton from "@/components/landing-page/cell/medium-button/MediumButton";
import { PaperPlane, X } from "phosphor-react";
import CommentList from "../comment-list/CommentList";
import { UseShowComments } from "@/hooks/use-show-comments";
import { addCommentUrl, getCommentsUrl } from "@/utils";
import { useUserContext } from "@/hooks/use-user-context";
import { useToast } from "@/contexts/ToastContext";
import { useModalContext } from "@/hooks/use-modal-context";
import { useCommentsContext } from "@/hooks/use-comments";

const CommentBox: FC<{ postSlug: string }> = ({ postSlug }) => {
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState<any[]>([]);
    const [isSending, setIsSending] = useState(false);
    const [commentText, setCommentText] = useState("");
    const { user } = useUserContext();
    const { showToast } = useToast();
    const { setShow } = UseShowComments();
    const { openModal } = useModalContext();
    const {refetchComments} = useCommentsContext();
    useEffect(() => {
        fetchComments();
    }, [postSlug]);
    async function fetchComments() {
        if (loading) return;
        setLoading(true);
        try {
            const res = await fetch(getCommentsUrl(postSlug), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const comments = res.json();
            console.log(await comments);
            setComments(await comments);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
            setComments([]);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    const handleClose = () => {
        setShow(false);
    }
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (isSending) return;
        if (!user) {
            showToast("Please login to add a comment", "info");
            setShow(false);
            openModal("login");
            return;
        }
        if (commentText.length === 0 || commentText.trim() === "") {
            showToast("You cannot send an empty comment", "info");
            return;
        }
        const commentToSend = {
            content: commentText,
            authorUsername: user?.username,
            profilePictureUrl: user?.profilePictureUrl
        };
        setIsSending(true);
        try {
            const res = await fetch(addCommentUrl(postSlug), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(commentToSend)
            });
            const newComment = await res.json();
            console.log(newComment);
            setComments((prev) => [...prev, newComment])
            setCommentText("");
            refetchComments();
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
            console.log(error);

        } finally {
            setIsSending(false);
        }
    }
    return (
        <div className={style.commentBox} onClick={(e) => { e.stopPropagation() }}>
            <header className={style.header}>
                <div>Comments</div>
                <button onClick={handleClose}>
                    <X />
                </button>
            </header>
            <div className={style.commentsContainer}>
                {loading ? (
                    <div className={style.spinnerWrapper}>
                        <div className={style.spinner}></div>
                    </div>
                ) : comments.length === 0 ? (
                    <div className={style.noComment}>
                        No post yet, be the first to comment
                    </div>
                ) : (
                    comments.map((com, index) => (
                        <CommentList
                            key={index}
                            authorUsername={com.authorUsername}
                            comment={com.content}
                            profilePictureUrl={com.profilePictureUrl}
                        />
                    ))
                )}
            </div>

            <form className={style.commentForm} onSubmit={handleSubmit}>
                <textarea name="comment" id="comment" className={style.commentField} placeholder="Enter your comment" onChange={(e) => { setCommentText(e.target.value) }} value={commentText} />
                <MediumButton type="submit"  disabled={isSending}>
                    {isSending?"Sending..": <PaperPlane />}
                </MediumButton>
            </form>
        </div>
    )
}

export default CommentBox;