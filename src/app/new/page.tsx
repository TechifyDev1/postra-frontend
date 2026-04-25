'use client';

import { EditorNavigation } from '@/components/layout/EditorNavigation';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { FormattingToolbar } from '@/components/ui/FormattingToolbar';
import { useState } from 'react';

export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [progress] = useState(33); // Simulated progress

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).toUpperCase();

  return (
    <div className="bg-white text-black min-h-screen flex flex-col antialiased">
      <EditorNavigation />

      {/* Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[2px] bg-black z-[60] transition-all duration-300"
        style={{ width: `${progress}%` }}
      />

      <main className="flex-grow pt-[88px] pb-32 flex justify-center">
        <article className="w-full max-w-[720px] px-6 md:px-0 mx-12 mt-16">
          <ImageUpload />

          {/* Title Input */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent border-0 border-b border-zinc-200 focus:border-black text-6xl font-semibold text-black placeholder-zinc-400 pb-2 mb-8 rounded-none px-0 leading-tight tracking-tight"
            placeholder="Title"
            style={{ outline: 'none', boxShadow: 'none' }}
          />

          {/* Author & Date */}
          <div className="flex items-center justify-between mb-8 border-b border-zinc-200 pb-2">
            <div className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">
              AUTHOR NAME
            </div>
            <div className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">
              {currentDate}
            </div>
          </div>

          {/* Body Text Area */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-[614px] bg-transparent border-0 text-xl text-black placeholder-zinc-400 resize-none px-0 leading-relaxed"
            placeholder="Tell your story..."
            style={{ outline: 'none', boxShadow: 'none' }}
          />
        </article>
      </main>

      <FormattingToolbar />
    </div>
  );
}
