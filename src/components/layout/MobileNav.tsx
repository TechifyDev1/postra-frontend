'use client';

import Link from 'next/link';
import { useUserContext } from '@/hooks/useUserContext';

interface MobileNavProps {
  activeTab?: 'home' | 'discover' | 'compose' | 'profile';
}

export const MobileNav = ({ activeTab = 'home' }: MobileNavProps) => {
  const { user } = useUserContext();

  if (!user) return null;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-white border-t border-zinc-200">
      <Link
        href="/home"
        className={`flex flex-col items-center justify-center ${
          activeTab === 'home' ? 'text-black font-bold' : 'text-zinc-400'
        } hover:text-black active:scale-95 transition-transform`}
      >
        <svg className="w-6 h-6 mb-1" fill={activeTab === 'home' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span className="text-[10px] uppercase tracking-[0.2em]">Home</span>
      </Link>

      <Link
        href="/search"
        className={`flex flex-col items-center justify-center ${
          activeTab === 'discover' ? 'text-black font-bold' : 'text-zinc-400'
        } hover:text-black active:scale-95 transition-transform`}
      >
        <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="text-[10px] uppercase tracking-[0.2em]">Discover</span>
      </Link>

      <Link
        href="/new"
        className={`flex flex-col items-center justify-center ${
          activeTab === 'compose' ? 'text-black font-bold' : 'text-zinc-400'
        } hover:text-black active:scale-95 transition-transform`}
      >
        <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        <span className="text-[10px] uppercase tracking-[0.2em]">Compose</span>
      </Link>

      <Link
        href={`/${user.username}`}
        className={`flex flex-col items-center justify-center ${
          activeTab === 'profile' ? 'text-black font-bold' : 'text-zinc-400'
        } hover:text-black active:scale-95 transition-transform`}
      >
        <svg className="w-6 h-6 mb-1" fill={activeTab === 'profile' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span className="text-[10px] uppercase tracking-[0.2em]">Profile</span>
      </Link>
    </nav>
  );
};
