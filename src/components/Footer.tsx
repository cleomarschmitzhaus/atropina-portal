'use client';

import Image from 'next/image';
import Link from 'next/link';
import { NAV_LINKS, SOCIAL_LINKS } from '@/lib/constants';
import { SocialLinks } from './SocialLinks';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1e1e1e] pt-12 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1 flex flex-col items-center md:items-start">
            <h3 className="font-heading tracking-widest text-[#c8ff00] mb-2 text-xl">Atropina</h3>
            <p className="text-[#c8ff00]/80 text-sm text-center md:text-left">
              Death Metal Brasileiro.
            </p>
          </div>
          
          <div className="col-span-1 md:col-span-1 flex flex-col items-center md:items-start">
            <h3 className="font-heading tracking-widest text-[#c8ff00] mb-4 text-xl">Navegação</h3>
            <ul className="space-y-2 text-center md:text-left">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-[#c8ff00]/80 hover:text-[#b91c1c] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-1 flex flex-col items-center md:items-start">
            <h3 className="font-heading tracking-widest text-[#c8ff00] mb-4 text-xl">Loja</h3>
            <ul className="space-y-2 text-center md:text-left">
              <li>
                <a 
                  href={SOCIAL_LINKS.merch}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#c8ff00]/80 hover:text-[#b91c1c] transition-colors"
                >
                  Merch Oficial
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-1 flex flex-col items-center md:items-start">
            <h3 className="font-heading tracking-widest text-[#c8ff00] mb-4 text-xl">Redes Sociais</h3>
            <SocialLinks className="justify-center md:justify-start" />
          </div>
        </div>
        
        <div className="border-t border-[#1e1e1e] mt-8 pt-8 flex flex-col items-center">
          <p className="text-[#c8ff00]/80 text-sm text-center">
            &copy; {currentYear} Atropina. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
