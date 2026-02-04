import { frontendBaseUrl, getUserPostsUrl, getUserUrl, truncate } from "@/utils";
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
import PostList from "@/components/main-components/organ/postlist/PostList";
import blogHero from "@/public/blog-hero.png";
import Link from "next/link";
import FollowButton from "@/components/main-components/tissue/follow-button/FollowButton";

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
    console.log(user);


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

    const postsRes = await fetch(getUserPostsUrl(username, 0, 10), options);
    const postsData = await postsRes.json();
    const posts = postsData.content || [];

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
                        Followers: {user.numOfFollowers || 0} | Following: {user.numOfFollowing || 0} | Posts: {user.postsCount || 0}
                    </SmallText>
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

                <div className={style.postsContainer}>
                    {posts.length > 0 ? (
                        posts.map((post: any) => (
                            <PostList
                                key={post.id}
                                id={post.id}
                                title={truncate(post.title, 60)}
                                subtitle={truncate(post.subTitle, 100)}
                                image={post.postBanner ?? blogHero}
                                likes={post.likeCount}
                                comments={post.commentCount}
                                time="Recently"
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