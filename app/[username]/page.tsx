import { frontendBaseUrl, getUserPostsUrl, getUserUrl, truncate } from "@/utils";
import ProfileEditButton from "@/components/main-components/tissue/profile-edit-button/ProfileEditButton";
import NavBarWrapper from "@/components/main-components/organ/NavBarWrapper";
import LogoutButton from "@/components/main-components/tissue/logout-button/LogoutButton";
import { Metadata } from "next"
import { notFound } from "next/navigation";
import { FC } from "react";
import style from './page.module.css'
import XlargeText from "@/components/landing-page/cell/xlarge-text/XlargeText";
import LargeText from "@/components/landing-page/cell/large-text/LargeText";
import LargeButton from "@/components/landing-page/cell/large-button/LargeButton";
import { cookies } from "next/headers";
import PostList from "@/components/main-components/organ/postlist/PostList";
import blogHero from "@/public/blog-hero.png";
import Link from "next/link";
import FollowButton from "@/components/main-components/tissue/follow-button/FollowButton";
import ProfileCounts from "@/components/main-components/profile-counts/ProfileCounts";
import Image from "next/image";

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
                    url: user.profilePictureUrl || `${frontendBaseUrl}/default-profile.png`,
                    alt: `${await user.fullName}'s profile picture`
                }
            ],
            siteName: "Postra"
        }
    }
}



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
    const postRes = await fetch(getUserPostsUrl(username, 0, 30), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...(tokenCookie?.value ? { "Authorization": `Bearer ${tokenCookie.value}` } : {}),
        }
    });

    if (!postRes.ok) {
        console.error("unable to get user's posts")
    }

    const postData = await postRes.json();
    console.log(postData)
    const posts = postData.content;
    console.log("Users post:", posts)

    if (!user) return notFound();

    return (
        <div className={style.page}>
            <NavBarWrapper />
            <div className={style.profilePictureContainer} style={{ position: "relative" }}>
                <Image src={`${user.bgImage || '/postra-banner.jpg'}`} alt={`${user.fullName}'s background image`} className={style.backgroundImage} fill />
                <Image src={`${user.profilePictureUrl || '/default.jpg'}`} alt={`${user.fullName}'s profile picture`} className={style.profileImage} width={100} height={100} />
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
                        <div className={style.actionButtons}>
                            <ProfileEditButton />
                            <LogoutButton />
                        </div>
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

                <div className={style.postsContainer}>
                    {posts.length > 0 ? (
                        posts.map((post: any) => (
                            <PostList
                                key={post.id}
                                id={post.id}
                                title={truncate(post.title, 60)}
                                subtitle={truncate(post.subTitle || "", 100)}
                                image={post.image ?? blogHero}
                                likes={post.likeCount}
                                comments={post.commentCount}
                                time={post.createdAt}
                                slug={post.slug}
                                authorFullName={post.authorFullName}
                                authorUsername={post.username}
                            />
                        ))
                    ) : (
                        <div style={{ textAlign: "center", padding: "4rem 0" }}>
                            <LargeText align="center">
                                {user.currentUser
                                    ? "You currently have no posts"
                                    : "This user currently doesn't have posts"}
                            </LargeText>
                            {user.currentUser && (
                                <Link href="/new" style={{ marginTop: "1rem", display: "inline-block" }}>
                                    <LargeButton>Create Post</LargeButton>
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default page;