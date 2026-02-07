'use client';
import { FC, useContext } from "react";
import LargeButton from "@/components/landing-page/cell/large-button/LargeButton";
import { ModalContext } from "@/contexts/ModalContext";

const ProfileEditButton: FC = () => {
    const { openModal } = useContext(ModalContext);

    return (
        <LargeButton style={{ marginTop: "1rem" }} onClick={() => openModal("editProfile")}>
            Edit
        </LargeButton>
    );
};

export default ProfileEditButton;
