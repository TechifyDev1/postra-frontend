'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/contexts/ToastContext';
import { deletePostUrl, getAuthHeaders } from '@/lib/api/client';

interface ProfileArticleCardProps {
  date: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image?: string;
  featured?: boolean;
  slug?: string;
  username?: string;
  isOwner?: boolean;
}

export const ProfileArticleCard = ({
  date,
  title,
  excerpt,
  category,
  readTime,
  image,
  featured = false,
  slug,
  username,
  isOwner = false,
}: ProfileArticleCardProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (slug) {
      router.push(`/edit/${slug}`);
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    if (!slug) return;

    setIsDeleting(true);
    try {
      const res = await fetch(deletePostUrl(slug), {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (res.ok) {
        showToast('Post deleted successfully', 'success');
        router.refresh();
      } else {
        throw new Error('Failed to delete post');
      }
    } catch (error) {
      showToast('Failed to delete post', 'error');
    } finally {
      setIsDeleting(false);
      setShowMenu(false);
    }
  };

  const articleLink = slug && username ? `/${username}/${slug}` : '#';

  if (featured && image) {
    return (
      <Link href={articleLink}>
        <article className="border border-zinc-200 flex flex-col md:flex-row group hover:bg-zinc-50 transition-colors duration-300 relative">
          {isOwner && slug && (
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowMenu(!showMenu);
                }}
                className="bg-white border border-zinc-300 p-2 rounded hover:bg-zinc-100 transition-colors"
                aria-label="Post options"
              >
                <svg className="w-5 h-5 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>

              {showMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowMenu(false);
                    }}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-zinc-200 shadow-lg rounded z-50">
                    <button
                      onClick={handleEdit}
                      className="w-full text-left px-4 py-3 text-sm text-black hover:bg-zinc-100 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit Post
                    </button>
                    <button
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      {isDeleting ? 'Deleting...' : 'Delete Post'}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          <div className="w-full md:w-1/2 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-zinc-200">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">{date}</span>
              </div>
              <h2 className="text-4xl font-medium leading-tight tracking-tight text-black mb-4 group-hover:underline underline-offset-4 decoration-1">
                {title}
              </h2>
              <p className="text-base text-zinc-600 line-clamp-4 leading-relaxed">{excerpt}</p>
            </div>
            <div className="mt-8 pt-4 border-t border-zinc-200 flex items-center justify-between">
              <span className="text-xs text-black uppercase tracking-widest font-semibold">{category}</span>
              <span className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">{readTime}</span>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden bg-zinc-100">
            <Image
              src={image}
              alt={title}
              width={600}
              height={400}
              className="w-full h-full object-cover grayscale opacity-90 transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={articleLink}>
      <article className="border border-zinc-200 p-6 flex flex-col justify-between group hover:bg-zinc-50 transition-colors duration-300 relative">
        {isOwner && slug && (
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="bg-white border border-zinc-300 p-2 rounded hover:bg-zinc-100 transition-colors"
              aria-label="Post options"
            >
              <svg className="w-5 h-5 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>

            {showMenu && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowMenu(false);
                  }}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white border border-zinc-200 shadow-lg rounded z-50">
                  <button
                    onClick={handleEdit}
                    className="w-full text-left px-4 py-3 text-sm text-black hover:bg-zinc-100 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Post
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    {isDeleting ? 'Deleting...' : 'Delete Post'}
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        <div>
          <span className="text-xs text-zinc-500 block mb-4 uppercase tracking-widest font-semibold">{date}</span>
          <h3 className="text-3xl font-medium text-black mb-2 group-hover:underline underline-offset-4 decoration-1">
            {title}
          </h3>
          <p className="text-base text-zinc-600 line-clamp-3 leading-relaxed">{excerpt}</p>
        </div>
        <div className="mt-8 flex items-center justify-between">
          <span className="text-xs text-black uppercase tracking-widest font-semibold">{category}</span>
          <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </article>
    </Link>
  );
};
