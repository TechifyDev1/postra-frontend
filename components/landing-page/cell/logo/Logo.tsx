import style from './Logo.module.css';

const Logo: React.FC = () => {
    return (
        <div className={style.logo}>
            <h1 className={style.h1}>Postra</h1>
        </div>
    );
}

export default Logo;