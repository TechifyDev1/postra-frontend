import Footer from "@/components/landing-page/organ/footer/Footer";
import HeroSection from "@/components/landing-page/organ/hero-section/HeroSection";
import NavBar from "@/components/landing-page/organ/navbar/NavBar";
import UUserHomePage from "./u-user-homepage/UUserHomePage";
import { getUserUrl } from "@/utils";

export default async function HomePageWrapper() {
    try {
        const response = await fetch(getUserUrl("me"), {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            next: { revalidate: 0 }
        });

        if (!response.ok) {
            return (
            <>
                <NavBar />
                <HeroSection />
                <Footer />
            </>
        );
        };

        return <UUserHomePage />;
    } catch (error) {
        // Fallback to landing page UI if fetch fails
        return (
            <>
                <NavBar />
                <HeroSection />
                <Footer />
            </>
        );
    }
}
