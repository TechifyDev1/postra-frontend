'use client';
import { FC } from "react";
import style from './PostLists.module.css';
import PostList from "../postlist/PostList";
import blogHero from '@/public/blog-hero.png';

const PostLists: FC = () => {
    return (
        <main className={style.PostLists}>
            <PostList
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
            />
        </main>
    )
}

export default PostLists;