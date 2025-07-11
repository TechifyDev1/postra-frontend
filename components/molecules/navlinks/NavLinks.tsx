'use client';

import NavLink from '@/components/atoms/navlink/NavLink';
import style from './NavLinks.module.css';
import MediumButton from '@/components/atoms/medium-button/MediumButton';
import { ModalProvider } from '@/contexts/ModalContext';
import SignInPopUp from '@/components/organisms/popups/signin-popup/SignInPopUp';


const NavLinks: React.FC = () => {
    return (
        <ModalProvider>
            <ul className={style.NavLinks}>
                <NavLink title="Our Story" href="/" />
                <NavLink title="Pricing" href="/" />
                <NavLink title='Write' href='/' name='signUp' />
                <NavLink title='Login' href='/' name='login' />
                <MediumButton child="Get Started" onClick={() => console.log('Get Started Clicked')} />
                <SignInPopUp />
            </ul>
        </ModalProvider>
    )
}

export default NavLinks;