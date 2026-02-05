import { FC } from "react";
import ImageAvatar from "../../cell/image-avatar/ImageAvatar";
// import SmallText from "../../cell/small-text/SmallText";
import avatar from "@/public/default.jpg";
import style from './ProfileTag.module.css';
import SmallText from "@/components/landing-page/cell/small-text/SmallText";
import Link from "next/link";

const ProfileTag: FC<{ name: string, username: string }> = ({ name, username }) => {
    return (
        <Link className={style.ProfileTag} href={`/${username}`}>
            <ImageAvatar src={avatar} alt={name} size="small" username={name} />
            <SmallText>{name}</SmallText>
        </Link>
    )
}

export default ProfileTag;