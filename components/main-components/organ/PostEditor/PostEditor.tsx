'use client';
import { MouseEvent } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import { Code, TextBolder, TextItalic, X } from "phosphor-react";
import { ChangeEvent, FC, useRef, useState } from "react";
import style from "./PostEditor.module.css";
import Image from "@tiptap/extension-image";
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node";
import LargeButton from "@/components/landing-page/cell/large-button/LargeButton";
import { deleteUrl, publishPostUrl, uploadUrl } from "@/utils";
import { useToast } from "@/contexts/ToastContext";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const PostEditor: FC = () => {
  const imgInpRef = useRef<HTMLInputElement>(null);
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [code, setCode] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubtitle] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [postBannerUrl, setPostBannerUrl] = useState<String>("");
  const bannerImgRef = useRef<HTMLImageElement>(null);
  const [postBannerId, setPostBannerId] = useState("");
  const { showToast } = useToast();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const handleImageUpload: () => Promise<string> = async () => {
    console.log("Image Uploading...");
    return new Promise((resolve, reject) => {
      if (imgInpRef.current == null) return reject("No input Found");
      imgInpRef.current.click();

      imgInpRef.current.onchange = async (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (!target.files?.length) return reject("No file selected");

        const formData = new FormData();
        const file = target.files[0];
        if (file.size > MAX_FILE_SIZE) return reject("File size exceeds limit");

        formData.append("file", file);

        try {
          const res = await fetch(uploadUrl, {
            method: "POST",
            body: formData,
            credentials: "include" as RequestCredentials,
          });

          if (!res.ok) {
            const errorMessage = await res.text();
            console.error("Error: ", errorMessage);
            return reject("Upload failed");
          }

          const data = await res.json();
          console.log("Upload response:", data);

          // Reset input so the same file can be chosen again
          imgInpRef.current!.value = "";

          return resolve(data.url);
        } catch (err) {
          return reject("Upload error: " + err);
        }
      };
    });
  };

  const handleBannerUpload: () => Promise<void> = async () => {
    if (bannerImgRef.current !== null) {
      // console.error("Post Banner Ref is null");
      return;
    }
    console.log("Uploading Banner...");
    return new Promise((resolve, reject) => {
      if (imgInpRef.current == null) return reject("No Post Banner input found");
      imgInpRef.current.click();
      imgInpRef.current.onchange = async (e: Event) => {
        const target = e.target;
        if (!(target instanceof HTMLInputElement) || !target.files?.length) return reject();
        const formData = new FormData();
        const file = target.files[0];
        if (file.size > MAX_FILE_SIZE) return reject();
        formData.append("file", file);
        try {
          const res = await fetch(uploadUrl, {
            method: "POST",
            body: formData,
            credentials: "include" as RequestCredentials,
          });
          if (!res.ok) {
            const errorMessage = await res.text();
            showToast("Failed to upload banner", "error");
            console.error("Error: ", errorMessage);
            return reject();
          }
          const data = await res.json();
          console.log("Banner Upload response:", data);
          setPostBannerUrl(data.url);
          console.log(bannerImgRef);
          setPostBannerId(data.public_id);
          return resolve();
        } catch (e) {
          if (e instanceof Error) {
            showToast(e.message, "error");
            return reject();
          }
        }
      }
    });
  }


  const handleBannerRem = async (): Promise<void> => {
    // if (!bannerImgRef.current) {
    //   console.error("Banner Image Ref is null");
    //   return;
    // }
    // const publicId = bannerImgRef.current.dataset.publicId;
    // console.log(bannerImgRef.current);
    setIsDeleting(true);
    if (!postBannerId) {
      console.log("Public Id is missing");
      return;
    }


    try {
      const res = await fetch(deleteUrl(postBannerId), {
        method: "DELETE",
        credentials: "include" as RequestCredentials,
      });

      if (!res.ok) {
        const errorMessage = await res.text();
        console.error("Delete error:", errorMessage);
        showToast("Unable to remove the banner", "error");
        return;
      }

      const data = await res.text();
      console.log("Delete response:", data);

      setPostBannerUrl("");
      showToast("Banner Deleted", "success");
    } catch (err) {
      console.error("Unexpected error:", err);
      showToast("Something went wrong", "error");
    } finally {
      setIsDeleting(false);
    }
  }



  const handleError: () => void = () => {
    console.log("Error Occured");
  }
  const handleSuccess: () => void = () => {
    console.log("Image Uploaded Successfully");
  }
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }
  const handleSubtitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSubtitle(e.target.value);
  }

  const handleBoldClick = () => {
    setBold(!bold);
    setCode(false);
    editor?.chain().focus().toggleBold().run();
  };
  const handleItalicClick = () => {
    setItalic(!italic);
    setCode(false);
    editor?.chain().focus().toggleItalic().run();
  };
  const handleCodeClick = () => {
    setCode(!code);
    setBold(false);
    setItalic(false);
    editor?.chain().focus().toggleCode().run();
  };

  const editor = useEditor({
    extensions: [StarterKit, Image.configure({ inline: true }), ImageUploadNode.configure({
      accept: "image/*",
      maxSize: MAX_FILE_SIZE,
      limit: 3,
      upload: handleImageUpload,
      onError: handleError,
      onSuccess: handleSuccess,
    })],
    content: "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: style.editorContent,
      },
    },
  });

  if (!editor) return null;
  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      if (editor.isEmpty) throw new Error("Cannot publish empty post");
      if (title.trim().length === 0) throw new Error("Title cannot be empty");
      const res = await fetch(publishPostUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include' as RequestCredentials,
        body: JSON.stringify({
          title: title.trim(),
          postBanner: postBannerUrl,
          subTitle: subTitle.trim(),
          content: editor.getHTML()
        })
      });
      if (!res.ok) {
        const errorMessage = await res.text();
        console.log("Error: ", errorMessage);
        throw new Error("Failed to publish post");
      } else {
        console.log("Post Published Successfully");
        editor.commands.clearContent();
        showToast("Post Published Successfully", "success");
        setTitle("");
        setSubtitle("");
        setPostBannerUrl("");
        setPostBannerId("");

      }
      setTitle("");
      setSubtitle("");
    } catch (err) {
      if (err instanceof Error) {
        console.log("Error: ", err.message);
        showToast(err.message, "error");
        return;
      };
    } finally {
      setIsPublishing(false);
    }
  }


  return (
    <div className={style.postEditor}>
      <input type="file" accept="image/*" style={{ display: "none" }} ref={imgInpRef} />

      <div className={style.postBannerContainer} onClick={handleBannerUpload}>
        {postBannerUrl === "" || postBannerUrl && <button className={style.removeBanner} onClick={(e: MouseEvent<HTMLButtonElement>) => { e.stopPropagation(); handleBannerRem() }} disabled={isDeleting}>
          <X color="white" />
        </button>}
        {postBannerUrl !== "" || postBannerUrl ? (
          <img src={postBannerUrl === "" ? undefined : postBannerUrl.toString()} alt="Post Banner" className={style.postBanner} ref={bannerImgRef} />) : (
          <div className={style.postBannerPlaceholder}>Post Banner</div>
        )}
      </div>

      <input type="text" placeholder="Title" className={style.titleInput} onChange={handleTitleChange} value={title} />
      <input type="text" placeholder="Subtitle (optional)" className={style.subtitleInput} onChange={handleSubtitleChange} value={subTitle} />
      <div className={style.toolbar}>
        <button onClick={handleBoldClick} className={style.boldButton + (bold ? ` ${style.active}` : '')}>
          <TextBolder />
        </button>
        <button onClick={handleItalicClick} className={`${style.italicButton + (italic ? ` ${style.active}` : '')}`}>
          <TextItalic />
        </button>
        <button onClick={handleCodeClick} className={style.codeButton + (code ? ` ${style.active}` : '')}>
          <Code />
        </button>
        <button
          onClick={async () => {
            const url = await handleImageUpload();
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
          className={style.imageButton}
        >
          Add Image
        </button>
      </div>

      <EditorContent editor={editor} />

      <BubbleMenu editor={editor} className={style.bubbleMenu}>
        <button onClick={() => editor.chain().focus().toggleBold().run()} >
          <TextBolder />
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          <TextItalic />
        </button>
        <button onClick={() => editor.chain().focus().toggleCode().run()}>
          <Code />
        </button>
      </BubbleMenu>

      <LargeButton style={{ marginTop: '20px', alignSelf: 'flex-end' }} onClick={handlePublish} disabled={isPublishing} isLoading={isPublishing}>
        <span>Publish</span>
      </LargeButton>
    </div>
  );
};

export default PostEditor;
