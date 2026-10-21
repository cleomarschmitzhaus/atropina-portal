'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from '@/lib/auth';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && user) {
      router.push('/admin');
    }
  }, [user, authLoading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Falha ao acessar o sistema. Acesso negado.');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return <div className="min-h-[70vh] flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8b0000]"></div></div>;

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="bg-[#141414] p-8 border border-[#333] rounded-sm w-full max-w-md shadow-2xl">
        <h1 className="font-heading text-4xl text-[#8b0000] mb-6 text-center uppercase tracking-widest">
          Acesso dos Membros
        </h1>
        
        {error && (
          <div className="bg-red-900/20 border border-red-500/50 text-red-200 p-3 mb-6 rounded-sm text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[#c8ff00]/80 text-xs font-bold mb-2 uppercase tracking-wider">
              E-mail Obscuro
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#333] p-3 text-[#c8ff00] focus:outline-none focus:border-[#8b0000] transition-colors rounded-sm"
              required
            />
          </div>
          <div>
            <label className="block text-[#c8ff00]/80 text-xs font-bold mb-2 uppercase tracking-wider">
              Palavra-passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#333] p-3 text-[#c8ff00] focus:outline-none focus:border-[#8b0000] transition-colors rounded-sm"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8b0000] hover:bg-[#b91c1c] text-white font-bold py-3 uppercase tracking-widest transition-colors rounded-sm disabled:opacity-50"
          >
            {loading ? 'Invocando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
