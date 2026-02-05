"use client"

import { FC, useEffect } from "react";
import style from "./PostLists.module.css";
import PostList from "../postlist/PostList";
import blogHero from "@/public/blog-hero.png";
import { truncate } from "@/utils";
import Image from "next/image";
import noPostPic from "../../../../public/Book lover.gif"
import SmallText from "../../cell/small-text/SmallText";
import { usePostsContext } from "@/hooks/use-posts-context";

const PostLists: FC = () => {
  const { posts, isLoading, fetchAllPosts } = usePostsContext();

  useEffect(() => {
    fetchAllPosts();
  }, []);

  if (isLoading) {
    return <div style={{ textAlign: "center", padding: "4rem 0" }}>Loading posts...</div>;
  }

  if (posts.length === 0) {
    return (
      <div className={style.noPost}>
        <Image src={noPostPic} alt="Book lover" width={500} height={500} />
        <h2>Oh! No post yet!</h2>
        <SmallText>Come back next time</SmallText>
      </div>
    );
  }

  return (
    <main className={style.PostLists}>
      {posts.map((post) => (
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
      ))}
    </main>
  );
};

export default PostLists;
