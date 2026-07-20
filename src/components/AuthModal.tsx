import React from 'react';
import Auth from './Auth';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-zinc-400 hover:text-white z-10"
        >
          Fechar
        </button>
        <div className="bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-800 p-1">
          <Auth />
        </div>
      </div>
    </div>
  );
}
