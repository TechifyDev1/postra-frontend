'use client';
import { MouseEvent, useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import { Code, TextBolder, TextItalic, X } from "phosphor-react";
import { ChangeEvent, FC, useRef, useState } from "react";
import style from "./PostEditor.module.css";
import Image from "@tiptap/extension-image";
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node";
import LargeButton from "@/components/landing-page/cell/large-button/LargeButton";
import { deleteUrl, getApost, publishPostUrl, signUrl, updatePostUrl, uploadUrl } from "@/utils";
import { useToast } from "@/contexts/ToastContext";
import { notFound, useParams } from "next/navigation";
import { useUserContext } from "@/hooks/use-user-context";
import { useRouter } from "next/navigation";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const PostEditor: FC<{ edit?: boolean }> = ({ edit = false }) => {
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
  const [initialContent, setInitialContent] = useState(null);
  const { showToast } = useToast();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const params = useParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const postSlug = params.postSlug as string;
  const username = params.username as string;
  const { user, isLoading } = useUserContext();
  const router = useRouter();


  async function fetchPost() {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(getApost(username, postSlug), {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      if (!res.ok) {
        throw new Error("Could not find this post.");
      }
      const post = await res.json();
      console.log(post);
      if (post.authorUsername !== user?.username) throw new Error("You cannot edit this post, you are not the owner");
      setTitle(post.title);
      setSubtitle(post.subTitle);
      setPostBannerUrl(post.postBanner);
      setInitialContent(post.content);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={fetchPost}>Try Again</button>
        <button onClick={() => window.history.back()}>Go Back</button>
      </div>
    );
  }

  const handleImageUpload: () => Promise<string> = async () => {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const paramsToSign = { timestamp };
    return new Promise((resolve, reject) => {
      if (imgInpRef.current == null) return reject("No input Found");
      imgInpRef.current.click();

      imgInpRef.current.onchange = async (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (!target.files?.length) return reject("No file selected");

        const formData = new FormData();
        const file = target.files[0];
        if (file.size > MAX_FILE_SIZE) {
          showToast("File size exceeds 5mb", "error");
          return reject("File size exceeds 5mb")
        }

        const signRef = await fetch(signUrl(), {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(paramsToSign)
        })

        if (!signRef.ok) {
          console.error("Unable to genenerate signed url");
          return reject("Upload failed")
        }

        const response = await signRef.json();
        const data = response.data;
        const { signature } = data;

        formData.append("file", file);
        formData.append("api_key", "544934933231257");
        formData.append("timestamp", timestamp.toString());
        formData.append("signature", signature)

        try {
          const res = await fetch("https://api.cloudinary.com/v1_1/dvpkp0u9u/image/upload", {
            method: "POST",
            body: formData,
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

          return resolve(data.secure_url);
        } catch (err) {
          showToast("Unable to upload an image, please try again");
          return reject("Upload error: " + err);
        }
      };
    });
  };

  const handleBannerUpload: () => Promise<void> = async () => {
    if (bannerImgRef.current !== null) {
      return;
    }
    const timestamp = Math.round(new Date().getTime() / 1000);
    const paramsToSign = { timestamp };
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
        const signRef = await fetch(signUrl(), {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(paramsToSign)
        })

        if (!signRef.ok) {
          console.error("Unable to genenerate signed url");
          return reject("Upload failed")
        }
        const response = await signRef.json();
        const data = response.data;
        const { signature } = data;
        console.log(response);
        console.log("Response for signature:", signature)
        formData.append("file", file);
        formData.append("api_key", "544934933231257");
        formData.append("timestamp", timestamp.toString());
        formData.append("signature", signature)
        try {
          const res = await fetch("https://api.cloudinary.com/v1_1/dvpkp0u9u/image/upload", {
            method: "POST",
            body: formData,
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
    setIsDeleting(true);

    // Only attempt to delete from Cloudinary if we have a public ID (newly uploaded image)
    if (postBannerId) {
      try {
        const res = await fetch(deleteUrl(postBannerId), {
          method: "DELETE",
          credentials: "include" as RequestCredentials,
        });

        if (!res.ok) {
          const errorMessage = await res.text();
          console.error("Delete error:", errorMessage);
          // We don't return here, we still want to remove it from UI
          showToast("Warning: Image might not have been deleted from cloud", "error");
        } else {
          const data = await res.text();
          console.log("Delete response:", data);
          showToast("Banner Deleted from cloud", "success");
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        // Continue to remove from UI
      }
    }

    // Always clear the state
    setPostBannerUrl("");
    setPostBannerId("");
    if (imgInpRef.current) {
      imgInpRef.current.value = "";
    }
    setIsDeleting(false);
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

  useEffect(() => {
    if (edit && postSlug) {
      if (isLoading) return;
      if (!user) return notFound();
      fetchPost();
    }
  }, [edit, postSlug, user, isLoading])

  useEffect(() => {
    if (editor && initialContent && edit) {
      editor.commands.setContent(initialContent);
    }
  }, [editor, initialContent, edit]);

  if (!editor) return null;
  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      if (editor.isEmpty) throw new Error("Cannot publish empty post");
      if (title.trim().length === 0) throw new Error("Title cannot be empty");

      const res = await fetch(edit ? updatePostUrl(postSlug) : publishPostUrl, {
        method: edit ? "PUT" : "POST",
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
      const post = await res.json();
      if (!res.ok) {
        const errorMessage = await res.text();
        console.log("Error: ", errorMessage);
        throw new Error(edit ? "Failed to update post" : "Failed to publish post");
      } else {
        console.log(edit ? "Post Updated Successfully" : "Post Published Successfully");
        if (!edit) {
          editor.commands.clearContent();
          setTitle("");
          setSubtitle("");
          setPostBannerUrl("");
          setPostBannerId("");
        }
        showToast(edit ? "Post Updated Successfully" : "Post Published Successfully", "success");
        router.push(`${post.authorUsername}/${post.slug}`);
      }
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
        <span>{edit ? "Update" : "Publish"}</span>
      </LargeButton>
    </div>
  );
};

export default PostEditor;
