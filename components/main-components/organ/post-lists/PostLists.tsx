import { FC } from "react";
import style from './PostLists.module.css';
import PostList from "../postlist/PostList";
import blogHero from '@/public/blog-hero.png';
import { getPosts } from "@/utils";

interface postInterface {
    id: number;
    title: string;
    subTitle: string;
    postBanner: string;
}

const PostLists: FC = async () => {
    const res = await fetch(getPosts(0, 10));
    const posts = await res.json();
    const postsLists = posts.content;
    console.log(posts);
    return (
        <main className={style.PostLists}>
            {postsLists.map((post: postInterface) => (
                <PostList
                    id={post.id}
                    title={post.title}
                    subtitle={post.subTitle}
                    image={post.postBanner ?? blogHero}
                    likes={10} comments={5}
                    time="2 hours ago"
                    key={post.id}
                />))
            }
            {/* <PostList
                id="1"
                title="We Switched from Spring Boot to Quarkus: Here’s the Ugly Truth"
                subtitle="We had been running on Spring Boot for years — battle-tested, feature-rich, and reliable. But the siren call of “cloud-native Java” and…"
                image={blogHero}
                likes={10}
                comments={5}
                time="2 hours ago"
            />
            <PostList
                id="2"
                title="Exploring TypeScript: Tips and Tricks"
                subtitle="Discover useful TypeScript features and how they can improve your development workflow."
                image={blogHero}
                likes={20}
                comments={10}
                time="3 hours ago"
            />
            <PostList
                id="3"
                title="React Performance Optimization"
                subtitle="Learn strategies to make your React apps faster and more efficient."
                image={blogHero}
                likes={15}
                comments={7}
                time="4 hours ago"
            /> */}
        </main>
    )
}

export default PostLists;