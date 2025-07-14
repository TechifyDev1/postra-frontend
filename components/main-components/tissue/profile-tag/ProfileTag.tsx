import { FC } from "react";
import ImageAvatar from "../../cell/image-avatar/ImageAvatar";
// import SmallText from "../../cell/small-text/SmallText";
import avatar from "@/public/default.jpg";
import style from './ProfileTag.module.css';
import SmallText from "@/components/landing-page/cell/small-text/SmallText";

const ProfileTag: FC<{name: string}> = ({ name }) => {
    return (
        <div className={style.ProfileTag}>
            <ImageAvatar src={avatar} alt={name} size="small" />
            <SmallText>{name}</SmallText>
        </div>
    )
}

export default ProfileTag;