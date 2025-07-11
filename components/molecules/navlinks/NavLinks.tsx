'use client';

import NavLink from '@/components/atoms/navlink/NavLink';
import style from './NavLinks.module.css';
import MediumButton from '@/components/atoms/medium-button/MediumButton';
import { ModalContext } from '@/contexts/ModalContext';
import SignInPopUp from '@/components/organisms/popups/signin-popup/SignInPopUp';
import SignUpPopUp from '@/components/organisms/popups/signup-popup/SignUpPopUp';
import { useContext } from 'react';


const NavLinks: React.FC = () => {
    const { openModal } = useContext(ModalContext);
    return (
            <ul className={style.NavLinks}>
                <NavLink title="Our Story" href="/" />
                <NavLink title="Pricing" href="/" />
                <NavLink title='Write' href='/' name='signUp' />
                <NavLink title='Login' href='/' name='login' />
                <MediumButton child="Get Started" onClick={() => openModal('signUp')} />
                <SignInPopUp />
                <SignUpPopUp />
            </ul>
    )
}

export default NavLinks;