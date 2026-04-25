'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useUserContext } from '@/hooks/useUserContext';
import { DefaultAvatar } from '@/components/ui/DefaultAvatar';

export const HomeNavigation = () => {
  const { user, isLoading } = useUserContext();

  return (
    <header className="bg-white w-full top-0 border-b border-zinc-200 sticky z-50">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <Link 
            href="/" 
            className="text-2xl font-bold tracking-tighter text-black uppercase font-serif"
          >
            Postra
          </Link>
          
          {user && (
            <nav className="hidden md:flex items-center gap-6">
              <Link 
                href="/home" 
                className="text-black border-b-2 border-black pb-1 text-base hover:text-black transition-colors duration-200"
              >
                Home
              </Link>
              <Link 
                href="/search" 
                className="text-zinc-500 text-base hover:text-black transition-colors duration-200"
              >
                Search
              </Link>
              <Link 
                href={`/${user.username}`}
                className="text-zinc-500 text-base hover:text-black transition-colors duration-200"
              >
                Profile
              </Link>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/search">
                <button className="flex items-center gap-2 text-zinc-500 hover:text-black transition-colors duration-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </Link>
              
              <Link href="/new">
                <button className="bg-black text-white text-xs px-4 py-2 uppercase tracking-widest hover:bg-zinc-800 transition-colors duration-200 font-semibold">
                  Write
                </button>
              </Link>
              
              <button className="flex items-center gap-2 text-zinc-500 hover:text-black transition-colors duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              
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
              <Link href="/signin">
                <button className="text-black text-xs px-4 py-2 uppercase tracking-widest hover:text-zinc-600 transition-colors duration-200 font-semibold">
                  Sign In
                </button>
              </Link>
              <Link href="/signup">
                <button className="bg-black text-white text-xs px-4 py-2 uppercase tracking-widest hover:bg-zinc-800 transition-colors duration-200 font-semibold">
                  Get Started
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
