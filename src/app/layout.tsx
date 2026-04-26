import type { Metadata } from 'next';
import { Inter, Newsreader } from 'next/font/google';
import '@/styles/global.css';
import { ReactNode } from 'react';
import { ToastProvider } from '@/contexts/ToastContext';
import { UserProvider } from '@/providers/UserProvider';
import NextTopLoader from 'nextjs-toploader';

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://postra-frontend.vercel.app'),
  title: 'Postra - Editorial Minimalism',
  description: 'A sanctuary for writers and readers who value clarity above all else. No noise, just words.',
  icons: {
    icon: '/postra-logo.png',
    apple: '/postra-logo.png',
  },
  openGraph: {
    title: 'Postra - Editorial Minimalism',
    description: 'A sanctuary for writers and readers who value clarity above all else. No noise, just words.',
    images: ['/postra-banner.jpg'],
    type: 'website',
    siteName: 'Postra',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Postra - Editorial Minimalism',
    description: 'A sanctuary for writers and readers who value clarity above all else. No noise, just words.',
    images: ['/postra-banner.jpg'],
    site: '@postra',
    creator: '@postra',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className={`${inter.variable} ${newsreader.variable} font-sans antialiased bg-[#fbf9f9] text-black`}>
        <NextTopLoader 
          color="#000000"
          height={2}
          showSpinner={false}
          easing="ease"
          speed={200}
        />
        <UserProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </UserProvider>
      </body>
    </html>
  );
}
