import { FC } from "react";
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import style from './PostEditor.module.css';
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $getRoot, $getSelection, EditorState } from "lexical";

const PostEditor: FC = () => {
    const theme = {};
    const onError = (error: Error) => {
        console.error('An error occurred:', error);
    }
    const editorConfig = {
        namespace: "Postra Editor",
        theme,
        onError,
        nodes: [HeadingNode, QuoteNode],
    }
    return (
        <LexicalComposer initialConfig={editorConfig}>
            <div className={style.editorContainer}>
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable
                            className={style.editorInput}
                            aria-placeholder="Start Writing Your Post..."
                            placeholder={<div className={style.editorPlaceHolder}>Start Writing Your Post...</div>}
                        />
                    }
                    placeholder={<div className={style.editorPlaceHolder}>Start Writing Your Post...</div>}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin />
                <OnChangePlugin onChange={(editorState: EditorState) => {
                    editorState.read(() => {
                        const root = $getRoot();
                        const selection = $getSelection();
                        if (selection !== null) {
                            console.log('Current selection:', selection);
                        }
                        console.log('Current root:', root);
                        console.log('Editor state has changed');
                    })
                }} />
            </div>
        </LexicalComposer>
    );
}

export default PostEditor;