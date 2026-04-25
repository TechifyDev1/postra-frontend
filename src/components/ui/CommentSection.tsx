'use client';

import { useState, FormEvent, useEffect } from 'react';
import { getCommentsUrl, addCommentUrl, getAuthHeaders } from '@/lib/api/client';
import { useToast } from '@/contexts/ToastContext';

interface Comment {
  authorUsername: string;
  content: string;
  profilePictureUrl?: string;
}

interface CommentSectionProps {
  postSlug: string;
}

export const CommentSection = ({ postSlug }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    fetchComments();
  }, [postSlug]);

  const fetchComments = async () => {
    if (!postSlug) return;
    
    try {
      const res = await fetch(getCommentsUrl(postSlug), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      
      if (res.ok) {
        const fetchedComments = await res.json();
        setComments(fetchedComments || []);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    if (!token) {
      showToast('You must be logged in to comment', 'error');
      return;
    }

    const commentObject: Comment = {
      authorUsername: 'You',
      content: newComment,
    };

    // Optimistic update
    setComments([commentObject, ...comments]);
    setNewComment('');

    try {
      const res = await fetch(addCommentUrl(postSlug), {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify({ content: newComment }),
      });

      if (!res.ok) {
        throw new Error('Failed to add comment');
      }

      // Refetch to get real data
      await fetchComments();
    } catch (error) {
      // Revert optimistic update on error
      setComments(comments.filter(c => c !== commentObject));
      showToast('Failed to add comment', 'error');
      console.error('Error posting comment:', error);
    }
  };

  if (loading) {
    return (
      <section className="mt-16 pt-16 border-t border-zinc-200">
        <p className="text-zinc-500">Loading comments...</p>
      </section>
    );
  }

  return (
    <section className="mt-16 pt-16 border-t border-zinc-200">
      <h3 className="text-3xl font-medium mb-8">Comments ({comments.length})</h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-12">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts..."
          className="w-full bg-transparent border border-zinc-200 p-4 text-base text-black placeholder:text-zinc-400 resize-none focus:outline-none focus:border-black focus:border-2 transition-colors"
          rows={4}
        />
        <button
          type="submit"
          className="mt-4 bg-black text-white text-xs px-6 py-3 uppercase tracking-widest hover:bg-zinc-800 transition-colors font-semibold"
        >
          Post Comment
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-8">
        {comments.map((comment, index) => (
          <div key={`${comment.authorUsername}-${index}`} className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs text-zinc-600 uppercase tracking-widest font-semibold">
              <span className="text-black">{comment.authorUsername}</span>
            </div>
            <p className="text-base text-black leading-relaxed">{comment.content}</p>
          </div>
        ))}
        
        {comments.length === 0 && (
          <p className="text-zinc-500 text-center py-8">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </section>
  );
};
