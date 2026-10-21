'use client';

import { useState, useEffect } from 'react';
import { getPublishedPosts } from '@/lib/firestore';
import type { Post } from '@/types';

export function usePosts(maxPosts = 20) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const data = await getPublishedPosts(maxPosts);
        setPosts(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Erro ao carregar posts.');
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [maxPosts]);

  return { posts, loading, error };
}
