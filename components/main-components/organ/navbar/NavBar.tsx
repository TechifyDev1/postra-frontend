'use client';
import Logo from '@/components/landing-page/cell/logo/Logo';
import style from './NavBar.module.css';
import { FC } from 'react';
import { Bell, PencilLine } from 'phosphor-react';
import ImageAvatar from '../../cell/image-avatar/ImageAvatar';
import avatar from '../../../../public/default.jpg';
import SmallText from '../../cell/small-text/SmallText';
import Link from 'next/link';
import { useUserContext } from '@/hooks/use-user-context';

const NavBar: FC = () => {
    const {user} = useUserContext()
    return (
        <nav className={style.NavBar}>
            <div className={style.left}>
                <Logo />
            </div>
            <div className={style.right}>
                <Link href="/new" className={style.newPostLink}>
                    <PencilLine size={24} weight="thin" />
                    <div className={style.Write}>
                        <SmallText>Write</SmallText>
                    </div>
                </Link>
                <Bell size={24} className={style.notificationIcon} weight='thin' />
                <ImageAvatar src={avatar} alt="User Avatar" size="medium" username={user?.username!} />
            </div>
        </nav>
    )
}

export default NavBar;