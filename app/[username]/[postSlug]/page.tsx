import { getApost, frontendBaseUrl } from "@/utils";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { FC } from "react";
import styles from "./page.module.css";
import LikeButton from "@/components/main-components/tissue/like-button/LikeButton";
import CommentButton from "@/components/main-components/tissue/comment-button/CommentButton";
import AuthorInfo from "@/components/main-components/tissue/authorInfo/AuthorInfo";
import NavBarWrapper from "@/components/main-components/organ/NavBarWrapper";
import EditButton from "@/components/main-components/tissue/edit-button/EditButton";
import Image from "next/image";
import defaultBanner from "../../../public/postra-banner.jpg"
import DeleteButton from "@/components/main-components/tissue/delete-button/DeleteButton";

export async function generateMetadata({
  params,
}: {
  params: { username: string; postSlug: string };
}): Promise<Metadata> {
  const { username, postSlug } = await params;

  // We don't need authentication to fetch public post data for SEO
  const res = await fetch(getApost(username, postSlug), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Client-Type": "web",
    },
  });

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
      : (post.content?.replace(/<[^>]*>/g, "").slice(0, 150).replace(/\s+$/, "") + "..."); // Strip HTML tags

  const postUrl = `${frontendBaseUrl}/${username}/${postSlug}`;
  // Use post banner if available, otherwise use default banner
  const postImage = (post.postBanner && post.postBanner !== "") ? post.postBanner : `${frontendBaseUrl}/postra-banner.jpg`;

  const title = `${post.title} | ${post.authorFullName} | Postra`;

  return {
    title: title,
    description,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: title,
      description,
      url: postUrl,
      type: "article",
      images: [
        {
          url: postImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      authors: [post.authorFullName],
      siteName: "Postra",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description,
      images: [postImage],
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
  console.log(post)
  return (
    <div className={styles.postPage}>
      <NavBarWrapper />

      {/* Hero / Banner Section */}
      <section className={styles.hero}>
        <Image
          src={post.postBanner === "" || post.postBanner === null ? defaultBanner : post.postBanner}
          alt={post.title}
          className={styles.postBanner}
          fill
        />
        <div className={styles.heroOverlay}>
          <h1 className={styles.postTitle}>{post.title}</h1>
          <p className={styles.postSubtitle}>{post.subTitle}</p>
        </div>
      </section>


      {/* Content Section */}
      <section className={styles.postContent}>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </section>
      {/* Like section */}
      <section className={styles.likeSection}>
        <LikeButton isLiked={false} count={post.likeCount} slug={post.slug} />
        <CommentButton count={post.commentCount | 0} slug={post.slug} />
        <EditButton username={post.authorUsername} slug={post.slug} />
        <DeleteButton username={post.authorUsername} slug={post.slug} />
      </section>
      <AuthorInfo post={post} />
    </div>
  );
};

export default page;
