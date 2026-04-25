'use client';

import { PostEditor } from '@/components/ui/PostEditor';
import { useRequireAuth } from '@/hooks';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getAuthHeaders } from '@/lib/api/client';

export default function EditPostPage() {
  const { isLoading } = useRequireAuth();
  const params = useParams();
  const slug = params.slug as string;
  const [postData, setPostData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Get current user to extract username
        const token = localStorage.getItem('token');
        if (!token) return;

        const payload = JSON.parse(atob(token.split('.')[1]));
        const username = payload.sub || payload.username;

        // Fetch the post
        const res = await fetch(`https://postra-backend.onrender.com/api/posts/${username}/${slug}`, {
          headers: getAuthHeaders(),
        });

        if (res.ok) {
          const post = await res.json();
          setPostData({
            title: post.title,
            subTitle: post.subTitle,
            content: post.content,
            postBanner: post.postBanner,
          });
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (isLoading || loading) {
    return (
      <div className="bg-white text-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm text-zinc-600 uppercase tracking-widest">Loading...</p>
        </div>
      </div>
    );
  }

  if (!postData) {
    return (
      <div className="bg-white text-black min-h-screen flex items-center justify-center">
        <p className="text-zinc-600">Post not found</p>
      </div>
    );
  }

  return (
    <div className="bg-white text-black min-h-screen flex flex-col antialiased">
      <PostEditor edit={true} initialData={postData} postSlug={slug} />
    </div>
  );
}
