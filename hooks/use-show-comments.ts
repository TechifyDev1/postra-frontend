import { ShowCommentsContext } from "@/contexts/ShowCommentsContext"
import { useContext } from "react"

export const UseShowComments = () => {
    const context = useContext(ShowCommentsContext);
    if(!context) {
        throw new Error("useShowCommentsContext must be initisalized")
    }
    return context;
}