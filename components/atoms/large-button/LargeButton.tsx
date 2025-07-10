import React from 'react';
import style from './LargeButton.module.css';


interface LargeButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
}

const LargeButton: React.FC<LargeButtonProps> = ({children, onClick}) => {
    return (
        <button className={style.LargeButton} onClick={onClick}>
            {children}
        </button>
    )
}

export default LargeButton;