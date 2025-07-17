'use client';
import { FC } from 'react';
import style from './ToastContainer.module.css';
import { useToast } from '@/contexts/ToastContext';
import { X } from 'phosphor-react';

const ToastContainer: FC = () => {
    const { toasts, removeToast } = useToast();
    return (
        <div className={style.ToastContainer}>
            {toasts.map((toast) => (
                <div key={toast.id} className={`${style.toast} ${style[toast.type || 'info']}`}>
                    <span>{toast.message}</span>
                    <button onClick={() => removeToast(toast.id)}>{<X />}</button>
                </div>
            ))}
        </div>
    )
}

export default ToastContainer;