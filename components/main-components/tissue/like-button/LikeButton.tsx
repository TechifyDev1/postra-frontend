import style from './LIkeButton.module.css';
import { FC } from 'react';
import { LikeButtonProps } from '@/types/types';
import SmallText from '../../cell/small-text/SmallText';
import { ThumbsUp } from 'phosphor-react';

const LikeButton: FC<LikeButtonProps> = ({ isLiked, onClick, count }) => {
    return (
        <button className={style.likeButton} onClick={onClick}>
            <ThumbsUp
                size={20}
                weight={isLiked ? 'fill' : 'regular'}
                className={style.likeIcon}
            />
            <SmallText>{count}</SmallText>
        </button>
    );
}

export default LikeButton;
