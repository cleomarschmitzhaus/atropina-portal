'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { signOut } from '@/lib/auth';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      <nav className="bg-[#141414] border-b border-[#333] p-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="font-heading text-2xl text-[#8b0000] uppercase tracking-wider">
            Painel Admin
          </Link>
          <Link href="/" className="text-xs text-[#c8ff00]/80 hover:text-white uppercase font-bold tracking-widest">
            Ir para o Site
          </Link>
        </div>
        
        {user && (
          <button 
            onClick={signOut}
            className="text-sm text-[#c8ff00]/80 hover:text-[#b91c1c] uppercase font-bold transition-colors"
          >
            Sair
          </button>
        )}
      </nav>
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
}
