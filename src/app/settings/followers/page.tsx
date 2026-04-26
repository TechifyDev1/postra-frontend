'use client';

import { SettingsSidebar } from '@/components/layout/SettingsSidebar';
import { useRequireAuth } from '@/hooks';
import Link from 'next/link';

export default function FollowersPage() {
  const { isLoading } = useRequireAuth();

  if (isLoading) {
    return (
      <div className="bg-[#fbf9f9] text-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm text-zinc-600 uppercase tracking-widest">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fbf9f9] text-black antialiased min-h-screen flex flex-col md:flex-row">
      <SettingsSidebar activeTab="followers" />

      <main className="flex-grow flex flex-col items-center justify-center p-16">
        <div className="text-center max-w-md">
          <svg className="w-24 h-24 mx-auto mb-8 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h1 className="text-4xl font-medium mb-4 text-black">Coming Soon</h1>
          <p className="text-lg text-zinc-600 mb-8">
            Manage your followers and following lists here.
          </p>
          <Link
            href="/settings"
            className="inline-block bg-black text-white text-xs px-8 py-4 hover:bg-zinc-800 transition-colors uppercase tracking-widest font-semibold"
          >
            Back to Settings
          </Link>
        </div>
      </main>
    </div>
  );
}
