'use client';

import NavLink from '@/components/atoms/navlink/NavLink';
import style from './NavLinks.module.css';
import MediumButton from '@/components/atoms/medium-button/MediumButton';


const NavLinks: React.FC = () => {
    return (
        <ul className={style.NavLinks}>
            <NavLink title="Our Story" href="/" />
            <NavLink title="Pricing" href="/" />
            <NavLink title='Write' href='/' />
            <NavLink title='Login' href='/' />
            <MediumButton child="Get Started" onClick={() => console.log('Get Started Clicked')} />
        </ul>
    )
}

export default NavLinks;