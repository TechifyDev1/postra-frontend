import SmallText from "@/components/atoms/small-text/SmallText";
import style from './Footer.module.css'

const Footer: React.FC = () => {
    return (
        <footer className={style.Footer}>
            <SmallText>© {new Date().getFullYear().toString()} Postra. All rights reserved.</SmallText>
        </footer>
    )
}

export default Footer;