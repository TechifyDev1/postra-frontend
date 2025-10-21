"use client";
import style from "./LIkeButton.module.css";
import { FC, useEffect, useState } from "react";
import { LikeButtonProps } from "@/types/types";
import SmallText from "../../cell/small-text/SmallText";
import { ThumbsUp } from "phosphor-react";
import { likeUrl } from "@/utils";
import { useToast } from "@/contexts/ToastContext";

const LikeButton: FC<LikeButtonProps> = ({  count, slug }) => {
  // initialize from prop so the initial render reflects parent-provided liked state
  const [data, setData] = useState<boolean>(false);
  const { showToast } = useToast();

  useEffect(() => {
    const checkIsLiked = async () => {
      const res = await fetch(likeUrl(slug) + "/is-liked", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await res.json();
      console.log("result", result);
      setData(result);
    };
    checkIsLiked();
  }, [slug]);
  const handleLike = async () => {
    try {
      const res = await fetch(likeUrl(slug), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await res.json();
      console.log(result);
      showToast(`${result.message === "Liked" ? "Post liked successfully" : "Post unliked successfully"}`, "success");
      // update local state immediately from API response
      setData(result.message === "Liked" ? true : false);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        showToast("Error Liking the post", "error");
      }
      console.log(error);
      showToast("Error Liking the post", "error");
      setData(false);
    }
    // Avoid logging state immediately after setState; state updates are async.
  };
  return (
    <button className={style.likeButton} onClick={handleLike}>
      <ThumbsUp
        size={20}
        weight={data ? "fill" : "regular"}
        className={style.likeIcon}
        color="var(--text-color-primary)"
      />
      <SmallText>{count}</SmallText>
    </button>
  );
};

export default LikeButton;
