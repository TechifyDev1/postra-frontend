'use client';
import { EditorContent, useEditor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import { Code, TextBolder, TextItalic } from "phosphor-react";
import { FC, useRef, useState } from "react";
import style from "./PostEditor.module.css";
import Image from "@tiptap/extension-image";
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node";
import LargeButton from "@/components/landing-page/cell/large-button/LargeButton";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const PostEditor: FC = () => {
  const imgInpRef = useRef<HTMLInputElement>(null);
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [code, setCode] = useState(false);
  const handleImageUpload: () => Promise<string> = async () => {
    console.log("Image Uploading...");
    return new Promise((resolve, reject) => {
      if(imgInpRef.current == null) return reject("No input Found");
      imgInpRef.current.click();
      imgInpRef.current.onchange = async (event: Event) => {
        const target = event.target as HTMLInputElement;
        if(target.files == null) return reject("No file selected");
        const file = target.files[0];
        if(file.size > MAX_FILE_SIZE) return reject("File size exceeds limit");
        const localUrl = URL.createObjectURL(file);
        // TODO: Upload to server or cloud storage and get the URL
        return resolve(localUrl);
      }
    });
  }
  const handleError: () => void = () => {
    console.log("Error Occured");
  }
  const handleSuccess: () => void = () => {
    console.log("Image Uploaded Successfully");
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

  let editorContent = editor.getHTML();
  console.log(editorContent);

  return (
    <div className={style.postEditor}>
      <input type="file" accept="image/*" style={{display: "none"}} ref={imgInpRef} />

      <input type="text" placeholder="Title" className={style.titleInput} />
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

      <LargeButton style={{ marginTop: '20px', alignSelf: 'flex-end' }} onClick={() => { console.log(editor.getHTML()); }}>
        <span>Publish</span>
      </LargeButton>
    </div>
  );
};

export default PostEditor;
