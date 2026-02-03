"use client"

import { FC } from "react";
import style from "./CommentBox.module.css";
import MediumButton from "@/components/landing-page/cell/medium-button/MediumButton";
import { PaperPlane, X } from "phosphor-react";
import CommentList from "../comment-list/CommentList";

const CommentBox: FC = () => {
    return (
        <div className={style.commentBox}>
            <header className={style.header}>
                <div>Comments</div>
                <button>
                    <X />
                </button>
            </header>
            <div className={style.commentsContainer}>
               <CommentList />
               <CommentList />
               <CommentList />
               <CommentList />
               <CommentList />
               <CommentList />
               <CommentList />
               <CommentList />
            </div>
            <form className={style.commentForm}>
                <input type="text" name="comment" id="comment" className={style.commentField} placeholder="Enter you comment" />
                <MediumButton type="submit">
                    <PaperPlane />
                </MediumButton>
            </form>
        </div>
    )
}

export default CommentBox;