import NavBar from "@/components/main-components/organ/navbar/NavBar";
import { getApost } from "@/utils";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { FC } from "react";
import styles from "./page.module.css";
import MediumButton from "@/components/landing-page/cell/medium-button/MediumButton";
import { ThumbsUp } from "phosphor-react";
import LikeButton from "@/components/main-components/tissue/like-button/LikeButton";

export async function generateMetadata({
  params,
}: {
  params: { username: string; postSlug: string };
}): Promise<Metadata> {
  const { username, postSlug } = await params;
  const cookieStore = cookies();
  const tokenCookie = (await cookieStore).get("token");
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenCookie?.value}`,
    },
  };
  console.log(options);

  const res = await fetch(getApost(username, postSlug), options);

  if (!res.ok) {
    return {
      title: "Post Not Found",
      description: `Post not found for user ${username} with slug ${postSlug}`,
    };
  }

  const post = await res.json();

  const description =
    post.subTitle?.length > 0
      ? post.subTitle
      : post.content?.slice(0, 150).replace(/\s+$/, "") + "...";

  const siteUrl = "https://qudus.com";
  const postUrl = `${siteUrl}/${post.authorUsername}/${post.slug}`;

  return {
    title: `${post.title} | ${post.authorFullName}`,
    description,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description,
      url: postUrl,
      type: "article",
      images: [
        {
          url: post.postBanner ?? `${siteUrl}/default-banner.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      authors: [post.authorFullName],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [post.postBanner ?? `${siteUrl}/default-banner.png`],
    },
  };
}

const page: FC<{ params: { username: string; postSlug: string } }> = async ({
  params,
}) => {
  const { username, postSlug } = await params;
  const cookieStore = cookies();
  const tokenCookie = (await cookieStore).get("token");

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenCookie?.value}`,
    },
  };
  const res = await fetch(getApost(username, postSlug), options);
  if (!res.ok) {
    return notFound();
  }
  const post = await res.json();
  return (
    <div className={styles.postPage}>
      <NavBar />

      {/* Hero / Banner Section */}
      <section className={styles.hero}>
        <img
          src={post.postBanner}
          alt={post.title}
          className={styles.postBanner}
        />
        <div className={styles.heroOverlay}>
          <h1 className={styles.postTitle}>{post.title}</h1>
          <p className={styles.postSubtitle}>{post.subTitle}</p>
        </div>
      </section>

      {/* Like section */}
      <section>
        <LikeButton isLiked={false} count={30} slug={post.slug} />
      </section>

      {/* Content Section */}
      <section className={styles.postContent}>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </section>

      <section className={styles.authorInfo}>
        <img
          src={post.authorProfilePic ? post.authorProfilePic : "/default.jpg"}
          alt={`${post.authorFullName}'s Profile Pic`}
        />
        <p>{post.authorFullName}</p>
        <MediumButton>
          <p style={{ margin: "0", padding: "0" }}>Follow</p>
        </MediumButton>
      </section>
    </div>
  );
};

export default page;
