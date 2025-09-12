"use client";
import { PostListProps } from "@/types/types";
import { FC } from "react";
import style from './PostList.module.css';
import ProfileTag from "../../tissue/profile-tag/ProfileTag";
import LargeText from "../../cell/large-text/LargeText";
import SmallText from "../../cell/small-text/SmallText";
import LikeButton from "../../tissue/like-button/LikeButton";
import Image from "next/image";
import CommentButton from "../../tissue/comment-button/CommentButton";
import LandingLargeText from '@/components/landing-page/cell/large-text/LargeText';

const PostList: FC<PostListProps> = ({ id, title, subtitle, image, likes, comments, time, author }) => {
    return (
        <section className={style.PostList}>
                    <ProfileTag name="Yusuf Abdulqudus" />
            <div className={style.top}>
                <div className={style.left}>
                    <LargeText align="alignLeft" bold={true}>
                        {title}
                    </LargeText>
                    {subtitle && <LandingLargeText align="left">{subtitle}</LandingLargeText>}
                </div>
                <div className={style.right}>
                    {image && <Image src={image} alt={title} layout="responsive" className={style.image} width={800} height={400} />}
                </div>
            </div>
            <div className={style.bottom}>
                <div className={style.postDetails}>
                    <SmallText align="alignLeft" italic={true}>
                        {time}
                    </SmallText>
                    <LikeButton count={likes} isLiked={false} onClick={() => { }} />
                    <CommentButton count={comments} onClick={() => { }} />
                </div>
            </div>
        </section>
    )
}

export default PostList;