import React from 'react'
import styles from './page.module.css'
import NavBar from '@/components/organisms/navbar/NavBar';
import HeroSection from '@/components/organisms/hero-section/HeroSection';
import Footer from '@/components/organisms/footer/Footer';

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
