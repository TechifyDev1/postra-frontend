import Footer from "@/components/landing-page/organ/footer/Footer";
import NavBarWrapper from "@/components/main-components/organ/NavBarWrapper";
import PostLists from "@/components/main-components/organ/post-lists/PostLists";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home",
    description: "Your personalized feed on Postra.",
};

export default function page() {
    return (
        <>
            <NavBarWrapper />
            <PostLists />
            <Footer />
        </>
    );
}