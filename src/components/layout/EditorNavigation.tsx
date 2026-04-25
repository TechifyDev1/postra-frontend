'use client';

import Link from 'next/link';

interface EditorNavigationProps {
  onSave?: () => void;
  onPublish?: () => void;
  isSaving?: boolean;
  isPublishing?: boolean;
}

export const EditorNavigation = ({ 
  onSave, 
  onPublish, 
  isSaving = false, 
  isPublishing = false 
}: EditorNavigationProps) => {
  return (
    <header className="bg-white text-black fixed w-full top-0 border-b border-zinc-200 z-50">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-[1200px] mx-auto">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-black">
          Postra
        </Link>

        <div className="flex items-center space-x-6">
          <button 
            onClick={onSave}
            disabled={isSaving}
            className="text-xs border border-black px-4 py-2 hover:bg-zinc-100 transition-colors duration-200 uppercase tracking-widest font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          <button 
            onClick={onPublish}
            disabled={isPublishing}
            className="text-xs bg-black text-white px-4 py-2 hover:opacity-80 transition-opacity duration-200 uppercase tracking-widest font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPublishing ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>
    </header>
  );
};
