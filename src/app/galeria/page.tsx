'use client';

import { useEffect, useState } from 'react';
import { PhotoGrid } from '@/components/PhotoGrid';
import { fetchGalleryImageUrls } from '@/lib/gallery';

export default function GaleriaPage() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadImages() {
      try {
        const urls = await fetchGalleryImageUrls();
        if (isMounted && urls.length > 0) {
          setImages(urls);
        }
      } catch (error) {
        console.error('Failed to load images:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadImages();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="font-heading text-5xl md:text-6xl text-[#8b0000] mb-4 text-center uppercase">
        Galeria
      </h1>
      <p className="text-[#c8ff00]/80 text-center mb-12 max-w-2xl mx-auto">
        Registros visuais da Atropina
      </p>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8b0000]"></div>
        </div>
      ) : images.length > 0 ? (
        <PhotoGrid images={images} />
      ) : (
        <div className="bg-[#141414]/40 border border-[#333] p-12 text-center rounded-sm">
          <p className="text-[#c8ff00]/80 mb-8">
            Envie fotos pelo painel admin para populá-las aqui.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="aspect-square bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-sm border border-[#222]"
              ></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
