'use client';
import React, { useEffect, useState } from 'react';
import style from './Modal.module.css';

interface ModalProps { children: React.ReactNode, show: boolean, onClose: () => void }

const Modal: React.FC<ModalProps> = ({ children, show, onClose }) => {
    const [shouldRender, setShouldRender] = useState<boolean>(show);

    useEffect(() => {
        if (show) {
            setShouldRender(true);
        }
    }, [show]);

    const handleAnimationEnd = () => {
        if(!show) {
            setShouldRender(false);
        }
    }

    return ( shouldRender &&
        <div className={`${style.Modal} ${show ? style.fadeIn : style.fadeOut}`} onAnimationEnd={handleAnimationEnd} style={{ display: shouldRender ? 'flex' : 'none' }} onClick={onClose}>
            {children}
        </div>
    )
}

export default Modal;