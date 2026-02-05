"use client"

import { useContext } from "react"
import { ModalContext } from "@/contexts/ModalContext"
import { usePostsContext } from "@/hooks/use-posts-context"
import { useToast } from "@/contexts/ToastContext"
import MediumButton from "@/components/landing-page/cell/medium-button/MediumButton"
import Modal from "@/components/landing-page/tissue/modal/Modal"
import style from "./ConfirmDeletePopUp.module.css"

const ConfirmDeletePopUp = () => {
    const { modals, closeModal, deleteSlug } = useContext(ModalContext);
    const { deletePost, isDeleting } = usePostsContext();
    const { showToast } = useToast();

    const handleConfirm = async () => {
        if (!deleteSlug) return;
        const success = await deletePost(deleteSlug);
        if (success) {
            showToast("Post deleted successfully", "success");
            closeModal("confirmDelete");
        } else {
            showToast("Failed to delete post", "error");
        }
    }

    return (
        <Modal show={modals.confirmDelete} onClose={() => closeModal("confirmDelete")}>
            <div className={style.popup} onClick={(e) => e.stopPropagation()}>
                <h3>Delete Post</h3>
                <p>Are you sure you want to delete this post? This action cannot be undone.</p>
                <div className={style.actions}>
                    <MediumButton onClick={() => closeModal("confirmDelete")} disabled={isDeleting}>
                        Cancel
                    </MediumButton>
                    <MediumButton
                        style={{ backgroundColor: "red", color: "white" }}
                        onClick={handleConfirm}
                        isLoading={isDeleting}
                    >
                        Delete
                    </MediumButton>
                </div>
            </div>
        </Modal>
    )
}

export default ConfirmDeletePopUp;
