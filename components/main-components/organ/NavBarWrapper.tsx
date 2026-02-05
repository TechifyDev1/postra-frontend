"use client";

import NNavBar from "@/components/landing-page/organ/navbar/NavBar";
import { useUserContext } from "@/hooks/use-user-context";
import NavBar from "./navbar/NavBar";

const NavBarWrapper = () => {
    const { user } = useUserContext();
    if (!user) {
        return <NNavBar />
    }
    return <NavBar />
}

export default NavBarWrapper;