'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchGalleryImageUrls } from '@/lib/gallery';

export function GalleryPreview() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    let isMounted = true;
    fetchGalleryImageUrls()
      .then((urls) => {
        if (isMounted && urls.length > 0) {
          setImages(urls.slice(0, 4));
        }
      })
      .catch((err) => console.error('Failed to load gallery preview', err));

    return () => {
      isMounted = false;
    };
  }, []);

  if (images.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      {images.map((src, idx) => (
        <div
          key={src}
          className="relative aspect-square overflow-hidden group border border-[#1e1e1e] hover:border-[#8b0000] transition-colors"
        >
          <Image
            src={src}
            alt={`Atropina foto ${idx + 1}`}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
          />
        </div>
      ))}
    </div>
  );
}
