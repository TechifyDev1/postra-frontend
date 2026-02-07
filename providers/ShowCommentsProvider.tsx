"use client"
import { ShowCommentsContext } from "@/contexts/ShowCommentsContext";
import { ReactNode, useState } from "react";

export const ShowCommentsProvider = ({ children }: { children: ReactNode }) => {
    const [show, setShow] = useState<boolean>(false);
    const [slug, setSlug] = useState<string | null>(null);
    return <ShowCommentsContext.Provider value={{ show, setShow, slug, setSlug }}>
        {children}
    </ShowCommentsContext.Provider>
}