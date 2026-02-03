import { CommentsContext } from "@/contexts/CommentsContext";
import { useContext } from "react";

export const useCommentsContext = () => {
    const context = useContext(CommentsContext);
    if(!context) {
        throw new Error("useCommentsContext must be initialized inside comment provider")
    }
    return context;
}