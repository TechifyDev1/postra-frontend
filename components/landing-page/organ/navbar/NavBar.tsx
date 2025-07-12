'use client';

import Logo from '@/components/landing-page/cell/logo/Logo';
import style from './NavBar.module.css'
import NavLinks from '@/components/landing-page/tissue/navlinks/NavLinks';
import { ModalProvider } from '@/contexts/ModalContext';

const NavBar: React.FC = () => {
    return (
        <ModalProvider>
            <nav className={style.NavBar}>
                <Logo />
                <NavLinks />
            </nav>
        </ModalProvider>
    );
}

export default NavBar;