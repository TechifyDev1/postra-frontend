'use client';

import Link from 'next/link';
import { useState } from 'react';

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white w-full top-0 border-b border-zinc-200 z-50 sticky">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
        <Link 
          href="/" 
          className="text-2xl font-black tracking-tighter text-black hover:opacity-70 transition-all duration-200 active:scale-95"
        >
          Postra
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 font-serif font-medium uppercase tracking-widest text-[11px]">
          <Link 
            href="/new" 
            className="text-zinc-700 hover:text-black pb-1 hover:opacity-70 transition-all duration-200 active:scale-95"
          >
            Write
          </Link>
          <Link 
            href="/signin" 
            className="text-zinc-700 hover:text-black pb-1 hover:opacity-70 transition-all duration-200 active:scale-95"
          >
            Sign In
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/signup">
            <button className="hidden md:block border border-black text-black px-4 py-2 text-xs uppercase tracking-widest font-semibold hover:bg-black hover:text-white transition-colors">
              Get Started
            </button>
          </Link>
          <button 
            className="md:hidden text-black"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};
