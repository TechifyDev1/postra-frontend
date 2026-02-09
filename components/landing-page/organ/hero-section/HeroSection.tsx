"use client"
import XxLargeText from '@/components/landing-page/cell/xxlarge-text/XxLargeText'
import style from './HeroSection.module.css'
import LargeText from '@/components/landing-page/cell/large-text/LargeText';
import Image from "next/image";
import blogHero from '@/public/blog-hero.png'
import LargeButton from '@/components/landing-page/cell/large-button/LargeButton';
import { useRouter } from "next/navigation";
import Link from 'next/link';

const HeroSection: React.FC = () => {
    const router = useRouter();
    return (
        <section className={style.HeroSection}>
            <div className={style.rightContainer}>
                <XxLargeText>Write. Share. Inspire.</XxLargeText>
                <LargeText>Welcome to <b>Postra</b>—where thoughts become stories. Dive into tutorials, reflections, and more.</LargeText>
                <Link href={"/home"}>
                    <LargeButton>
                        <LargeText>Start Reading</LargeText>
                    </LargeButton>
                </Link>
            </div>
            <div className={style.leftContainer}>
                <Image
                    src={blogHero}
                    alt="Blog Hero Image"
                    layout="responsive"
                    width={600}
                    height={100}
                    className={style.heroImage}
                />
            </div>
        </section>
    )
}

export default HeroSection;