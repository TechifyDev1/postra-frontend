import style from './XxLargeText.module.css';

const XxLargeText = ({ children }: { children: React.ReactNode }) => {
    return (
        <h1 className={style.XxLargeText}>
            {children}
        </h1>
    );
}

export default XxLargeText;