import { LargeTextProps } from '@/types/types';
import style from './LargeText.module.css';

import { ReactNode } from 'react';

const LargeText: React.FC<LargeTextProps> = ({ children, align = 'alignLeft' }) => {
    return (
        <p className={`${style.LargeText} ${style[align]}`}>
            {children}
        </p>
    );
}

export default LargeText;