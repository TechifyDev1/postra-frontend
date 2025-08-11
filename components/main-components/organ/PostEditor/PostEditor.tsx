import { EditorContent, useEditor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import { Code, TextBolder, TextItalic } from "phosphor-react";
import { FC } from "react";
import style from "./PostEditor.module.css";

const PostEditor: FC = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello world</p>",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: style.editorContent,
      },
    },
  });

  if (!editor) return null;

  return (
    <div className={style.postEditor}>
      <div className={style.toolbar}>
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          <TextBolder />
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          <TextItalic />
        </button>
        <button onClick={() => editor.chain().focus().toggleCode().run()}>
          <Code />
        </button>
      </div>

      <EditorContent editor={editor} className={style.editorContent} />

      <BubbleMenu editor={editor}>
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          <TextBolder />
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          <TextItalic />
        </button>
        <button onClick={() => editor.chain().focus().toggleCode().run()}>
          <Code />
        </button>
      </BubbleMenu>
    </div>
  );
};

export default PostEditor;
