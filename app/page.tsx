import Footer from "@/components/landing-page/organ/footer/Footer";
import HeroSection from "@/components/landing-page/organ/hero-section/HeroSection";
import NavBarWrapper from "@/components/main-components/organ/NavBarWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Postra - Share Your Stories",
  description: "Postra is a community for readers and writers. Share your stories, connect with others, and find your audience.",
  alternates: {
    canonical: "/",
  },
};

const page = () => {
  return (
    <>
      <NavBarWrapper />
      <HeroSection />
      <Footer />
    </>
  )
}

export default page;
