'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/hooks/useUserContext';
import { useToast } from '@/contexts/ToastContext';
import { clearAuth } from '@/lib/auth/authGuard';
import { DefaultAvatar } from '@/components/ui/DefaultAvatar';

export const HomeNavigation = () => {
  const { user, isLoading, setUser } = useUserContext();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { showToast } = useToast();

  // Prevent hydration mismatch and flickering
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  const handleLogout = () => {
    clearAuth();
    setUser(null);
    setShowUserMenu(false);
    showToast('Logged out successfully', 'success');
    router.push('/');
  };

  // Don't render auth-dependent content until mounted and loaded
  const showContent = mounted && !isLoading;

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
          
          {showContent && user && (
            <nav className="hidden md:flex items-center gap-6">
              <Link 
                href="/home" 
                className="text-black border-b-2 border-black pb-1 text-base hover:text-black transition-colors duration-200"
              >
                Home
              </Link>
              <Link 
                href="/coming-soon" 
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
          {!showContent ? (
            // Show minimal placeholder during loading to prevent layout shift
            <div className="w-32 h-9"></div>
          ) : user ? (
            <>
              <Link href="/coming-soon">
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
              
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="w-8 h-8 rounded-full border border-zinc-200 bg-zinc-100 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity relative"
                >
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
                </button>

                {/* User Menu Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-zinc-200 shadow-lg rounded z-50">
                    <div className="px-4 py-3 border-b border-zinc-200">
                      <p className="text-sm font-semibold text-black">{user.fullName}</p>
                      <p className="text-xs text-zinc-500">@{user.username}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        href={`/${user.username}`}
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-2 text-sm text-black hover:bg-zinc-100 transition-colors"
                      >
                        View Profile
                      </Link>
                      <Link
                        href="/settings"
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-2 text-sm text-black hover:bg-zinc-100 transition-colors"
                      >
                        Settings
                      </Link>
                      <Link
                        href="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-2 text-sm text-black hover:bg-zinc-100 transition-colors"
                      >
                        My Stories
                      </Link>
                    </div>
                    <div className="border-t border-zinc-200 py-1">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-black hover:bg-zinc-100 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
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
