'use client';

import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/contexts/ToastContext';
import { useUserContext } from '@/hooks/useUserContext';
import { useRequireAuth } from '@/hooks';
import { setAuthToken } from '@/lib/auth/authGuard';
import { loginUrl } from '@/lib/api/client';

export default function SignInPage() {
  // Redirect authenticated users to home
  const { isLoading } = useRequireAuth({ 
    redirectTo: '/home', 
    redirectIfAuthenticated: true 
  });

  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();
  const { refetchUser } = useUserContext();

  // Show loading state while checking authentication
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.password) {
      showToast('Password must be provided', 'error');
      setLoading(false);
      return;
    }

    if (!formData.usernameOrEmail) {
      showToast('Username or Email must be provided', 'error');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Client-Type': 'web',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Login failed');
      }

      const data = await res.json();
      
      showToast(data.message || 'Welcome back!', 'success');
      
      if (data.data && data.data.token) {
        // Store token using auth utilities
        setAuthToken(data.data.token);
        
        // Refetch user data
        await refetchUser();
        
        setTimeout(() => {
          router.push('/home');
          router.refresh();
        }, 500);
      }
    } catch (error) {
      showToast('Login failed, please try again', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fbf9f9] text-black min-h-screen flex flex-col antialiased selection:bg-black selection:text-white">
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-32 w-full">
        {/* Brand */}
        <div className="mb-16">
          <span className="text-4xl tracking-tighter text-black font-black">POSTRA</span>
        </div>

        <div className="w-full max-w-[400px] flex flex-col items-start">
          <h1 className="text-6xl font-semibold text-black mb-16 leading-tight tracking-tight">
            Welcome<br />Back
          </h1>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
            {/* Email Field */}
            <div className="flex flex-col gap-2 w-full relative group">
              <label 
                htmlFor="usernameOrEmail" 
                className="text-xs text-zinc-600 uppercase tracking-widest font-semibold"
              >
                Email or Username
              </label>
              <input
                id="usernameOrEmail"
                name="usernameOrEmail"
                type="text"
                required
                value={formData.usernameOrEmail}
                onChange={(e) => setFormData({ ...formData, usernameOrEmail: e.target.value })}
                placeholder="reader@example.com or username"
                className="w-full bg-transparent border-0 border-b border-zinc-300 text-black text-base py-2 px-0 focus:ring-0 focus:outline-none focus:border-black transition-colors placeholder:text-zinc-400"
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2 w-full relative group">
              <div className="flex justify-between items-end w-full">
                <label 
                  htmlFor="password" 
                  className="text-xs text-zinc-600 uppercase tracking-widest font-semibold"
                >
                  Password
                </label>
                <Link 
                  href="#" 
                  className="text-xs text-zinc-600 hover:text-black transition-colors uppercase tracking-widest font-semibold"
                >
                  Forgot?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-transparent border-0 border-b border-zinc-300 text-black text-base py-2 px-0 focus:ring-0 focus:outline-none focus:border-black transition-colors placeholder:text-zinc-400"
              />
            </div>

            {/* Primary Action */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white text-xs py-4 mt-4 hover:bg-zinc-800 active:bg-black transition-colors uppercase tracking-widest font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Secondary Actions */}
          <div className="mt-16 w-full flex flex-col gap-2 items-start pt-8 border-t border-zinc-200">
            <span className="text-base text-zinc-600">New to Postra?</span>
            <Link 
              href="/signup" 
              className="text-xs text-black uppercase tracking-widest border-b border-black pb-[2px] hover:text-zinc-600 hover:border-zinc-600 transition-colors font-semibold"
            >
              Create an account
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white w-full py-12 border-t border-zinc-200">
        <div className="flex flex-col items-center gap-6 w-full max-w-[720px] mx-auto px-4">
          <div className="text-black font-bold text-[10px] uppercase tracking-[0.2em]">POSTRA</div>
          <nav className="flex gap-6">
            <Link href="#" className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 hover:text-black transition-all duration-300">
              Privacy
            </Link>
            <Link href="#" className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 hover:text-black transition-all duration-300">
              Terms
            </Link>
            <Link href="#" className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 hover:text-black transition-all duration-300">
              Archive
            </Link>
          </nav>
          <div className="text-black text-[10px] uppercase tracking-[0.2em]">
            © 2024 POSTRA. INK ON PAPER PHILOSOPHY.
          </div>
        </div>
      </footer>
    </div>
  );
}
