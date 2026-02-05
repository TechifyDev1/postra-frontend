import { ProfileCountsProvider } from "@/providers/ProfileCountsProvider";
import { ReactNode } from "react";

export default async function RootLayout({ children, params }: { children: ReactNode; params: Promise<{ username: string }> }) {
    const { username } = await params;
    return (
        <>
            <ProfileCountsProvider username={username}>
                {children}
            </ProfileCountsProvider>
        </>
    )
}