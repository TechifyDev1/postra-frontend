import { ProfileCountsContext } from "@/contexts/ProfileCountsContext";
import { useContext } from "react"

export const UseProfileCounts = () => {
    const context = useContext(ProfileCountsContext);
    if(!context) {
        throw new Error("Provider must be initialized before use")
    }
    return context;
}