'use client';
import { createContext, useState } from "react";

interface ModalContextProps {
    openModal: (name: keyof ModalType) => void;
    closeModal: (name: keyof ModalType) => void;
    modals: ModalType;
}

interface ModalType {
    login: boolean;
    signUp: boolean;
}


export const ModalContext = createContext<ModalContextProps>({
    openModal: () => { },
    closeModal: () => { },
    modals: { login: false, signUp: false },
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [modals, setModals] = useState<ModalType>({
        login: false,
        signUp: false,
    });
    const openModal = (name: keyof ModalType) => {
        setModals((prev) => {
            return Object.keys(prev).reduce((acc, k) => {
                acc[k as keyof ModalType] = k === name ? true : false;
                return acc;
            }, {} as ModalType)
        });
    }
    const closeModal = (name: keyof ModalType) => {
        setModals((prev) => { return ({ ...prev, [name]: false }); });
    }
    return (
        <ModalContext.Provider value={{
            openModal,
            closeModal,
            modals
        }}>
            {children}
        </ModalContext.Provider>
    );
};
