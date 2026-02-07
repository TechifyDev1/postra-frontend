"use client"
import { showCommentContextInterface } from "@/types/show-comments-types";
import { createContext } from "react";

export const ShowCommentsContext = createContext<showCommentContextInterface | null>(null);