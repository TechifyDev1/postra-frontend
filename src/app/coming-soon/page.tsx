import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coming Soon | Postra',
  description: 'This feature is coming soon to Postra.',
};

export default function ComingSoonPage() {
  return (
    <div className="antialiased min-h-screen flex flex-col selection:bg-black selection:text-white">
      <Navigation />
      
      <main className="flex-grow flex flex-col items-center justify-center w-full px-6 py-32">
        <div className="max-w-[720px] mx-auto text-center">
          <h1 className="text-6xl font-semibold leading-tight tracking-tight text-black mb-8">
            Coming Soon
          </h1>
          <p className="text-xl leading-relaxed text-zinc-600 mb-12">
            We're working on something special. This feature will be available soon.
          </p>
          <Link href="/">
            <button className="border border-black text-black px-8 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-black hover:text-white transition-colors">
              Return Home
            </button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
