import style from './NavLink.module.css';

interface NavLinkProps {
    title: string;
    href: string;
}

const NavLink: React.FC<NavLinkProps> = ({ title, href }) => {
    return (
        <li>
            <a className={style.navLink} href={href}>{title}</a>
        </li>
    )
}

export default NavLink;