'use client';

import Logo from '@/components/atoms/logo/Logo';
import style from './NavBar.module.css'
import NavLinks from '@/components/molecules/navlinks/NavLinks';
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