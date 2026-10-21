'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AuthGuard from '@/components/AuthGuard';
import { useAuth } from '@/hooks/useAuth';
import { getUserPosts } from '@/lib/firestore';
import type { Post } from '@/types';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      if (!user) return;
      try {
        const userPosts = await getUserPosts(user.uid);
        setPosts(userPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, [user]);

  return (
    <AuthGuard>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 border-b border-[#333] pb-6">
          <div>
            <h1 className="font-heading text-4xl text-[#c8ff00] uppercase mb-2">
              Saudações, {user?.displayName || 'Membro da Horda'}
            </h1>
            <p className="text-[#c8ff00]/80">Gerencie seus despachos para o Diário de Bordo.</p>
          </div>
          <Link
            href="/admin/novo-post"
            className="bg-[#8b0000] hover:bg-[#b91c1c] text-white px-6 py-2 rounded-sm font-bold uppercase text-sm transition-colors text-center inline-block"
          >
            Novo Post
          </Link>
        </header>

        <h2 className="font-heading text-3xl text-[#c8ff00]/80 uppercase mb-6">Seus Posts</h2>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#8b0000]"></div>
          </div>
        ) : posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-[#141414] border border-[#333] p-4 rounded-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div>
                  <h3 className="font-heading text-2xl text-[#c8ff00] uppercase mb-1">
                    {post.title}
                  </h3>
                  <div className="text-xs text-[#666] flex gap-3">
                    <span>{post.status === 'published' ? 'Publicado' : 'Rascunho'}</span>
                    <span>•</span>
                    <span>
                      {post.createdAt && typeof (post.createdAt as any).toDate === 'function'
                        ? (post.createdAt as any).toDate().toLocaleDateString('pt-BR')
                        : ''}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm px-3 py-1 bg-[#222] hover:bg-[#333] text-[#c8ff00]/80 rounded-sm transition-colors"
                  >
                    Ver
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#141414] p-10 text-center border border-[#333] rounded-sm">
            <p className="text-[#c8ff00]/80 mb-4">Você ainda não escreveu nenhum relato.</p>
            <Link
              href="/admin/novo-post"
              className="text-[#8b0000] hover:text-[#b91c1c] font-bold uppercase underline text-sm"
            >
              Comece agora
            </Link>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
