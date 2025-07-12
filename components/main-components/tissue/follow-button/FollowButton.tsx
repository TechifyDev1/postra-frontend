import { FC } from 'react';
import style from './FollowButton.module.css';
import { FollowButtonProps } from '@/types/types';
import SmallText from '../../cell/small-text/SmallText';

const FollowButton: FC<FollowButtonProps> = ({ isFollowing, onClick }) => {
    return (
        <button
            className={style.followButton}
            onClick={onClick}
        >
            {isFollowing ? <SmallText bold={true}>Unfollow</SmallText> : <SmallText bold={true}>Follow</SmallText>}
        </button>
    );
}

export default FollowButton;