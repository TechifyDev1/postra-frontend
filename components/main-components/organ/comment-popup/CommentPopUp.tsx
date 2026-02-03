import { FC } from "react";
import Modal from "@/components/landing-page/tissue/modal/Modal";
import CommentBox from "../../tissue/comment-box/CommentBox";
import { CommentsProvider } from "@/app/providers/CommentsProvider";
import { UseShowComments } from "@/hooks/use-show-comments";

const CommentPopUp: FC<{ postSlug: string }> = ({ postSlug }) => {
    const showCommentsHook = UseShowComments();
    const close = () => {
        showCommentsHook.setShow(false);
    }
    return (
        <CommentsProvider postSlug={postSlug}>
            <Modal show={showCommentsHook.show} onClose={close}>
                <CommentBox postSlug={postSlug} />
            </Modal>
        </CommentsProvider>
    )
}

export default CommentPopUp;