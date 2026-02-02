"use client";

import { FC } from "react";
import style from "./AuthorInfo.module.css";
import MediumButton from "@/components/landing-page/cell/medium-button/MediumButton";
import { useUserContext } from "@/hooks/use-user-context";

const AuthorInfo: FC<{ post: any }> = ({ post }) => {
    const { user } = useUserContext();
    return (
        <section className={style.authorInfo}>
            <img
                src={post.authorProfilePic ? post.authorProfilePic : "/default.jpg"}
                alt={`${post.authorFullName}'s Profile Pic`}
            />
            <p>{post.authorFullName}</p>
            {!(user?.username === post.authorUsername) && <MediumButton>
                <p style={{ margin: "0", padding: "0" }}>Follow</p>
            </MediumButton>}
        </section>
    )
}

export default AuthorInfo;