'use client';

import { useState } from 'react';
import type { PostFormData } from '@/types';

interface PostEditorProps {
  initialData?: Partial<PostFormData>;
  onSubmit: (post: PostFormData) => void;
  loading: boolean;
}

export default function PostEditor({ initialData, onSubmit, loading }: PostEditorProps) {
  const [formData, setFormData] = useState<PostFormData>({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    coverImageURL: initialData?.coverImageURL || '',
    status: initialData?.status || 'draft',
  });

  const [isSlugManual, setIsSlugManual] = useState(!!initialData?.slug);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: newTitle,
      ...(!isSlugManual && { slug: generateSlug(newTitle) }),
    }));
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSlugManual(true);
    setFormData((prev) => ({ ...prev, slug: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-[#c8ff00]/80 mb-2">
          Título
        </label>
        <input
          type="text"
          id="title"
          required
          value={formData.title}
          onChange={handleTitleChange}
          className="w-full bg-[#141414] border border-[#1e1e1e] text-[#c8ff00] px-4 py-2 focus:outline-none focus:border-[#8b0000] focus:ring-1 focus:ring-[#8b0000] transition-colors"
          placeholder="Título do Post"
        />
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-[#c8ff00]/80 mb-2">
          Slug (URL)
        </label>
        <input
          type="text"
          id="slug"
          required
          value={formData.slug}
          onChange={handleSlugChange}
          className="w-full bg-[#141414] border border-[#1e1e1e] text-[#c8ff00]/80 px-4 py-2 focus:outline-none focus:border-[#8b0000] focus:ring-1 focus:ring-[#8b0000] transition-colors font-mono text-sm"
          placeholder="titulo-do-post"
        />
      </div>

      <div>
        <label htmlFor="coverImageURL" className="block text-sm font-medium text-[#c8ff00]/80 mb-2">
          URL da Imagem de Capa (opcional)
        </label>
        <input
          type="url"
          id="coverImageURL"
          value={formData.coverImageURL}
          onChange={(e) => setFormData((prev) => ({ ...prev, coverImageURL: e.target.value }))}
          className="w-full bg-[#141414] border border-[#1e1e1e] text-[#c8ff00] px-4 py-2 focus:outline-none focus:border-[#8b0000] focus:ring-1 focus:ring-[#8b0000] transition-colors"
          placeholder="https://..."
        />
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-[#c8ff00]/80 mb-2">
          Resumo (Excerpt) - máx 500 caracteres
        </label>
        <textarea
          id="excerpt"
          required
          maxLength={500}
          rows={3}
          value={formData.excerpt}
          onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
          className="w-full bg-[#141414] border border-[#1e1e1e] text-[#c8ff00] px-4 py-2 focus:outline-none focus:border-[#8b0000] focus:ring-1 focus:ring-[#8b0000] transition-colors resize-none"
          placeholder="Breve resumo do post..."
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-[#c8ff00]/80 mb-2">
          Conteúdo Principal
        </label>
        <textarea
          id="content"
          required
          rows={15}
          value={formData.content}
          onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
          className="w-full bg-[#141414] border border-[#1e1e1e] text-[#c8ff00] px-4 py-2 focus:outline-none focus:border-[#8b0000] focus:ring-1 focus:ring-[#8b0000] transition-colors"
          placeholder="Escreva o conteúdo do post aqui..."
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-[#c8ff00]/80 mb-2">
          Status
        </label>
        <select
          id="status"
          value={formData.status}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, status: e.target.value as 'draft' | 'published' }))
          }
          className="w-full bg-[#141414] border border-[#1e1e1e] text-[#c8ff00] px-4 py-2 focus:outline-none focus:border-[#8b0000] focus:ring-1 focus:ring-[#8b0000] transition-colors"
        >
          <option value="draft">Rascunho (Draft)</option>
          <option value="published">Publicado (Published)</option>
        </select>
      </div>

      <div className="pt-4 border-t border-[#1e1e1e]">
        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto px-8 py-3 bg-[#8b0000] hover:bg-[#b91c1c] text-white font-heading tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Salvando...' : 'Salvar Post'}
        </button>
      </div>
    </form>
  );
}
