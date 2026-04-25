import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="antialiased min-h-screen flex flex-col selection:bg-black selection:text-white">
      <Navigation />
      
      <main className="flex-grow flex flex-col items-center justify-center w-full px-6 py-32">
        <div className="max-w-[720px] mx-auto text-center">
          <div className="text-9xl font-black text-zinc-200 mb-4">404</div>
          <h1 className="text-6xl font-semibold leading-tight tracking-tight text-black mb-8">
            Page Not Found
          </h1>
          <p className="text-xl leading-relaxed text-zinc-600 mb-12">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/">
              <button className="bg-black text-white px-8 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-zinc-800 transition-colors">
                Go Home
              </button>
            </Link>
            <Link href="/home">
              <button className="border border-black text-black px-8 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-black hover:text-white transition-colors">
                Browse Stories
              </button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
