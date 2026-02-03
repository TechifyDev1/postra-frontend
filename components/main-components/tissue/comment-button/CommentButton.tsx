'use client';
import style from './CommentButton.module.css';
import { FC, useState } from 'react';
import { CommentButtonProps } from '@/types/types';
import SmallText from '../../cell/small-text/SmallText';
import { ChatCircle } from 'phosphor-react';
import CommentPopUp from '../../organ/comment-popup/CommentPopUp';
import { UseShowComments } from '@/hooks/use-show-comments';

const CommentButton: FC<CommentButtonProps> = ({ count, slug }) => {
    const showCommentsHook = UseShowComments();
    const handleClick = () => {
        showCommentsHook.setShow((prev) => !prev)
        console.log("Show show comment:", showCommentsHook.show);
    }
    return (
        <>
            <button className={style.commentButton} onClick={handleClick}>
                <ChatCircle size={20} className={style.commentIcon} fill='fill' color='var(--text-color-primary)' />
                <SmallText>{count}</SmallText>
            </button>
            <CommentPopUp postSlug={slug!} />
        </>
    );
}

export default CommentButton;
