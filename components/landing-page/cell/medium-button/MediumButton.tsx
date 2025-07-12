import React from 'react';
import style from './MediumButton.module.css';


interface MediumButtonProps {
    child: React.ReactNode;
    onClick?: () => void;
}

const MediumButton: React.FC<MediumButtonProps> = ({ child, onClick }) => {
    return (
        <button className={style.MediumButton} onClick={onClick}>{child}</button>
    )
}

export default MediumButton;