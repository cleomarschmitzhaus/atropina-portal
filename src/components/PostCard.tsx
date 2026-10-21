'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/types';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  // Handle Firestore Timestamp or Date object or string
  let dateObj = new Date();
  if (post.createdAt) {
    if (typeof (post.createdAt as any).toDate === 'function') {
      dateObj = (post.createdAt as any).toDate();
    } else if (post.createdAt) {
      dateObj = new Date(post.createdAt as unknown as string);
    }
  }

  const formattedDate = dateObj.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <div className="bg-[#0f0f0f]/40  border border-[#1a1a1a] overflow-hidden rounded-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_8px_30px_rgba(139,0,0,0.15)] group-hover:border-[#8b0000]/60 relative">
        {/* Left accent line on hover */}
        <div className="absolute left-0 top-0 w-[2px] h-full bg-[#8b0000] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>

        {post.coverImageURL && (
          <div className="relative h-48 w-full overflow-hidden border-b border-[#1a1a1a]">
            <Image
              src={post.coverImageURL!}
              alt={post.title}
              fill
              className="object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-500 group-hover:scale-105"
            />
            {/* Toxic color overlay on hover */}
            <div className="absolute inset-0 bg-[#c8ff00]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center text-[10px] font-mono text-neutral-500 mb-3 uppercase tracking-wider group-hover:text-neutral-400 transition-colors">
            <span>{formattedDate}</span>
            <span className="mx-2 text-[#8b0000] font-bold">//</span>
            <span className="text-[#c8ff00] text-glow-lime">{post.authorName}</span>
          </div>
          <h3 className="text-2xl font-heading text-[#c8ff00] mb-3 group-hover:text-[#8b0000] transition-colors leading-snug line-clamp-2">
            {post.title}
          </h3>
          <p className="text-[#c8ff00]/80 text-sm font-body leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        </div>
      </div>
    </Link>
  );
}
