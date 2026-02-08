import NNavBar from "@/components/landing-page/organ/navbar/NavBar";
import NavBar from "./navbar/NavBar";
import { cookies } from "next/headers";
import { getUserUrl } from "@/utils";

const NavBarWrapper = async () => {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;
    try {
        const response = await fetch(getUserUrl("me"), {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            cache: "no-store"
        });
        if (!response.ok) {
            return <NNavBar />
        }
        return <NavBar />
    } catch (error) {
        console.error(error instanceof Error ? error.message : error);
        return <NNavBar />
    }
}

export default NavBarWrapper;