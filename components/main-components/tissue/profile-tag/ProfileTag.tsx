import { FC } from "react";
import ImageAvatar from "../../cell/image-avatar/ImageAvatar";
// import SmallText from "../../cell/small-text/SmallText";
import avatar from "@/public/default.jpg";
import style from './ProfileTag.module.css';
import SmallText from "@/components/landing-page/cell/small-text/SmallText";
import Link from "next/link";

const ProfileTag: FC<{ name: string, username: string, profilePictureUrl?: string }> = ({ name, username, profilePictureUrl }) => {
    return (
        <div className={style.ProfileTag}>
            <ImageAvatar src={profilePictureUrl || avatar} alt={name} size="small" username={username} />
            <Link href={`/${username}`}>
                <SmallText>{name}</SmallText>
            </Link>
        </div>
    )
}

export default ProfileTag;