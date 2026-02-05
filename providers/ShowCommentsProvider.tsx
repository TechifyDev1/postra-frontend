"use client"
import { ShowCommentsContext } from "@/contexts/ShowCommentsContext";
import { ReactNode, useState } from "react";

export const ShowCommentsProvider = ({ children }: { children: ReactNode }) => {
    const [show, setShow] = useState<boolean>(false);
    return <ShowCommentsContext.Provider value={{ show, setShow }}>
        {children}
    </ShowCommentsContext.Provider>
}