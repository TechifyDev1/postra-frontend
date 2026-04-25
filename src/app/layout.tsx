import type { Metadata } from 'next';
import { Inter, Newsreader } from 'next/font/google';
import '@/styles/global.css';
import { ReactNode } from 'react';
import { ToastProvider } from '@/contexts/ToastContext';
import { UserProvider } from '@/providers/UserProvider';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  weight: ['400', '600'],
});

const newsreader = Newsreader({ 
  subsets: ['latin'], 
  variable: '--font-newsreader',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Postra - Editorial Minimalism',
  description: 'A sanctuary for writers and readers who value clarity above all else. No noise, just words.',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className={`${inter.variable} ${newsreader.variable} font-sans antialiased bg-[#fbf9f9] text-black`}>
        <UserProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </UserProvider>
      </body>
    </html>
  );
}
