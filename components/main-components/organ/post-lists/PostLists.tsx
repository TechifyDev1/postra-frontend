export const dynamic = "force-dynamic";

import { FC } from "react";
import style from "./PostLists.module.css";
import PostList from "../postlist/PostList";
import blogHero from "@/public/blog-hero.png";
import { getPosts, truncate } from "@/utils";
import Image from "next/image";
import noPostPic from "../../../../public/Book lover.gif"
import SmallText from "../../cell/small-text/SmallText";
import { cookies } from "next/headers";
import { CommentsProvider } from "@/providers/CommentsProvider";

const PostLists: FC = async () => {

  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const res = await fetch(getPosts(0, 30), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    cache: "no-store"
  });
  const data = await res.json();
  const posts = data.content;
  console.log(posts);



  if (posts.length === 0) {
    return (
      <div className={style.noPost}>
        <Image src={noPostPic} alt="Book lover" width={400} />
        <h2>Oh! No post yet!</h2>
        <SmallText>Come back next time</SmallText>
      </div>
    );
  }

  return (
    <main className={style.PostLists}>
      {posts.map((post: { id: any; title: string; subTitle: string; postBanner: any; likeCount: number; commentCount: number; createdAt: string; slug: string; authorFullName: string; username: string; profilePic?: string; }) => (
        <PostList
          key={post.id}
          id={post.id}
          title={truncate(post.title, 60)}
          subtitle={truncate(post.subTitle || "", 100)}
          image={post.postBanner ?? blogHero}
          likes={post.likeCount}
          comments={post.commentCount}
          time={post.createdAt}
          slug={post.slug}
          authorFullName={post.authorFullName}
          authorUsername={post.username}
          profilePic={post.profilePic}
        />
      ))}
    </main>
  );
};

export default PostLists;
