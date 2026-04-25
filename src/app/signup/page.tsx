'use client';

import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/contexts/ToastContext';
import { createUserUrl } from '@/lib/api/client';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!formData.password) {
      showToast('Password must be provided', 'error');
      setLoading(false);
      return;
    }

    if (!formData.username) {
      showToast("Username can't be blank", 'error');
      setLoading(false);
      return;
    }

    if (!formData.email) {
      showToast('Email must be provided', 'error');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match', 'error');
      setLoading(false);
      return;
    }

    if (!formData.fullName) {
      showToast('Your full name is required', 'error');
      setLoading(false);
      return;
    }

    if (formData.username.includes('@')) {
      showToast("Username can't contain '@'", 'error');
      setLoading(false);
      return;
    }

    if (formData.username.includes(' ')) {
      showToast("Username can't contain spaces", 'error');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(createUserUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Client-Type': 'web',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (res.ok) {
        showToast('Signed up successfully! Please sign in.', 'success');
        setTimeout(() => {
          router.push('/signin');
        }, 1000);
      } else {
        const data = await res.json();
        throw new Error(data.message || 'Signup failed');
      }
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message, 'error');
      } else {
        showToast('Signup unsuccessful', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fbf9f9] text-black min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-[720px]">
          {/* Return Link */}
          <Link 
            href="/"
            className="mb-16 flex items-center gap-2 text-zinc-600 hover:text-black transition-colors duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-xs uppercase tracking-widest cursor-pointer font-semibold">Return</span>
          </Link>

          {/* Page Header */}
          <div className="mb-16 border-b border-zinc-200 pb-8">
            <h1 className="text-6xl font-semibold leading-tight tracking-tight text-black mb-2">
              Join the Conversation
            </h1>
            <p className="text-xl text-zinc-600 leading-relaxed">
              Create your account to access exclusive content and editorial pieces.
            </p>
          </div>

          {/* Form Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
            {/* Left Side: Form */}
            <div className="order-2 md:order-1">
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                {/* Name Field */}
                <div className="flex flex-col gap-2">
                  <label 
                    htmlFor="fullName" 
                    className="text-xs uppercase text-zinc-600 tracking-widest font-semibold"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full h-12 text-base text-black placeholder:text-zinc-400 border-0 border-b border-black bg-transparent focus:outline-none focus:ring-0 focus:border-b-2 px-0"
                  />
                </div>

                {/* Username Field */}
                <div className="flex flex-col gap-2">
                  <label 
                    htmlFor="username" 
                    className="text-xs uppercase text-zinc-600 tracking-widest font-semibold"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="janedoe"
                    className="w-full h-12 text-base text-black placeholder:text-zinc-400 border-0 border-b border-black bg-transparent focus:outline-none focus:ring-0 focus:border-b-2 px-0"
                  />
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-2">
                  <label 
                    htmlFor="email" 
                    className="text-xs uppercase text-zinc-600 tracking-widest font-semibold"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full h-12 text-base text-black placeholder:text-zinc-400 border-0 border-b border-black bg-transparent focus:outline-none focus:ring-0 focus:border-b-2 px-0"
                  />
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-2">
                  <label 
                    htmlFor="password" 
                    className="text-xs uppercase text-zinc-600 tracking-widest font-semibold"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full h-12 text-base text-black placeholder:text-zinc-400 border-0 border-b border-black bg-transparent focus:outline-none focus:ring-0 focus:border-b-2 px-0"
                  />
                </div>

                {/* Confirm Password Field */}
                <div className="flex flex-col gap-2">
                  <label 
                    htmlFor="confirmPassword" 
                    className="text-xs uppercase text-zinc-600 tracking-widest font-semibold"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="••••••••"
                    className="w-full h-12 text-base text-black placeholder:text-zinc-400 border-0 border-b border-black bg-transparent focus:outline-none focus:ring-0 focus:border-b-2 px-0"
                  />
                </div>

                {/* Action Area */}
                <div className="mt-4 flex flex-col gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white text-xs uppercase tracking-widest h-14 hover:opacity-80 transition-opacity flex items-center justify-center gap-2 border border-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                  <div className="text-center mt-2">
                    <span className="text-base text-zinc-600">Already have an account? </span>
                    <Link 
                      href="/signin" 
                      className="text-base text-black border-b border-black hover:text-zinc-600 hover:border-zinc-600 transition-colors"
                    >
                      Sign In
                    </Link>
                  </div>
                </div>
              </form>
            </div>

            {/* Right Side: Editorial Quote */}
            <div className="order-1 md:order-2 hidden md:flex flex-col justify-center border-l border-zinc-200 pl-32">
              <blockquote className="text-3xl text-black border-l-2 border-black pl-6 italic font-serif leading-relaxed">
                "The blank page is a canvas for clarity. Join us in the pursuit of unvarnished truth and intentional design."
              </blockquote>
              <div className="mt-4 text-xs text-zinc-600 uppercase tracking-widest pl-6 font-semibold">
                — The Editorial Board
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
