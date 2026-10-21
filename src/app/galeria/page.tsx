'use client';

import { useEffect, useState } from 'react';
import { PhotoGrid } from '@/components/PhotoGrid';

export default function GaleriaPage() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadImages() {
      try {
        const res = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnSE3CKWZsr3WceVHCpWrOwW-Sv11mg05bs4NyAYw6sRqz6Xq58-8ZbRhppLjEoW6g603CUT07uPtCnDUHDvWHUQBslX4b6HIRQhP4-ecwKKlgYKrIpQFxD9OTUPAKt7a_zPZlF0hqMTzSqVI_3QD-E9ZT9X6HC4tpUNYohTgAC3H3F9yKz9erq_k3mjoAvtbExycRFOHMQQyaRYoop-MsD8fDRXzwwjzk2Bg_5vtw2KIIYOzQBn0N1BCJrQp6YK0qhxX-VVJjPQ6jTohc8eqVEgW-iKsw&lib=Mpl-8RFm9o06wAVCtsTr2tCtfeZesi9Pz');
        const data = await res.json();
        
        let urls: string[] = [];
        if (Array.isArray(data)) {
          urls = data.map((img: any) => img.url);
        } else if (data && Array.isArray(data.data)) {
          urls = data.data.map((img: any) => img.url);
        }
        
        if (urls.length > 0) {
          setImages(urls);
        }
      } catch (error) {
        console.error('Failed to load images:', error);
      } finally {
        setLoading(false);
      }
    }
    loadImages();
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
        <div className="bg-[#141414]/40  border border-[#333] p-12 text-center rounded-sm">
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
