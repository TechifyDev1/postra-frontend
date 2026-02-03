"use client";
import style from "./LIkeButton.module.css";
import { FC, MouseEventHandler, useContext, useEffect, useState } from "react";
import { LikeButtonProps } from "@/types/types";
import SmallText from "../../cell/small-text/SmallText";
import { ThumbsUp } from "phosphor-react";
import { likeUrl } from "@/utils";
import { useToast } from "@/contexts/ToastContext";
import { useUserContext } from "@/hooks/use-user-context";
import { ModalContext } from "@/contexts/ModalContext";
import SignInPopUp from "@/components/landing-page/organ/popups/signin-popup/SignInPopUp";
import SignUpPopUp from "@/components/landing-page/organ/popups/signup-popup/SignUpPopUp";

const LikeButton: FC<LikeButtonProps> = ({ count, slug }) => {
  const [data, setData] = useState<boolean>(false);
  const [likeCounts, setLikeCounts] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUserContext();
  const { openModal } = useContext(ModalContext);
  const { showToast } = useToast();

  useEffect(() => {
    const checkIsLiked = async () => {
      if (!user) {
        showToast("You are not logged in, please login", "error");
        openModal("login");
        return;
      }
      if (loading) return;
      setLoading(true);
      try {
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
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    checkIsLiked();
    setLikeCounts(count);
  }, [slug]);
  const handleLike: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      showToast("You are not logged in, please log in to like", "error");
      openModal("login");
      return;
    }
    if (loading) return;
    setLoading(true);
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

      if (result.error) {
        showToast(result.error, "error");
        return;
      }

      if (result.message === "Liked") {
        showToast("Post liked successfully", "success");
        setData(true);
      } else if (result.message === "Unliked") {
        showToast("Post unliked successfully", "success");
        setData(false);
      }

      if (result.totalLikes !== undefined) {
        setLikeCounts(result.totalLikes);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        showToast("Error Liking the post", "error");
      }
      console.log(error);
      showToast("Error Liking the post", "error");
      setData(false);
    } finally {
      setLoading(false)
    }
  };
  return (
    <>
      <button className={style.likeButton} onClick={handleLike}>
        <ThumbsUp
          size={20}
          weight={data ? "fill" : "regular"}
          className={style.likeIcon}
          color="var(--text-color-primary)"
        />
        <SmallText>{likeCounts}</SmallText>
      </button>
      <SignInPopUp />
      <SignUpPopUp />
    </>
  );
};

export default LikeButton;
