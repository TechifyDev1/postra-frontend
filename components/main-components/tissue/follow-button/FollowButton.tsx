"use client"
import { FC, useContext, useEffect, useState } from 'react';
import style from './FollowButton.module.css';
import { FollowButtonProps } from '@/types/types';
import SmallText from '../../cell/small-text/SmallText';
import { useUserContext } from '@/hooks/use-user-context';
import { checkFollowUrl, followUrl } from '@/utils';
import { ModalContext } from '@/contexts/ModalContext';
import { useToast } from '@/contexts/ToastContext';
import { UseProfileCounts } from '@/hooks/useProfileCounts';

const FollowButton: FC<FollowButtonProps> = ({ username }) => {
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { user } = useUserContext();
    const { openModal } = useContext(ModalContext);
    const { showToast } = useToast();
    const {refetchProfile} = UseProfileCounts();
    const getIsFollowing = async () => {
        try {
            const res = await fetch(checkFollowUrl(username), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json();
            console.log(data);
            setIsFollowing(data.data);
            refetchProfile();
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                setIsFollowing(false);
            }
            console.log(error)
        }
    }
    const followOrUnfollow = async () => {
        if (loading) return;
        if (!user) {
            showToast("Please login to follow", "error")
            openModal("login");
            return;
        }
        setLoading(true)
        try {
            const res = await fetch(followUrl(username), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json();
            const message = data.message;
            showToast(message, "success");
            await getIsFollowing();
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                showToast(error.message);
            }
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getIsFollowing();
    }, [username]);
    return (
        <button
            className={style.followButton}
            onClick={followOrUnfollow}
        >
            <SmallText bold={true}>{isFollowing ? "Unfollow" : "Follow"}</SmallText>
        </button>
    );
}

export default FollowButton;