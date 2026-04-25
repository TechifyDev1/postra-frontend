'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/contexts/ToastContext';
import { useUserContext } from '@/hooks/useUserContext';
import { publishPostUrl, signUrl, deleteUrl, getAuthHeaders } from '@/lib/api/client';
import { EditorNavigation } from '@/components/layout/EditorNavigation';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

interface PostEditorProps {
  edit?: boolean;
  initialData?: {
    title: string;
    subTitle: string;
    content: string;
    postBanner: string;
  };
  postSlug?: string;
}

export const PostEditor = ({ edit = false, initialData, postSlug }: PostEditorProps) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [subTitle, setSubTitle] = useState(initialData?.subTitle || '');
  const [postBannerUrl, setPostBannerUrl] = useState(initialData?.postBanner || '');
  const [postBannerId, setPostBannerId] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showBlockTypeMenu, setShowBlockTypeMenu] = useState(false);
  const imgInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();
  const { user } = useUserContext();
  const router = useRouter();

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Image.configure({
        inline: true,
        HTMLAttributes: {
          class: 'editor-image',
        },
      }),
      Placeholder.configure({
        placeholder: 'Tell your story...',
      }),
    ],
    content: initialData?.content || '',
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[400px]',
      },
    },
  });

  const handleImageUpload = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!imgInputRef.current) return reject('No input found');
      
      imgInputRef.current.click();
      
      imgInputRef.current.onchange = async (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (!target.files?.length) return reject('No file selected');
        
        const file = target.files[0];
        if (file.size > MAX_FILE_SIZE) {
          showToast('File size exceeds 5MB', 'error');
          return reject('File size exceeds 5MB');
        }

        showToast('Uploading image...', 'info');

        try {
          const timestamp = Math.round(new Date().getTime() / 1000);
          const paramsToSign = { timestamp };

          const signRes = await fetch(signUrl(), {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(paramsToSign),
          });

          if (!signRes.ok) {
            throw new Error('Unable to generate signed URL');
          }

          const signData = await signRes.json();
          const { signature } = signData.data;

          const formData = new FormData();
          formData.append('file', file);
          formData.append('api_key', '544934933231257');
          formData.append('timestamp', timestamp.toString());
          formData.append('signature', signature);

          const uploadRes = await fetch('https://api.cloudinary.com/v1_1/dvpkp0u9u/image/upload', {
            method: 'POST',
            body: formData,
          });

          if (!uploadRes.ok) {
            throw new Error('Upload failed');
          }

          const data = await uploadRes.json();
          imgInputRef.current!.value = '';
          showToast('Image uploaded successfully', 'success');
          return resolve(data.secure_url);
        } catch (err) {
          showToast('Unable to upload image', 'error');
          return reject(err);
        }
      };
    });
  };

  const handleBannerUpload = async () => {
    if (!imgInputRef.current) return;
    
    imgInputRef.current.click();
    
    imgInputRef.current.onchange = async (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (!target.files?.length) return;
      
      const file = target.files[0];
      if (file.size > MAX_FILE_SIZE) {
        showToast('File size exceeds 5MB', 'error');
        return;
      }

      showToast('Uploading banner...', 'info');

      try {
        const timestamp = Math.round(new Date().getTime() / 1000);
        const paramsToSign = { timestamp };

        const signRes = await fetch(signUrl(), {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(paramsToSign),
        });

        if (!signRes.ok) {
          throw new Error('Unable to generate signed URL');
        }

        const signData = await signRes.json();
        const { signature } = signData.data;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('api_key', '544934933231257');
        formData.append('timestamp', timestamp.toString());
        formData.append('signature', signature);

        const uploadRes = await fetch('https://api.cloudinary.com/v1_1/dvpkp0u9u/image/upload', {
          method: 'POST',
          body: formData,
        });

        if (!uploadRes.ok) {
          throw new Error('Upload failed');
        }

        const data = await uploadRes.json();
        setPostBannerUrl(data.secure_url);
        setPostBannerId(data.public_id);
        imgInputRef.current!.value = '';
        showToast('Banner uploaded successfully', 'success');
      } catch (err) {
        showToast('Failed to upload banner', 'error');
      }
    };
  };

  const handleBannerRemove = async () => {
    setIsDeleting(true);

    if (postBannerId) {
      showToast('Removing banner...', 'info');
      try {
        const res = await fetch(deleteUrl(postBannerId), {
          method: 'DELETE',
          headers: getAuthHeaders(),
        });

        if (res.ok) {
          showToast('Banner deleted', 'success');
        }
      } catch (err) {
        console.error('Error deleting banner:', err);
      }
    }

    setPostBannerUrl('');
    setPostBannerId('');
    if (imgInputRef.current) {
      imgInputRef.current.value = '';
    }
    setIsDeleting(false);
  };

  const handleSave = async () => {
    if (isSaving) return;

    if (!editor) {
      showToast('Editor not ready', 'error');
      return;
    }

    if (title.trim().length === 0) {
      showToast('Title cannot be empty', 'error');
      return;
    }

    setIsSaving(true);
    showToast('Saving draft...', 'info');

    // For now, just save to localStorage as a draft
    try {
      const draft = {
        title: title.trim(),
        subTitle: subTitle.trim(),
        content: editor.getHTML(),
        postBanner: postBannerUrl,
        savedAt: new Date().toISOString(),
      };

      localStorage.setItem('post_draft', JSON.stringify(draft));
      showToast('Draft saved successfully', 'success');
    } catch (err) {
      showToast('Failed to save draft', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (isPublishing) return;

    if (!editor) {
      showToast('Editor not ready', 'error');
      return;
    }

    if (editor.isEmpty) {
      showToast('Cannot publish empty post', 'error');
      return;
    }

    if (title.trim().length === 0) {
      showToast('Title cannot be empty', 'error');
      return;
    }

    setIsPublishing(true);
    showToast(edit ? 'Updating your post...' : 'Publishing your post...', 'info');

    try {
      const url = edit && postSlug 
        ? `${publishPostUrl.replace('/create', `/update/${postSlug}`)}`
        : publishPostUrl;

      const res = await fetch(url, {
        method: edit ? 'PUT' : 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          title: title.trim(),
          postBanner: postBannerUrl,
          subTitle: subTitle.trim(),
          content: editor.getHTML(),
        }),
      });

      if (!res.ok) {
        throw new Error(edit ? 'Failed to update post' : 'Failed to publish post');
      }

      const post = await res.json();
      showToast(edit ? 'Post updated successfully' : 'Post published successfully', 'success');

      if (!edit) {
        editor.commands.clearContent();
        setTitle('');
        setSubTitle('');
        setPostBannerUrl('');
        setPostBannerId('');
      }

      router.push(`/${post.authorUsername}/${post.slug}`);
    } catch (err) {
      if (err instanceof Error) {
        showToast(err.message, 'error');
      }
    } finally {
      setIsPublishing(false);
    }
  };

  if (!editor) return null;

  // Get current block type
  const getCurrentBlockType = () => {
    if (editor.isActive('heading', { level: 1 })) return 'H1';
    if (editor.isActive('heading', { level: 2 })) return 'H2';
    if (editor.isActive('heading', { level: 3 })) return 'H3';
    if (editor.isActive('blockquote')) return 'Quote';
    return 'Paragraph';
  };

  const setBlockType = (type: string) => {
    switch (type) {
      case 'H1':
        editor.chain().focus().toggleHeading({ level: 1 }).run();
        showToast('H1 heading applied', 'info');
        break;
      case 'H2':
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        showToast('H2 heading applied', 'info');
        break;
      case 'H3':
        editor.chain().focus().toggleHeading({ level: 3 }).run();
        showToast('H3 heading applied', 'info');
        break;
      case 'Quote':
        editor.chain().focus().toggleBlockquote().run();
        showToast('Quote formatting applied', 'info');
        break;
      case 'Paragraph':
        editor.chain().focus().setParagraph().run();
        showToast('Paragraph formatting applied', 'info');
        break;
    }
    setShowBlockTypeMenu(false);
  };

  return (
    <>
      <EditorNavigation 
        onSave={handleSave}
        onPublish={handlePublish}
        isSaving={isSaving}
        isPublishing={isPublishing}
      />
      
      <main className="flex-grow pt-[88px] pb-32 flex justify-center">
      <input 
        type="file" 
        accept="image/*" 
        style={{ display: 'none' }} 
        ref={imgInputRef} 
      />

      <article className="w-full max-w-[720px] px-6 md:px-0 mx-12 mt-16">
        {/* Banner Upload */}
        <div 
          className="relative w-full aspect-video mb-12 border-2 border-dashed border-zinc-300 hover:border-black transition-colors cursor-pointer overflow-hidden group rounded"
          onClick={postBannerUrl ? undefined : handleBannerUpload}
        >
          {postBannerUrl ? (
            <>
              <img 
                src={postBannerUrl} 
                alt="Post banner" 
                className="w-full h-full object-cover grayscale"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleBannerRemove();
                }}
                disabled={isDeleting}
                className="absolute top-4 right-4 bg-black text-white p-2 rounded-full hover:bg-zinc-800 transition-colors disabled:opacity-50"
                aria-label="Remove banner"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-zinc-400 group-hover:text-black transition-colors">
              <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs uppercase tracking-widest font-semibold">Add Banner Image</span>
            </div>
          )}
        </div>

        {/* Title Input */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-transparent border-0 border-b-2 border-zinc-200 focus:border-black text-6xl font-semibold text-black placeholder-zinc-400 pb-4 mb-6 rounded-none px-0 leading-tight tracking-tight transition-colors font-serif"
          placeholder="Title"
          style={{ outline: 'none', boxShadow: 'none' }}
        />

        {/* Subtitle Input */}
        <input
          type="text"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          className="w-full bg-transparent border-0 border-b border-zinc-200 focus:border-black text-2xl text-zinc-600 placeholder-zinc-400 pb-4 mb-12 rounded-none px-0 leading-relaxed italic font-serif transition-colors"
          placeholder="Subtitle (optional)"
          style={{ outline: 'none', boxShadow: 'none' }}
        />

        {/* Author Info */}
        {user && (
          <div className="flex items-center justify-between mb-12 pb-4 border-b border-zinc-200">
            <div className="text-xs text-zinc-600 uppercase tracking-widest font-semibold">
              {user.fullName}
            </div>
            <div className="text-xs text-zinc-600 uppercase tracking-widest font-semibold">
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }).toUpperCase()}
            </div>
          </div>
        )}

        {/* Editor Content */}
        <EditorContent editor={editor} />
      </article>

      {/* Floating Formatting Toolbar */}
      <div className="fixed bottom-12 left-1/2 transform -translate-x-1/2 bg-white border border-zinc-300 flex items-center px-4 py-2 space-x-2 shadow-lg z-50 rounded">
        {/* Block Type Selector */}
        <div className="relative">
          <button
            onClick={() => setShowBlockTypeMenu(!showBlockTypeMenu)}
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-zinc-100 transition-colors text-zinc-800 font-semibold min-w-[120px] justify-between"
            aria-label="Select block type"
          >
            <span className="text-sm">{getCurrentBlockType()}</span>
            <svg className={`w-4 h-4 transition-transform ${showBlockTypeMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {/* Dropdown Menu - appears above */}
          {showBlockTypeMenu && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowBlockTypeMenu(false)}
              />
              <div className="absolute bottom-full mb-2 left-0 bg-white border border-zinc-300 rounded shadow-xl py-1 min-w-[140px] z-50">
                {['Paragraph', 'H1', 'H2', 'H3', 'Quote'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setBlockType(type)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-zinc-100 transition-colors ${
                      getCurrentBlockType() === type ? 'bg-zinc-100 font-semibold' : ''
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="w-px h-6 bg-zinc-300" />
        
        <button
          onClick={() => {
            editor.chain().focus().toggleBold().run();
            showToast('Bold formatting applied', 'info');
          }}
          className={`p-2 rounded hover:bg-zinc-100 transition-colors ${
            editor.isActive('bold') ? 'bg-black text-white hover:bg-zinc-800' : 'text-zinc-600'
          }`}
          title="Bold"
          aria-label="Bold"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" />
          </svg>
        </button>
        
        <button
          onClick={() => {
            editor.chain().focus().toggleItalic().run();
            showToast('Italic formatting applied', 'info');
          }}
          className={`p-2 rounded hover:bg-zinc-100 transition-colors ${
            editor.isActive('italic') ? 'bg-black text-white hover:bg-zinc-800' : 'text-zinc-600'
          }`}
          title="Italic"
          aria-label="Italic"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 4h4M14 4l-4 16M6 20h4" />
          </svg>
        </button>

        <button
          onClick={() => {
            editor.chain().focus().toggleCode().run();
            showToast('Code formatting applied', 'info');
          }}
          className={`p-2 rounded hover:bg-zinc-100 transition-colors ${
            editor.isActive('code') ? 'bg-black text-white hover:bg-zinc-800' : 'text-zinc-600'
          }`}
          title="Code"
          aria-label="Code"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </button>

        <div className="w-px h-6 bg-zinc-300" />

        <button
          onClick={() => {
            editor.chain().focus().toggleBulletList().run();
            showToast('Bullet list applied', 'info');
          }}
          className={`p-2 rounded hover:bg-zinc-100 transition-colors ${
            editor.isActive('bulletList') ? 'bg-black text-white hover:bg-zinc-800' : 'text-zinc-600'
          }`}
          title="Bullet List"
          aria-label="Bullet List"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <button
          onClick={() => {
            editor.chain().focus().toggleOrderedList().run();
            showToast('Numbered list applied', 'info');
          }}
          className={`p-2 rounded hover:bg-zinc-100 transition-colors ${
            editor.isActive('orderedList') ? 'bg-black text-white hover:bg-zinc-800' : 'text-zinc-600'
          }`}
          title="Numbered List"
          aria-label="Numbered List"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
        </button>

        <div className="w-px h-6 bg-zinc-300" />

        <button
          onClick={async () => {
            try {
              const url = await handleImageUpload();
              if (url) {
                editor.chain().focus().setImage({ src: url }).run();
                showToast('Image added to content', 'success');
              }
            } catch (err) {
              console.error('Image upload error:', err);
            }
          }}
          className="p-2 rounded hover:bg-zinc-100 transition-colors text-zinc-600"
          title="Add Image"
          aria-label="Add Image"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
      </main>
    </>
  );
};
