import style from './SmallText.module.css';
import { ReactNode } from 'react';

const SmallText = ({ children, align }: { children: ReactNode, align?: 'center' | 'left' | 'right' }) => {
    return (
        <p className={style.SmallText} style={{ textAlign: align }}>
            {children}
        </p>
    );
}

export default SmallText;