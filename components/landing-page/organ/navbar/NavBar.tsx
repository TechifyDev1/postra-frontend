'use client';

import Logo from '@/components/landing-page/cell/logo/Logo';
import style from './NavBar.module.css'
import NavLinks from '@/components/landing-page/tissue/navlinks/NavLinks';

const NavBar: React.FC = () => {
    return (
            <nav className={style.NavBar}>
                <Logo />
                <NavLinks />
            </nav>
    );
}

export default NavBar;