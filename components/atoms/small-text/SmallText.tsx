import style from '@/components/atoms/small-text/SmallText.module.css';

const SmallText = ({ children }: { children: React.ReactNode }) => {
    return (
        <p className={style.SmallText}>
            {children}
        </p>
    );
}

export default SmallText;