"use client";
import style from "./LIkeButton.module.css";
import { FC, useState } from "react";
import { LikeButtonProps } from "@/types/types";
import SmallText from "../../cell/small-text/SmallText";
import { ThumbsUp } from "phosphor-react";
import { likeUrl } from "@/utils";
import { useToast } from "@/contexts/ToastContext";

const LikeButton: FC<LikeButtonProps> = ({ isLiked, count, slug }) => {
  const [data, setData] = useState<any>();
  const {showToast} = useToast();
  const handleLike = async () => {
    try {
      const res = await fetch(likeUrl(slug), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      setData(res.text());
    } catch (error) {
        if (error instanceof Error) {
            console.log(error);
            showToast("Error Liking the post", "error")
        }
    }
    console.log(data);
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
