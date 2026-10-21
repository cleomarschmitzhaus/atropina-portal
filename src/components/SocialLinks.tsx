'use client';

import { FaYoutube, FaInstagram, FaFacebookF, FaSpotify } from 'react-icons/fa';
import { SOCIAL_LINKS } from '@/lib/constants';

interface SocialLinksProps {
  className?: string;
  iconSize?: number;
}

export function SocialLinks({ className = '', iconSize = 20 }: SocialLinksProps) {
  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <a
        href={SOCIAL_LINKS.youtube}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#c8ff00]/80 hover:text-[#b91c1c] transition-colors duration-300"
        aria-label="YouTube"
      >
        <FaYoutube size={iconSize} />
      </a>
      <a
        href={SOCIAL_LINKS.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#c8ff00]/80 hover:text-[#b91c1c] transition-colors duration-300"
        aria-label="Instagram"
      >
        <FaInstagram size={iconSize} />
      </a>
      <a
        href={SOCIAL_LINKS.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#c8ff00]/80 hover:text-[#b91c1c] transition-colors duration-300"
        aria-label="Facebook"
      >
        <FaFacebookF size={iconSize} />
      </a>
      <a
        href={SOCIAL_LINKS.spotify}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#c8ff00]/80 hover:text-[#b91c1c] transition-colors duration-300"
        aria-label="Spotify"
      >
        <FaSpotify size={iconSize} />
      </a>
    </div>
  );
}
