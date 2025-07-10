import XxLargeText from '@/components/atoms/xxlarge-text/XxLargeText'
import style from './HeroSection.module.css'
import SmallText from '@/components/atoms/small-text/SmallText';
import LargeText from '@/components/atoms/large-text/LargeText';
import Image from 'next/image';
import blogHero from '@/public/blog-hero.png'
import LargeButton from '@/components/atoms/large-button/LargeButton';

const HeroSection: React.FC = () => {
    return (
        <section className={style.HeroSection}>
            <div className={style.rightContainer}>
                <XxLargeText>Write. Share. Inspire.</XxLargeText>
                <LargeText>Welcome to <b>Postra</b>—where thoughts become stories. Dive into tutorials, reflections, and more.</LargeText>
                <LargeButton>
                    <LargeText>Start Reading</LargeText>
                </LargeButton>
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