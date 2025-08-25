import React, { CSSProperties, ReactNode } from 'react';
import styles from './LargeButton.module.css';
import Loader from '../loader/Loader';


interface LargeButtonProps {
    children: ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    isLoading?: boolean;
    className?: string;
    style?: CSSProperties;
}

const LargeButton: React.FC<LargeButtonProps> = ({ children, onClick, type, disabled, isLoading, className, style }) => {
    return (
        <button className={styles.LargeButton+ " " + className} onClick={onClick} type={type} disabled={disabled || isLoading} style={style}>
            {isLoading ? <Loader /> : <>{children}</>}
        </button>
    );
}

export default LargeButton;