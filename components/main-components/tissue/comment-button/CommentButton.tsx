'use client';
import style from './CommentButton.module.css';
import { FC, useEffect, useState } from 'react';
import { CommentButtonProps } from '@/types/types';
import SmallText from '../../cell/small-text/SmallText';
import { ChatCircle } from 'phosphor-react';
import CommentPopUp from '../../organ/comment-popup/CommentPopUp';
import { UseShowComments } from '@/hooks/use-show-comments';
import { useCommentsContext } from '@/hooks/use-comments';

const CommentButton: FC<CommentButtonProps> = ({ count, slug }) => {
    const [innerCount, setInnerCount] = useState(0);
    const showCommentsHook = UseShowComments();
    const {comments} = useCommentsContext();
    useEffect(() => {
        setInnerCount(comments?.length??count);
    }, [comments]);
    const handleClick = () => {
        showCommentsHook.setSlug(slug!);
        showCommentsHook.setShow((prev) => !prev)
        console.log("Show show comment:", showCommentsHook.show);
    }
    return (
        <>
            <button className={style.commentButton} onClick={handleClick}>
                <ChatCircle size={20} className={style.commentIcon} fill='fill' color='var(--text-color-primary)' />
                <SmallText>{innerCount}</SmallText>
            </button>
        </>
    );
}

export default CommentButton;
