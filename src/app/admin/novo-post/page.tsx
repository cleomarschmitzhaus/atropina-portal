'use client';

import { useState } from 'react';
import Link from 'next/link';
import AuthGuard from '@/components/AuthGuard';
import PostEditor from '@/components/PostEditor';
import { useAuth } from '@/hooks/useAuth';
import { createPost } from '@/lib/firestore';
import type { PostFormData } from '@/types';

export default function NovoPostPage() {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (postData: PostFormData) => {
    if (!user) return;
    setIsSubmitting(true);
    try {
      await createPost({
        title: postData.title,
        slug: postData.slug,
        content: postData.content,
        excerpt: postData.excerpt,
        coverImageURL: postData.coverImageURL || undefined,
        authorUid: user.uid,
        authorName: user.displayName || 'Membro Anônimo',
        status: postData.status,
      });
      setSuccess(true);
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Falha ao publicar. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthGuard>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-heading text-4xl text-[#c8ff00] uppercase">Novo Relato</h1>
          <Link
            href="/admin"
            className="text-[#c8ff00]/80 hover:text-white uppercase text-sm font-bold"
          >
            &larr; Voltar
          </Link>
        </div>

        {success ? (
          <div className="bg-[#141414] border border-[#8b0000] p-10 text-center rounded-sm">
            <h2 className="font-heading text-3xl text-[#c8ff00] mb-4">
              Relato Publicado com Sucesso
            </h2>
            <p className="text-[#c8ff00]/80 mb-8">
              Suas palavras foram adicionadas ao Diário de Bordo.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setSuccess(false)}
                className="bg-[#222] hover:bg-[#333] text-white px-6 py-2 rounded-sm uppercase text-sm font-bold transition-colors"
              >
                Escrever Outro
              </button>
              <Link
                href="/admin"
                className="bg-[#8b0000] hover:bg-[#b91c1c] text-white px-6 py-2 rounded-sm uppercase text-sm font-bold transition-colors"
              >
                Ver Painel
              </Link>
            </div>
          </div>
        ) : (
          <PostEditor onSubmit={handleSubmit} loading={isSubmitting} />
        )}
      </div>
    </AuthGuard>
  );
}
