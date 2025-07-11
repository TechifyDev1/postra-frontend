import style from './LargeText.module.css';

const LargeText = ({ children, align }: { children: React.ReactNode, align?: 'left' | 'center' | 'right' }) => {
    return (
        <h2 className={style.LargeText} style={{ textAlign: align }}>
            {children}
        </h2>
    );
}

export default LargeText;
