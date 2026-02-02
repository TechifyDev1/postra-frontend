import { FC } from "react";
import style from "./PostLists.module.css";
import PostList from "../postlist/PostList";
import blogHero from "@/public/blog-hero.png";
import { getPosts, truncate } from "@/utils";
import Image from "next/image";
import noPostPic from "../../../../public/Book lover.gif"
import SmallText from "../../cell/small-text/SmallText";

interface postInterface {
  id: number;
  title: string;
  subTitle: string;
  postBanner: string;
  slug: string;
  authorFullName?: string;
  username: string;
  likeCount: number;
  commentCount: number;
}

const PostLists: FC = async () => {
  const res = await fetch(getPosts(0, 10), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const posts = await res.json();
  console.log(posts);
  const postsLists = posts.content;
  if(postsLists.length == 0) {
    return <div className={style.noPost}>
      <Image src={noPostPic} alt="Book lover" width={500} height={500} />
      <h2>Oh! No post yet!</h2>
      <SmallText>Come back next time</SmallText>
    </div>
  }
  return (
    <main className={style.PostLists}>
      {postsLists.map(
        (post: postInterface) => (
          (
            <PostList
              id={post.id}
              title={truncate(post.title, 60)}
              subtitle={truncate(post.subTitle, 100)}
              image={post.postBanner ?? blogHero}
              likes={post.likeCount}
              comments={post.commentCount}
              time="2 hours ago"
              key={post.id}
              slug={post.slug}
              authorFullName={post.authorFullName}
              authorUsername={post.username}
            />
          )
        )
      )}
    </main>
  );
};

export default PostLists;
