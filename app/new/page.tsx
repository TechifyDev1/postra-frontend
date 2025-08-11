"use client";
import NavBar from "@/components/main-components/organ/navbar/NavBar";
import style from "./page.module.css";
import PostEditor from "@/components/main-components/organ/PostEditor/PostEditor";

export default function Page() {
  return (
    <>
      <NavBar />
      <PostEditor />
    </>
  );
}
