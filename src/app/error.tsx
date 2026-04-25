'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service (e.g., Sentry)
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="bg-[#fbf9f9] text-black min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-semibold mb-4 tracking-tight">Oops!</h1>
        <p className="text-xl text-zinc-600 mb-8">
          Something went wrong. We're working on fixing it.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-black text-white text-xs px-8 py-4 uppercase tracking-widest hover:bg-zinc-800 transition-colors font-semibold"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="border border-black text-black text-xs px-8 py-4 uppercase tracking-widest hover:bg-zinc-100 transition-colors font-semibold inline-flex items-center justify-center"
          >
            Go Home
          </Link>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8 text-left">
            <summary className="cursor-pointer text-sm text-zinc-500 hover:text-black">
              Error Details (Dev Only)
            </summary>
            <pre className="mt-4 p-4 bg-zinc-100 rounded text-xs overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
