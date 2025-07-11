import { useContext } from 'react';
import style from './NavLink.module.css';
import { ModalContext } from '@/contexts/ModalContext';

interface NavLinkProps {
    title: string;
    href: string;
    name?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ title, href, name }) => {
    const { modals, openModal } = useContext(ModalContext);
    const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (name) {
            e.preventDefault();
            openModal(name as keyof typeof modals);
        }
    }
    return (
        <li>
            <a className={style.navLink} href={href} onClick={handleNavigation} >{title}</a>
        </li>
    )
}

export default NavLink;