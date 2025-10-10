import { FC } from "react";
import style from './PostLists.module.css';
import PostList from "../postlist/PostList";
import blogHero from '@/public/blog-hero.png';
import { getPosts, truncate } from "@/utils";

interface postInterface {
    id: number;
    title: string;
    subTitle: string;
    postBanner: string;
}

const PostLists: FC = async () => {
    const res = await fetch(getPosts(0, 10));
    const posts = await res.json();
    console.log(posts);
    const postsLists = posts.content;
    console.log(posts);
    return (
        <main className={style.PostLists}>
            {postsLists.map((post: postInterface) => (
                <PostList
                    id={post.id}
                    title={truncate(post.title, 60)}
                    subtitle={truncate(post.subTitle, 100)}
                    image={post.postBanner ?? blogHero}
                    likes={10} comments={5}
                    time="2 hours ago"
                    key={post.id}
                />))
            }
        </main>
    )
}

export default PostLists;