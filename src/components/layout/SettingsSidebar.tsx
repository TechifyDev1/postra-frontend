'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useUserContext } from '@/hooks/useUserContext';
import { DefaultAvatar } from '@/components/ui/DefaultAvatar';

interface SettingsSidebarProps {
  activeTab?: 'overview' | 'analytics' | 'followers' | 'security';
}

export const SettingsSidebar = ({ activeTab = 'overview' }: SettingsSidebarProps) => {
  const { user } = useUserContext();

  return (
    <nav className="hidden md:flex flex-col w-64 h-screen sticky top-0 bg-white border-r border-zinc-100 transition-all duration-300">
      <div className="p-6 border-b border-zinc-100">
        <h1 className="font-black uppercase text-xl mb-6">POSTRA</h1>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex-shrink-0 aspect-square rounded-full overflow-hidden bg-zinc-200 relative">
            {user?.profilePictureUrl ? (
              <Image
                src={user.profilePictureUrl}
                alt={user.fullName}
                fill
                sizes="48px"
                className="object-cover grayscale"
              />
            ) : (
              <DefaultAvatar size={48} />
            )}
          </div>
          <div>
            <div className="text-lg leading-tight font-medium">Profile Settings</div>
            <div className="text-xs text-zinc-500 mt-1 uppercase tracking-widest font-semibold">Manage your presence</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-grow py-4">
        <Link
          href="/settings"
          className={`flex items-center gap-3 px-4 py-2 mb-1 transition-colors duration-200 ${
            activeTab === 'overview'
              ? 'bg-black text-white font-bold'
              : 'text-zinc-500 hover:bg-zinc-100'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span>Overview</span>
        </Link>

        <Link
          href="/settings/analytics"
          className={`flex items-center gap-3 px-4 py-2 mb-1 transition-colors duration-200 ${
            activeTab === 'analytics'
              ? 'bg-black text-white font-bold'
              : 'text-zinc-500 hover:bg-zinc-100'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span>Analytics</span>
        </Link>

        <Link
          href="/settings/followers"
          className={`flex items-center gap-3 px-4 py-2 mb-1 transition-colors duration-200 ${
            activeTab === 'followers'
              ? 'bg-black text-white font-bold'
              : 'text-zinc-500 hover:bg-zinc-100'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>Followers</span>
        </Link>

        <Link
          href="/settings/security"
          className={`flex items-center gap-3 px-4 py-2 mb-1 transition-colors duration-200 ${
            activeTab === 'security'
              ? 'bg-black text-white font-bold'
              : 'text-zinc-500 hover:bg-zinc-100'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Security</span>
        </Link>
      </div>
    </nav>
  );
};
