import { PostsContext } from "@/contexts/PostsContext";
import { useContext } from "react";

export const usePostsContext = () => {
    const context = useContext(PostsContext);
    if (!context) {
        throw new Error("usePostsContext must be used inside PostsProvider");
    }
    return context;
}
