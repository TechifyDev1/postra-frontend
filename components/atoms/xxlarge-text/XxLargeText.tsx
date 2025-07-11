import style from './XxLargeText.module.css';

const XxLargeText = ({ children, align }: { children: React.ReactNode, align?: 'left' | 'center' | 'right' }) => {
    return (
        <h1 className={style.XxLargeText} style={{ textAlign: align }}>
            {children}
        </h1>
    );
}

export default XxLargeText;