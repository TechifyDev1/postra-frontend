"use client"
import MediumButton from "@/components/landing-page/cell/medium-button/MediumButton"
import { useUserContext } from "@/hooks/use-user-context"
import { useContext } from "react"
import { ModalContext } from "@/contexts/ModalContext"

const DeleteButton = ({ slug, username }: { username: string, slug: string }) => {
    const { user, isLoading } = useUserContext();
    const { openModal, setDeleteSlug } = useContext(ModalContext);

    if (isLoading) return null;
    if (!user) return null;
    if (user.username !== username) return null;

    const handleDeleteClick = () => {
        setDeleteSlug(slug);
        openModal("confirmDelete");
    }

    return (
        <MediumButton style={{ backgroundColor: "red" }} onClick={handleDeleteClick}>
            Delete
        </MediumButton>
    )
}

export default DeleteButton;