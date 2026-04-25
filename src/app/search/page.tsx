'use client';

import { HomeNavigation } from '@/components/layout/HomeNavigation';
import { MobileNav } from '@/components/layout/MobileNav';
import { SearchResultItem } from '@/components/ui/SearchResultItem';
import { useState } from 'react';

const searchResults = [
  {
    author: 'Eleanor Vance',
    date: 'Oct 12, 2023',
    title: 'The Brutalist Revival in Eastern Europe',
    excerpt: 'Exploring the resurgence of interest in monumental concrete structures and their evolving cultural significance in post-Soviet landscapes.',
  },
  {
    author: 'Julian Rossi',
    date: 'Sep 28, 2023',
    title: 'Invisible Cities: Designing for Density',
    excerpt: 'How contemporary urban planners are reimagining vertical living spaces to foster community without sacrificing privacy.',
  },
  {
    author: 'Maya Lin',
    date: 'Aug 04, 2023',
    title: 'Form Follows Function: A Rebuttal',
    excerpt: 'Challenging the modernist maxim and arguing for the inherent value of ornamentation in public spaces.',
  },
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('Architecture');
  const [activeTab, setActiveTab] = useState<'stories' | 'people' | 'topics'>('stories');

  return (
    <div className="bg-[#fbf9f9] text-black min-h-screen flex flex-col selection:bg-black selection:text-white antialiased">
      <HomeNavigation />

      <main className="flex-grow flex flex-col items-center pt-8 md:pt-16 pb-32 px-6 w-full max-w-[1200px] mx-auto">
        {/* Search Input Hero */}
        <section className="w-full max-w-[720px] mb-16">
          <div className="relative w-full border-b border-black pb-4 group">
            <svg 
              className="absolute left-0 bottom-4 w-8 h-8 text-black group-focus-within:opacity-50 transition-opacity" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Explore Postra"
              className="w-full bg-transparent border-none focus:ring-0 pl-12 pr-0 py-0 text-4xl font-medium leading-tight tracking-tight placeholder:text-zinc-400 focus:outline-none placeholder:font-light"
            />
          </div>
        </section>

        {/* Search Tabs */}
        <section className="w-full max-w-[720px] mb-8 flex justify-start border-b border-zinc-200">
          <button
            onClick={() => setActiveTab('stories')}
            className={`px-4 py-2 text-xs uppercase tracking-widest font-semibold ${
              activeTab === 'stories'
                ? 'text-black border-b-2 border-black'
                : 'text-zinc-500 hover:text-black transition-colors'
            }`}
          >
            Stories
          </button>
          <button
            onClick={() => setActiveTab('people')}
            className={`px-4 py-2 text-xs uppercase tracking-widest font-semibold ${
              activeTab === 'people'
                ? 'text-black border-b-2 border-black'
                : 'text-zinc-500 hover:text-black transition-colors'
            }`}
          >
            People
          </button>
          <button
            onClick={() => setActiveTab('topics')}
            className={`px-4 py-2 text-xs uppercase tracking-widest font-semibold ${
              activeTab === 'topics'
                ? 'text-black border-b-2 border-black'
                : 'text-zinc-500 hover:text-black transition-colors'
            }`}
          >
            Topics
          </button>
        </section>

        {/* Results Canvas - Stories */}
        <section className="w-full max-w-[720px] flex flex-col gap-8">
          {searchResults.map((result, index) => (
            <SearchResultItem key={index} {...result} />
          ))}
        </section>

        {/* Load More */}
        <div className="w-full max-w-[720px] flex justify-center mt-16">
          <button className="text-xs px-6 py-3 border border-zinc-400 text-zinc-600 hover:border-black hover:text-black transition-colors duration-200 uppercase tracking-widest font-semibold">
            Load More
          </button>
        </div>
      </main>

      <MobileNav activeTab="discover" />
    </div>
  );
}
