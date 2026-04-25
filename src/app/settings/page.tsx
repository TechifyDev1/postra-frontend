'use client';

import { SettingsSidebar } from '@/components/layout/SettingsSidebar';
import { useState, FormEvent } from 'react';
import Link from 'next/link';

export default function EditProfilePage() {
  const [formData, setFormData] = useState({
    fullName: 'Avery Davis',
    username: '@averydavis',
    bio: 'Writer, editor, and observer. Exploring the intersection of design and narrative.',
    website: 'https://averydavis.work',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Save profile:', formData);
    // Handle save logic
  };

  return (
    <div className="bg-[#fbf9f9] text-black antialiased min-h-screen flex flex-col md:flex-row">
      <SettingsSidebar activeTab="overview" />

      <main className="flex-grow flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden flex justify-between items-center w-full px-8 py-6 bg-white text-black border-b border-zinc-200">
          <div className="text-2xl font-black tracking-tighter text-black">POSTRA</div>
          <div className="w-8 h-8 rounded-full bg-zinc-200" />
        </header>

        <div className="w-full max-w-[720px] mx-auto px-6 py-16 md:py-32 flex-grow">
          <div className="mb-8">
            <h2 className="text-4xl font-medium leading-tight tracking-tight text-black mb-2">Edit Profile</h2>
            <div className="h-px bg-zinc-200 w-full"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Profile Picture */}
            <div className="flex items-start gap-4">
              <div className="relative group">
                <div className="w-32 h-32 bg-zinc-200 border border-zinc-300" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col justify-center h-32">
                <label className="text-xs text-black cursor-pointer border border-black px-4 py-2 hover:bg-zinc-100 transition-colors inline-block text-center w-fit uppercase tracking-widest font-semibold">
                  CHANGE PHOTO
                  <input accept="image/*" className="hidden" type="file" />
                </label>
                <p className="text-base text-zinc-500 mt-2">JPG, GIF or PNG. Max size of 5MB.</p>
              </div>
            </div>

            {/* Fields */}
            <div className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="fullName" className="text-xs text-black mb-2 uppercase tracking-widest font-semibold">
                  FULL NAME
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="text-xl text-black bg-transparent border-0 border-b border-zinc-200 px-0 py-2 focus:ring-0 focus:outline-none focus:border-black focus:border-b-2 transition-colors"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="username" className="text-xs text-black mb-2 uppercase tracking-widest font-semibold">
                  USERNAME
                </label>
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="text-xl text-black bg-transparent border-0 border-b border-zinc-200 px-0 py-2 focus:ring-0 focus:outline-none focus:border-black focus:border-b-2 transition-colors"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="bio" className="text-xs text-black mb-2 uppercase tracking-widest font-semibold">
                  BIO
                </label>
                <textarea
                  id="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="text-base text-black bg-transparent border border-zinc-200 p-4 focus:ring-0 focus:outline-none focus:border-black focus:border-2 transition-colors resize-none"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="website" className="text-xs text-black mb-2 uppercase tracking-widest font-semibold">
                  WEBSITE
                </label>
                <input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="text-xl text-black bg-transparent border-0 border-b border-zinc-200 px-0 py-2 focus:ring-0 focus:outline-none focus:border-black focus:border-b-2 transition-colors"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex gap-4 border-t border-zinc-200">
              <button
                type="submit"
                className="bg-black text-white text-xs px-8 py-4 hover:bg-zinc-800 transition-colors uppercase tracking-widest font-semibold"
              >
                SAVE CHANGES
              </button>
              <Link
                href="/profile"
                className="bg-transparent text-black border border-black text-xs px-8 py-4 hover:bg-zinc-100 transition-colors uppercase tracking-widest font-semibold inline-flex items-center"
              >
                CANCEL
              </Link>
            </div>
          </form>
        </div>

        {/* Footer */}
        <footer className="w-full py-12 px-8 mt-20 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto bg-white text-black border-t border-zinc-200">
          <p className="text-sm italic font-serif">© 2024 Journal Editorial Platform. Built for the written word.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="text-zinc-400 hover:text-black text-sm italic font-serif opacity-80">
              Privacy
            </Link>
            <Link href="#" className="text-zinc-400 hover:text-black text-sm italic font-serif opacity-80">
              Terms
            </Link>
            <Link href="#" className="text-zinc-400 hover:text-black text-sm italic font-serif opacity-80">
              Archive
            </Link>
            <Link href="#" className="text-zinc-400 hover:text-black text-sm italic font-serif opacity-80">
              Contact
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
