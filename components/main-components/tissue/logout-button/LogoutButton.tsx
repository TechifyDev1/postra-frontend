'use client';
import { FC, useState } from "react";
import LargeButton from "@/components/landing-page/cell/large-button/LargeButton";
import { useRouter } from "next/navigation";
import { useToast } from "@/contexts/ToastContext";
import { logoutUrl } from "@/utils";

const LogoutButton: FC = () => {
    const router = useRouter();
    const {showToast} = useToast();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        if(loading) return;
        setLoading(true);
        try {
            const res = await fetch(logoutUrl(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });
            if(!res.ok) {
                throw new Error("Unable to sign you out")
            }
            router.refresh();
            router.push("/")
        } catch (error) {
            if(error instanceof Error) {
                showToast(error.message, "error")
                console.error(error.message);
                return;
            }
            showToast("Unable to log you out");
        } finally {
            setLoading(false);
        }
    };

    return (
        <LargeButton style={{ marginTop: "1rem", backgroundColor: "#dc3545", borderColor: "#dc3545" }} onClick={handleLogout} isLoading= {loading}>
            Logout
        </LargeButton>
    );
};

export default LogoutButton;
