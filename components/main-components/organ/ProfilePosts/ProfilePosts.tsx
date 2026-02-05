"use client"

import { FC, useEffect } from "react"
import { usePostsContext } from "@/hooks/use-posts-context"
import PostList from "@/components/main-components/organ/postlist/PostList"
import { truncate } from "@/utils"
import blogHero from "@/public/blog-hero.png"
import LargeText from "@/components/landing-page/cell/large-text/LargeText"
import LargeButton from "@/components/landing-page/cell/large-button/LargeButton"
import Link from "next/link"
import style from "@/app/[username]/page.module.css"

interface ProfilePostsProps {
    username: string;
    isCurrentUser: boolean;
}

const ProfilePosts: FC<ProfilePostsProps> = ({ username, isCurrentUser }) => {
    const { posts, isLoading, refetch } = usePostsContext();

    useEffect(() => {
        refetch(username);
    }, [username]);

    if (isLoading) {
        return <div style={{ textAlign: "center", padding: "4rem 0" }}>Loading posts...</div>;
    }

    return (
        <div className={style.postsContainer}>
            {posts.length > 0 ? (
                posts.map((post: any) => (
                    <PostList
                        key={post.id}
                        id={post.id}
                        title={truncate(post.title, 60)}
                        subtitle={truncate(post.subtitle || "", 100)}
                        image={post.image ?? blogHero}
                        likes={post.likes}
                        comments={post.comments}
                        time={post.time}
                        slug={post.slug}
                        authorFullName={post.authorFullName}
                        authorUsername={post.authorUsername}
                    />
                ))
            ) : (
                <div style={{ textAlign: "center", padding: "4rem 0" }}>
                    <LargeText align="center">
                        {isCurrentUser
                            ? "You currently have no posts"
                            : "This user currently doesn't have posts"}
                    </LargeText>
                    {isCurrentUser && (
                        <Link href="/new" style={{ marginTop: "1rem", display: "inline-block" }}>
                            <LargeButton>Create Post</LargeButton>
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}

export default ProfilePosts;
