'use client';

export const FormattingToolbar = () => {
  return (
    <div className="fixed bottom-12 left-1/2 transform -translate-x-1/2 bg-white border border-zinc-200 flex items-center px-4 py-2 space-x-4 shadow-sm z-50">
      <button aria-label="Bold" className="p-2 hover:bg-zinc-100 transition-colors text-black">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" />
        </svg>
      </button>
      
      <button aria-label="Italic" className="p-2 hover:bg-zinc-100 transition-colors text-black">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      </button>
      
      <div className="w-[1px] h-6 bg-zinc-200"></div>
      
      <button aria-label="Link" className="p-2 hover:bg-zinc-100 transition-colors text-black">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      </button>
      
      <div className="w-[1px] h-6 bg-zinc-200"></div>
      
      <button aria-label="Heading 1" className="p-2 hover:bg-zinc-100 transition-colors text-black font-bold text-sm">
        H1
      </button>
      
      <button aria-label="Quote" className="p-2 hover:bg-zinc-100 transition-colors text-black">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
    </div>
  );
};
