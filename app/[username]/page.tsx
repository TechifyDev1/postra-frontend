import { frontendBaseUrl, getUserPostsUrl, getUserUrl, truncate } from "@/utils";
import { Metadata } from "next"
import { notFound } from "next/navigation";
import { FC } from "react";
import style from './page.module.css'
import NavBar from "@/components/main-components/organ/navbar/NavBar";
import XlargeText from "@/components/landing-page/cell/xlarge-text/XlargeText";
import LargeText from "@/components/landing-page/cell/large-text/LargeText";
import LargeButton from "@/components/landing-page/cell/large-button/LargeButton";
import { cookies } from "next/headers";
import PostList from "@/components/main-components/organ/postlist/PostList";
import blogHero from "@/public/blog-hero.png";
import Link from "next/link";
import FollowButton from "@/components/main-components/tissue/follow-button/FollowButton";
import ProfileCounts from "@/components/main-components/profile-counts/ProfileCounts";

export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
    const cookieStore = cookies();
    const tokenCookie = (await cookieStore).get("token");
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...(tokenCookie?.value ? { Authorization: `Bearer ${tokenCookie.value}` } : {}),
        },
    };
    const { username } = await params;
    const res = await fetch(getUserUrl(username), options);
    if (!res.ok) {
        console.log(res);
        return notFound();
    }
    const userData = await res.json();
    const user = await userData.data;
    console.log("User data", userData);


    return {
        title: `${await user.fullName} | ${await user.username} | Postra`,
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

import ProfilePosts from "@/components/main-components/organ/ProfilePosts/ProfilePosts";

const page: FC<{ params: { username: string } }> = async ({ params }) => {
    const cookieStore = cookies();
    const tokenCookie = (await cookieStore).get("token");

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...(tokenCookie?.value ? { "Authorization": `Bearer ${tokenCookie.value}` } : {}),
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
                    <ProfileCounts />
                    {user.currentUser && (
                        <LargeButton style={{ marginTop: "1rem" }}>
                            Edit
                        </LargeButton>
                    )}
                </div>
                <div className={style.buttonContainer}>
                    {!user.currentUser && (
                        <FollowButton username={username} />
                    )}
                </div>
            </div>

            <div className={style.postsSection}>
                <div style={{ borderBottom: "1px solid #eaeaea" }}>
                    <XlargeText align="alignLeft">Posts</XlargeText>
                </div>

                <ProfilePosts username={username} isCurrentUser={user.currentUser} />
            </div>
        </div>
    );
}

export default page;