'use client';
import Logo from '@/components/landing-page/cell/logo/Logo';
import style from './NavBar.module.css';
import { FC } from 'react';
import SearchBar from '../../tissue/search-bar/SearchBar';
import NavLink from '@/components/landing-page/cell/navlink/NavLink';
import { Bell, PencilLine } from 'phosphor-react';
import ImageAvatar from '../../cell/image-avatar/ImageAvatar';
import avatar from '@/public/default.jpg'
import SmallText from '../../cell/small-text/SmallText';

const NavBar: FC = () => {
    return (
        <nav className={style.NavBar}>
            <div className={style.left}>
                <Logo />
                <SearchBar />
            </div>
            <div className={style.right}>

                <a href="/new" className={style.newPostLink}>
                    <PencilLine size={24} weight="thin" />
                    <div className={style.Write}>
                        <SmallText>Write</SmallText>
                    </div>
                </a>
                <Bell size={24} className={style.notificationIcon} weight='thin' />
                <ImageAvatar src={avatar} alt="User Avatar" size="medium" />
            </div>
        </nav>
    )
}

export default NavBar;