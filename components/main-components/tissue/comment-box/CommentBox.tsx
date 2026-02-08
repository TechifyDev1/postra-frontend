"use client"

import { FC, FormEvent, useState } from "react";
import style from "./CommentBox.module.css";
import MediumButton from "@/components/landing-page/cell/medium-button/MediumButton";
import { PaperPlane, X } from "phosphor-react";
import CommentList from "../comment-list/CommentList";
import { useCommentsContext } from "@/hooks/use-comments";
import { UseShowComments } from "@/hooks/use-show-comments";

const CommentBox: FC<{ postSlug: string }> = ({ postSlug }) => {
    const [commentText, setCommentText] = useState<string>("");
    const [isSending, setIsSending] = useState<boolean>(false);
    const { setShow } = UseShowComments();
    const { comments, addComment } = useCommentsContext()
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.stopPropagation();
        e.preventDefault();
        if (commentText === "") return;

        setIsSending(true);
        await addComment(commentText);
        setCommentText("");
        setIsSending(false);
    }
    const handleClose = () => {
        setShow(false);
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
                {comments !== null && comments.length === 0 ? (<div className={style.noComment}>No post yet, be the first the comment</div>) : comments?.map((com, index) => (<CommentList authorUsername={com.authorUsername} comment={com.content} key={index} />))}
            </div>
            <form className={style.commentForm} onSubmit={handleSubmit}>
                <input type="text" name="comment" id="comment" className={style.commentField} placeholder="Enter you comment" onChange={(e) => { setCommentText(e.target.value) }} value={commentText} />
                <MediumButton type="submit" isLoading={isSending} disabled={isSending}>
                    <PaperPlane />
                </MediumButton>
            </form>
        </div>
    )
}

export default CommentBox;