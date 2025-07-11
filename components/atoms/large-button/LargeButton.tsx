import React from 'react';
import style from './LargeButton.module.css';
import Loader from '../loader/Loader';


interface LargeButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    isLoading?: boolean;
}

const LargeButton: React.FC<LargeButtonProps> = ({ children, onClick, type, disabled, isLoading }) => {
    return (
        <button className={style.LargeButton} onClick={onClick} type={type} disabled={disabled || isLoading}>
            {isLoading ? <Loader /> : <>{children}</>}
        </button>
    )
}

export default LargeButton;