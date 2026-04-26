'use client';

import { SettingsSidebar } from '@/components/layout/SettingsSidebar';
import { useRequireAuth } from '@/hooks';
import Link from 'next/link';

export default function AnalyticsPage() {
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
      <SettingsSidebar activeTab="analytics" />

      <main className="flex-grow flex flex-col items-center justify-center p-16">
        <div className="text-center max-w-md">
          <svg className="w-24 h-24 mx-auto mb-8 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h1 className="text-4xl font-medium mb-4 text-black">Coming Soon</h1>
          <p className="text-lg text-zinc-600 mb-8">
            Analytics and insights for your stories are on the way.
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
