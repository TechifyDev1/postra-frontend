'use client';
import { FC, useState } from "react";
import LargeButton from "@/components/landing-page/cell/large-button/LargeButton";
import { useRouter } from "next/navigation";
import { useToast } from "@/contexts/ToastContext";
import { logoutUrl } from "@/utils";
import { useUserContext } from "@/hooks/use-user-context";

const LogoutButton: FC = () => {
    const router = useRouter();
    const { showToast } = useToast();
    const { setUser } = useUserContext();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const res = await fetch(logoutUrl(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (!res.ok) {
                throw new Error("Unable to sign you out")
            }

            // Clear user state
            setUser(null);

            // Clear token cookie and localStorage
            document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
            localStorage.removeItem('token');

            // Show success message
            showToast("Logged out successfully", "success");

            // Navigate to home and refresh
            router.push("/");
            router.refresh();
        } catch (error) {
            if (error instanceof Error) {
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
        <LargeButton style={{ marginTop: "1rem", backgroundColor: "#dc3545", borderColor: "#dc3545" }} onClick={handleLogout} isLoading={loading}>
            Logout
        </LargeButton>
    );
};

export default LogoutButton;
