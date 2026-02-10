"use client"

import { UserContext } from "@/contexts/UserContext";
import { userInterface } from "@/types/userType";
import { getUserUrl, getAuthHeaders } from "@/utils";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<userInterface | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const fetchMe = async () => {
        try {
            const res = await fetch(getUserUrl("me"), {
                method: "GET",
                headers: getAuthHeaders()
            });
            const data = await res.json();
            setUser(data.data)
            router.refresh();
        } catch (error) {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchMe();
    }, []);

    const refetchUser = async () => {
        await fetchMe();
    };

    return (
        <UserContext.Provider value={{ user, setUser, isLoading, refetchUser }}>
            {children}
        </UserContext.Provider>
    )
}