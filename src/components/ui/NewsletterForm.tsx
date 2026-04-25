'use client';

import { FormEvent, useState } from 'react';

export const NewsletterForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    // Handle newsletter signup
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex gap-0 mt-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-grow bg-transparent border-0 border-b border-black focus:ring-0 text-xs p-4 uppercase tracking-widest font-semibold placeholder:text-zinc-400"
        placeholder="YOUR EMAIL ADDRESS"
        required
      />
      <button
        type="submit"
        className="bg-black text-white px-8 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-zinc-800 transition-colors"
      >
        Join
      </button>
    </form>
  );
};
