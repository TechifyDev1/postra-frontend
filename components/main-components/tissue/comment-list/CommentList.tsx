import { FC } from "react";
import style from "./CommentList.module.css";
import ProfileTag from "../profile-tag/ProfileTag";
import SmallText from "../../cell/small-text/SmallText";

const CommentList: FC = () => {
    return (
        <div>
            <ProfileTag name="Techify" />
            <SmallText>
                Some Comment
            </SmallText>
        </div>
    )
}

export default CommentList;