import { FC } from "react";
import style from "./CommentPopUp.module.css";
import Modal from "@/components/landing-page/tissue/modal/Modal";
import CommentBox from "../../tissue/comment-box/CommentBox";

const CommentPopUp: FC = () => {
    return (
        <Modal show={true} onClose = {() => {}}>
            <CommentBox />
        </Modal>
    )
}

export default CommentPopUp;