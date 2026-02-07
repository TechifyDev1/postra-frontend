'use client';
import { createContext, useState } from "react";

interface ModalContextProps {
    openModal: (name: keyof ModalType) => void;
    closeModal: (name: keyof ModalType) => void;
    modals: ModalType;
    deleteSlug: string | null;
    setDeleteSlug: (slug: string | null) => void;
}

interface ModalType {
    login: boolean;
    signUp: boolean;
    confirmDelete: boolean;
    editProfile: boolean;
}


export const ModalContext = createContext<ModalContextProps>({
    openModal: () => { },
    closeModal: () => { },
    modals: { login: false, signUp: false, confirmDelete: false, editProfile: false },
    deleteSlug: null,
    setDeleteSlug: () => { }
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [modals, setModals] = useState<ModalType>({
        login: false,
        signUp: false,
        confirmDelete: false,
        editProfile: false,
    });
    const [deleteSlug, setDeleteSlug] = useState<string | null>(null);

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
        if (name === 'confirmDelete') {
            setDeleteSlug(null);
        }
    }
    return (
        <ModalContext.Provider value={{
            openModal,
            closeModal,
            modals,
            deleteSlug,
            setDeleteSlug
        }}>
            {children}
        </ModalContext.Provider>
    );
};
