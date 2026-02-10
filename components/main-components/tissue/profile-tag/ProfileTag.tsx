"use client";
import { FC } from "react";
import ImageAvatar from "../../cell/image-avatar/ImageAvatar";
import avatar from "@/public/default.jpg";
import style from './ProfileTag.module.css';
import SmallText from "@/components/landing-page/cell/small-text/SmallText";
import Link from "next/link";
import { UseShowComments } from "@/hooks/use-show-comments";

const ProfileTag: FC<{ name: string, username: string, profilePictureUrl?: string }> = ({ name, username, profilePictureUrl }) => {
    const {setShow} = UseShowComments();
    return (
        <div className={style.ProfileTag} onClick={() => setShow(false)}>
            <ImageAvatar src={profilePictureUrl || avatar} alt={name} size="small" username={username} />
            <Link href={`/${username}`}>
                <SmallText>{name}</SmallText>
            </Link>
        </div>
    )
}

export default ProfileTag;