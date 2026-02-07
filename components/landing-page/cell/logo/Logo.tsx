import Link from 'next/link';
import style from './Logo.module.css';

const Logo: React.FC = () => {
    return (
        <Link className={style.logo} href="/">
            <h1 className={style.h1}>Postra</h1>
        </Link>
    );
}

export default Logo;