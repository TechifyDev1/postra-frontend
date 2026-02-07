"use client"
import { commentsContextInterface } from "@/types/commentsTypes";
import { createContext } from "react";

export const CommentsContext = createContext<commentsContextInterface | null>(null);