import { FC } from "react";
import style from "./CommentList.module.css";
import ProfileTag from "../profile-tag/ProfileTag";
import SmallText from "../../cell/small-text/SmallText";

const CommentList: FC<{authorUsername: string, comment: string}> = ({authorUsername, comment}) => {
    return (
        <div className={style.commentList}>
            <ProfileTag name={authorUsername} username={authorUsername} />
            <SmallText>
                {comment}
            </SmallText>
        </div>
    )
}

export default CommentList;