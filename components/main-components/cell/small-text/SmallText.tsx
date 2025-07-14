import style from './SmallText.module.css';
import { SmallTextProps } from '@/types/types';


const SmallText: React.FC<SmallTextProps> = ({ children, align = 'alignLeft', bold = false, italic = false, underline = false }) => {
    return (
        <p className={`${style.SmallText} ${style[align]} ${bold ? style.bold : ''} ${italic ? style.italic : ''} ${underline ? style.underline : ''}`}>
            {children}
        </p>
    );
}

export default SmallText;