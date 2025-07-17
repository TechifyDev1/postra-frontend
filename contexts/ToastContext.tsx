'use client';
import { createContext, ReactNode, useContext, useState } from "react";
import { v4 as uuid } from "uuid";

type Toast = {
    id: string;
    message: string;
    type: "error" | "success" | "info"
}

type ToastContextProps = {
    toasts: Toast[];
    showToast: (message: string, type?: Toast["type"]) => void;
    removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const showToast = (message: Toast['message'], type: Toast["type"] = "info") => {
        const newToast: Toast = {
            id: uuid(),
            message,
            type
        }

        setToasts((prev) => [...prev, newToast]);

        setTimeout(() => removeToast(newToast.id), 3000);

    }
    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }

    return (
        <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
            {children}
        </ToastContext.Provider>
    )
}

export const useToast = () => {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error('Toasts can only be used inside it\'s provider');
    return ctx;
}