import { createContext } from "react";
import { PostsContextInterface } from "@/types/postsTypes";

export const PostsContext = createContext<PostsContextInterface | null>(null);
