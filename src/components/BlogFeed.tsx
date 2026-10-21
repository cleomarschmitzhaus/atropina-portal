'use client';

import { usePosts } from '@/hooks/usePosts';
import PostCard from '@/components/PostCard';

export default function BlogFeed() {
  const { posts, loading, error } = usePosts();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8b0000]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#141414] border border-[#8b0000] p-6 text-center text-[#c8ff00] rounded-sm">
        Erro ao carregar o diário de bordo. A maldição foi forte demais.
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="bg-[#141414]/40  border border-[#333] p-12 text-center rounded-sm">
        <p className="text-[#c8ff00]/80 text-lg">
          Nenhum post publicado ainda. Os membros da Atropina em breve compartilharão seus textos aqui.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
