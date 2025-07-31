'use client';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import style from './page.module.css';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';

export default function Page() {
    const theme = {}
    const onError = (error: Error) => {
        console.error('An error occurred:', error);
    }
    const initialConfig = {
        namespace: "My App",
        theme,
        onError
    }
    return (
        <LexicalComposer initialConfig={initialConfig}>
            <RichTextPlugin
                contentEditable={
                    <ContentEditable aria-placeholder='Enter some text' placeholder={<div>Enter Some Text</div>} />
                } 
                ErrorBoundary={
                    LexicalErrorBoundary
                }
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
        </LexicalComposer>
    );
}