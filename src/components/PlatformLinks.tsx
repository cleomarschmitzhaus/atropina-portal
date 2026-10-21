'use client';

import { FaSpotify, FaYoutube } from 'react-icons/fa';
import { ShoppingBag } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/constants';

interface PlatformLinksProps {
  className?: string;
}

export function PlatformLinks({ className = '' }: PlatformLinksProps) {
  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      <a
        href={SOCIAL_LINKS.spotify}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-3 w-full sm:w-auto px-6 py-3 bg-[#0a0a0a] border border-[#1e1e1e] hover:border-[#1DB954] text-[#c8ff00] hover:text-[#1DB954] hover:shadow-[0_0_10px_rgba(29,185,84,0.15)] transition-all duration-300 font-heading tracking-widest text-lg uppercase"
      >
        <FaSpotify size={20} className="shrink-0" />
        <span>Spotify</span>
      </a>
      
      <a
        href={SOCIAL_LINKS.youtube}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-3 w-full sm:w-auto px-6 py-3 bg-[#0a0a0a] border border-[#1e1e1e] hover:border-[#ff0000] text-[#c8ff00] hover:text-[#ff0000] hover:shadow-[0_0_10px_rgba(255,0,0,0.15)] transition-all duration-300 font-heading tracking-widest text-lg uppercase"
      >
        <FaYoutube size={20} className="shrink-0" />
        <span>YouTube Music</span>
      </a>

      <a
        href={SOCIAL_LINKS.merch}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-3 w-full sm:w-auto px-6 py-3 bg-[#0a0a0a] border border-[#1e1e1e] hover:border-[#c8ff00] text-[#c8ff00] hover:text-[#c8ff00] hover:shadow-[0_0_10px_rgba(200,255,0,0.15)] transition-all duration-300 font-heading tracking-widest text-lg uppercase"
      >
        <ShoppingBag size={20} className="shrink-0" />
        <span>Loja Oficial</span>
      </a>
    </div>
  );
}

