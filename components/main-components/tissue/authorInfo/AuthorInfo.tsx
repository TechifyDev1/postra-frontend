"use client";

import { FC } from "react";
import style from "./AuthorInfo.module.css";
import MediumButton from "@/components/landing-page/cell/medium-button/MediumButton";
import { useUserContext } from "@/hooks/use-user-context";
import FollowButton from "../follow-button/FollowButton";
import Link from "next/link";

const AuthorInfo: FC<{ post: any }> = ({ post }) => {
    const { user } = useUserContext();
    return (
        <section className={style.authorInfo}>
            <img
                src={post.authorProfilePic ? post.authorProfilePic : "/default.jpg"}
                alt={`${post.authorFullName}'s Profile Pic`}
            />
            <Link href={`/${post.authorUsername}`}>{post.authorFullName}</Link>
            {!(user?.username === post.authorUsername) && <FollowButton username={post.authorUsername}/>}
        </section>
    )
}

export default AuthorInfo;