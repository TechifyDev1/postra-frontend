'use client';
import Logo from '@/components/landing-page/cell/logo/Logo';
import style from './NavBar.module.css';
import { FC } from 'react';
import SearchBar from '../../tissue/search-bar/SearchBar';
import NavLink from '@/components/landing-page/cell/navlink/NavLink';
import { Bell } from 'phosphor-react';
import ImageAvatar from '../../cell/image-avatar/ImageAvatar';
import avatar from '@/public/default.jpg'

const NavBar: FC = () => {
    return (
        <nav className={style.NavBar}>
            <div className={style.left}>
                <Logo />
                <SearchBar />
            </div>
            <div className={style.right}>
                <NavLink href="/new" title="Write" />
                <Bell size={24} className={style.notificationIcon} />
                <ImageAvatar src={avatar} alt="User Avatar" size="medium" />
            </div>
        </nav>
    )
}

export default NavBar;