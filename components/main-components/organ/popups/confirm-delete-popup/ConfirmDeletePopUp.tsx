"use client"

import { useContext, useState } from "react"
import { ModalContext } from "@/contexts/ModalContext"
import { useToast } from "@/contexts/ToastContext"
import MediumButton from "@/components/landing-page/cell/medium-button/MediumButton"
import Modal from "@/components/landing-page/tissue/modal/Modal"
import style from "./ConfirmDeletePopUp.module.css"
import { deletePostUrl } from "@/utils"
import { useRouter } from "next/navigation"

const ConfirmDeletePopUp = () => {
    const { modals, closeModal, deleteSlug } = useContext(ModalContext);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const { showToast } = useToast();
    const router = useRouter();

    const handleConfirm = async () => {
        if (isDeleting) return;
        setIsDeleting(true);
        if (!deleteSlug) return;
        try {
            const res = await fetch(deletePostUrl(deleteSlug), {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            if (!res.ok) {
                showToast("Failed to delete post", "error");
                return;
            }
            showToast("Post deleted successfully", "success");
            closeModal("confirmDelete");
            router.refresh()
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message)
            }
            showToast("Failed to delete post", "error");
        } finally {
            setIsDeleting(false);
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
