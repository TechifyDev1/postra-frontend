import React from 'react'
import styles from './page.module.css'
import NavBar from '@/components/landing-page/organ/navbar/NavBar';
import HeroSection from '@/components/landing-page/organ/hero-section/HeroSection';
import Footer from '@/components/landing-page/organ/footer/Footer';

const page = () => {
  return (
    <>
      <NavBar />
      <HeroSection />
      <Footer />
    </>
  )
}

export default page;
