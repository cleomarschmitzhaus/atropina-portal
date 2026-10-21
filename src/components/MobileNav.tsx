'use client';

import { X } from 'lucide-react';
import Link from 'next/link';
import { NAV_LINKS } from '@/lib/constants';
import { SocialLinks } from './SocialLinks';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#0a0a0a]/80 "
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Sidebar */}
      <div 
        className={`relative ml-auto w-full max-w-xs h-full bg-[#141414] border-l border-[#1e1e1e] flex flex-col pt-20 pb-8 px-6 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#c8ff00]/80 hover:text-[#c8ff00] transition-colors"
          aria-label="Fechar menu"
        >
          <X size={32} />
        </button>

        <nav className="flex-1 flex flex-col space-y-8 mt-12">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="text-3xl font-heading text-[#c8ff00] hover:text-[#b91c1c] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto border-t border-[#1e1e1e] pt-8">
          <SocialLinks iconSize={28} className="justify-center" />
        </div>
      </div>
    </div>
  );
}
