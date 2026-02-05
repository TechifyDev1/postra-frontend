import { PostListProps } from "./types";

export interface PostsContextInterface {
    posts: PostListProps[];
    isLoading: boolean;
    isDeleting: boolean;
    refetch: (username: string) => Promise<void>;
    fetchAllPosts: () => Promise<void>;
    deletePost: (slug: string) => Promise<boolean>;
}
