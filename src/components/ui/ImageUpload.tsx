'use client';

import { useState } from 'react';

export const ImageUpload = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full h-64 bg-zinc-100 flex flex-col items-center justify-center border border-zinc-200 cursor-pointer hover:bg-zinc-200 transition-colors mb-16 group relative">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      {image ? (
        <img src={image} alt="Feature" className="w-full h-full object-cover" />
      ) : (
        <>
          <svg className="w-10 h-10 text-zinc-500 mb-2 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-xs text-zinc-500 group-hover:text-black transition-colors uppercase tracking-widest font-semibold">
            ADD FEATURE IMAGE
          </span>
        </>
      )}
    </div>
  );
};
