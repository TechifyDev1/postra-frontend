'use client';

import { SettingsSidebar } from '@/components/layout/SettingsSidebar';
import { useRequireAuth } from '@/hooks';
import Link from 'next/link';

export default function SecurityPage() {
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
      <SettingsSidebar activeTab="security" />

      <main className="flex-grow flex flex-col items-center justify-center p-16">
        <div className="text-center max-w-md">
          <svg className="w-24 h-24 mx-auto mb-8 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h1 className="text-4xl font-medium mb-4 text-black">Coming Soon</h1>
          <p className="text-lg text-zinc-600 mb-8">
            Security settings and password management will be available soon.
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
