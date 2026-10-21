'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';
import { SocialLinks } from './SocialLinks';
import { MobileNav } from './MobileNav';

export default function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90  border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo area with interactive white-to-green swap */}
            <div className="flex-shrink-0">
              <Link href="/" className="relative block w-40 h-12 group">
                <Image
                  src="/logo-white.png"
                  alt="Logo Atropina"
                  width={160}
                  height={60}
                  className="absolute inset-0 w-auto h-12 object-contain transition-opacity duration-500 group-hover:opacity-0"
                  priority
                />
                <Image
                  src="/logo-green.png"
                  alt="Logo Atropina Verde"
                  width={160}
                  height={60}
                  className="absolute inset-0 w-auto h-12 object-contain opacity-0 transition-opacity duration-500 group-hover:opacity-100 filter drop-shadow-[0_0_8px_rgba(200,255,0,0.5)]"
                  priority
                />
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-10">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`font-heading text-xl tracking-widest uppercase transition-all duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#c8ff00] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${
                      isActive 
                        ? 'text-[#c8ff00] text-glow-lime after:scale-x-100' 
                        : 'text-[#c8ff00]/80 hover:text-[#b91c1c] hover:text-shadow-[0_0_8px_rgba(139,0,0,0.8)]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden md:flex items-center">
              <SocialLinks className="gap-2" />
            </div>

            {/* Mobile menu trigger */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileNavOpen(true)}
                className="text-[#c8ff00] hover:text-[#c8ff00] hover:filter hover:drop-shadow-[0_0_5px_rgba(200,255,0,0.5)] transition-all p-2"
                aria-label="Abrir menu"
              >
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <MobileNav 
        isOpen={isMobileNavOpen} 
        onClose={() => setIsMobileNavOpen(false)} 
      />
    </>
  );
}
