import Logo from '@/components/atoms/logo/Logo';
import style from './NavBar.module.css'
import NavLinks from '@/components/molecules/navlinks/NavLinks';

const NavBar: React.FC = () => {
    return(
        <nav className={style.NavBar}>
            <Logo />
            <NavLinks />
        </nav>
    );
}

export default NavBar;