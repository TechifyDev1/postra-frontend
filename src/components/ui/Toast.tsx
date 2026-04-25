'use client';

import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'info' | 'success' | 'error';
  onClose: () => void;
  duration?: number;
}

export const Toast = ({ message, type = 'info', onClose, duration = 3000 }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = type === 'error' ? 'bg-red-50 border-red-200' : 
                  type === 'success' ? 'bg-green-50 border-green-200' : 
                  'bg-zinc-100 border-zinc-300';

  const textColor = type === 'error' ? 'text-red-900' : 
                    type === 'success' ? 'text-green-900' : 
                    'text-black';

  return (
    <div className={`fixed top-24 right-6 z-50 ${bgColor} border ${textColor} px-6 py-4 max-w-md shadow-lg animate-slide-in`}>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm uppercase tracking-widest font-semibold">{message}</p>
        <button 
          onClick={onClose}
          className="text-zinc-500 hover:text-black transition-colors"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};
