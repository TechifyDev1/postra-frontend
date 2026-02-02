"use client"

import { FC } from "react";
import style from "./CommentBox.module.css";
import MediumButton from "@/components/landing-page/cell/medium-button/MediumButton";
import { PaperPlane } from "phosphor-react";

const CommentBox: FC = () => {
    return (
        <div className={style.commentBox}>
            <div className={style.commentsContainer}>
                <p>No comments yet, be first to comment</p>
                <form className={style.commentForm}>
                    <input type="text" name="comment" id="comment" className={style.commentField} />
                    <MediumButton type="submit">
                        <PaperPlane />
                    </MediumButton>
                </form>
            </div>
        </div>
    )
}

export default CommentBox;