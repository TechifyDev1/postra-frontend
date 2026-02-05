"use client"

import { ReactNode, useState } from "react";
import { PostsContext } from "@/contexts/PostsContext";
import { PostListProps } from "@/types/types";
import { deletePostUrl, getPosts, getUserPostsUrl } from "@/utils";

export const PostsProvider = ({ children }: { children: ReactNode }) => {
    const [posts, setPosts] = useState<PostListProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);

    const refetch = async (username: string) => {
        setIsLoading(true);
        try {
            const res = await fetch(getUserPostsUrl(username, 0, 30), {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            });
            const data = await res.json();
            const fetchedPosts = data.content || [];

            const mappedPosts = fetchedPosts.map((post: any) => ({
                id: post.id,
                title: post.title,
                subtitle: post.subTitle,
                image: post.postBanner,
                likes: post.likeCount,
                comments: post.commentCount,
                time: post.createdAt,
                slug: post.slug,
                authorFullName: post.authorFullName,
                authorUsername: post.authorUsername
            }));
            setPosts(mappedPosts);
        } catch (error) {
            console.error("Error fetching user posts", error);
        } finally {
            setIsLoading(false);
        }
    }

    const fetchAllPosts = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(getPosts(0, 30), {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            });
            const data = await res.json();
            const fetchedPosts = data.content || [];

            const mappedPosts = fetchedPosts.map((post: any) => ({
                id: post.id,
                title: post.title,
                subtitle: post.subTitle,
                image: post.postBanner,
                likes: post.likeCount,
                comments: post.commentCount,
                time: post.createdAt,
                slug: post.slug,
                authorFullName: post.authorFullName,
                authorUsername: post.username
            }));
            setPosts(mappedPosts);
        } catch (error) {
            console.error("Error fetching all posts", error);
        } finally {
            setIsLoading(false);
        }
    }

    const deletePost = async (slug: string) => {
        setIsDeleting(true);
        try {
            const res = await fetch(deletePostUrl(slug), {
                method: "DELETE",
                credentials: "include"
            });
            if (res.ok) {
                setPosts(prev => prev.filter(p => p.slug !== slug));
                return true;
            }
        } catch (error) {
            console.error("Error deleting post", error);
        } finally {
            setIsDeleting(false);
        }
        return false;
    }

    return (
        <PostsContext.Provider value={{ posts, isLoading, isDeleting, refetch, fetchAllPosts, deletePost }}>
            {children}
        </PostsContext.Provider>
    )
}
