'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useUserContext } from '@/hooks/useUserContext';
import { DefaultAvatar } from '@/components/ui/DefaultAvatar';

export const ArticleNavigation = () => {
  const { user, isLoading } = useUserContext();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch and flickering
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render auth-dependent content until mounted and loaded
  const showContent = mounted && !isLoading;

  return (
    <header className="bg-white text-black antialiased w-full top-0 border-b border-zinc-200 sticky z-50">
      <div className="flex justify-between items-center w-full px-6 md:px-12 h-16 max-w-[1440px] mx-auto">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-2xl font-black tracking-tighter text-black">
            POSTRA
          </Link>
          {showContent && user && (
            <nav className="hidden md:flex items-center gap-6 ml-8">
              <Link href="/home" className="text-black border-b-2 border-black pb-1 hover:text-black transition-colors duration-200">
                Home
              </Link>
              <Link href="/coming-soon" className="text-zinc-500 font-medium hover:text-black transition-colors duration-200">
                Search
              </Link>
              <Link href={`/${user.username}`} className="text-zinc-500 font-medium hover:text-black transition-colors duration-200">
                Profile
              </Link>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-6">
          {!showContent ? (
            // Show minimal placeholder during loading to prevent layout shift
            <div className="w-32 h-9"></div>
          ) : user ? (
            <>
              <Link href="/coming-soon">
                <button aria-label="Search" className="text-zinc-500 hover:text-black transition-colors duration-200 hidden md:block">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </Link>
              <Link href="/new" className="bg-black text-white text-xs px-4 py-2 uppercase tracking-widest hover:opacity-90 transition-opacity font-semibold">
                Write
              </Link>
              <Link href={`/${user.username}`}>
                <div className="w-8 h-8 rounded-full border border-zinc-200 bg-zinc-100 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity relative">
                  {user.profilePictureUrl ? (
                    <Image
                      src={user.profilePictureUrl}
                      alt={user.fullName}
                      fill
                      sizes="32px"
                      className="object-cover grayscale"
                    />
                  ) : (
                    <DefaultAvatar size={32} />
                  )}
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link href="/signin" className="text-xs text-black uppercase tracking-widest hidden sm:block hover:text-black transition-colors duration-200 font-semibold">
                Sign In
              </Link>
              <Link href="/signup" className="bg-black text-white text-xs px-4 py-2 uppercase tracking-widest hover:opacity-90 transition-opacity font-semibold">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
