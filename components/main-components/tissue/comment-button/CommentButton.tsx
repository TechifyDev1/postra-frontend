import style from './CommentButton.module.css';
import { FC } from 'react';
import { CommentButtonProps } from '@/types/types';
import SmallText from '../../cell/small-text/SmallText';
import { ChatCircle } from 'phosphor-react';

const CommentButton: FC<CommentButtonProps> = ({ onClick, count }) => {
    return (
        <button className={style.commentButton} onClick={onClick}>
            <ChatCircle size={20} className={style.commentIcon} fill='fill' />
            <SmallText>{count}</SmallText>
        </button>
    );
}

export default CommentButton;
