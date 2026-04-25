'use client';

import { PostEditor } from '@/components/ui/PostEditor';
import { useRequireAuth } from '@/hooks';

export default function NewPostPage() {
  const { isLoading } = useRequireAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="bg-white text-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm text-zinc-600 uppercase tracking-widest">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-black min-h-screen flex flex-col antialiased">
      <PostEditor />
    </div>
  );
}
