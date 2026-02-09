"use client"
import { FC, useEffect } from "react"; // 1. Import useEffect
import Modal from "@/components/landing-page/tissue/modal/Modal";
import CommentBox from "../../tissue/comment-box/CommentBox";
import { UseShowComments } from "@/hooks/use-show-comments";
import { CommentsProvider } from "@/providers/CommentsProvider";

const CommentPopUp: FC<{ postSlug?: string }> = ({ postSlug: propSlug }) => {
    const showCommentsHook = UseShowComments();
    const postSlug = propSlug || showCommentsHook.slug;

    useEffect(() => {
        if (showCommentsHook.show) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [showCommentsHook.show]);

    const close = () => {
        showCommentsHook.setShow(false);
    }

    if (!postSlug) return null;

    return (
        <CommentsProvider postSlug={postSlug}>
            <Modal show={showCommentsHook.show} onClose={close}>
                <CommentBox postSlug={postSlug} />
            </Modal>
        </CommentsProvider>
    )
}

export default CommentPopUp;
