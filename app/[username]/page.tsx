import { frontendBaseUrl, getUserUrl } from "@/utils";
import { Metadata } from "next"
import { notFound } from "next/navigation";
import { FC } from "react";
import style from './page.module.css'
import NavBar from "@/components/main-components/organ/navbar/NavBar";
import XlargeText from "@/components/landing-page/cell/xlarge-text/XlargeText";
import LargeText from "@/components/landing-page/cell/large-text/LargeText";
import SmallText from "@/components/main-components/cell/small-text/SmallText";
import LargeButton from "@/components/landing-page/cell/large-button/LargeButton";
import { cookies } from "next/headers";

export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
  const cookieStore = cookies();
  const tokenCookie = (await cookieStore).get("token");
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenCookie?.value}`,
    },
  };
    const { username } = await params;
    const res = await fetch(getUserUrl(username), options);
    if (!res.ok) {
        console.log(res);
        return notFound();
    }
    const user = await res.json();
    console.log(user);


    return {
        title: `${await user.fullName} | Postra`,
        description: `Profile of ${await user.fullName}, a user on Postra.`,
        openGraph: {
            title: `${await user.fullName} | Postra`,
            description: `Profile of ${await user.fullName}, a user on Postra.`,
            url: `${frontendBaseUrl}/${username}`,
            images: [
                {
                    url: user.profilePicture || `${frontendBaseUrl}/default-profile.png`,
                    alt: `${await user.fullName}'s profile picture`
                }
            ],
            siteName: "Postra"
        }
    }
}

const page: FC<{ params: { username: string } }> = async ({ params }) => {
const cookieStore = cookies();
const tokenCookie = (await cookieStore).get("token"); // or whatever name you store JWT as

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${tokenCookie?.value}`,
    "X-Client-Type": "web",
  },
};

    const { username } = await params;
    const res = await fetch(getUserUrl(username), options);
    if (!res.ok) return notFound();
    const data = await res.json();
    const user = data.data;

    if (!user) return notFound();

    return (
        <div className={style.page}>
            <NavBar />
            <div className={style.profilePictureContainer}>
                <img src={`${user.bgImage || '/defaultBg.jpg'}`} alt={`${user.fullName}'s background image`} className={style.backgroundImage} />
                <img src={`${user.profilePicture || '/default.jpg'}`} alt={`${user.fullName}'s profile picture`} className={style.profileImage} />
            </div>
            <div className={style.profileInfo}>
                <div className={style.mainInfo}>
                    <XlargeText align="alignLeft">
                        {user.fullName}
                    </XlargeText>
                    <LargeText align="left">
                        @{user.username}
                    </LargeText>
                    <LargeText align="left">
                        {user.bio || "No bio available."}
                    </LargeText>
                    <SmallText align="alignLeft">
                        Followers: {user.followersCount || 0} | Following: {user.followingCount || 0} | Posts: {user.postsCount || 0}
                    </SmallText>
                </div>
                <div className={style.buttonContainer}>
                    <LargeButton>
                        Follow
                    </LargeButton>
                </div>
            </div>
        </div>
    );
}

export default page;