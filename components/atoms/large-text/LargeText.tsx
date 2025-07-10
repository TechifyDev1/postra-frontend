import style from './LargeText.module.css';

const LargeText = ({ children }: { children: React.ReactNode }) => {
    return (
        <h2 className={style.LargeText}>
            {children}
        </h2>
    );
}

export default LargeText;
