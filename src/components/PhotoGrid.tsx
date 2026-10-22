'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface PhotoGridProps {
  images: string[];
}

export function PhotoGrid({ images }: PhotoGridProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!images || images.length === 0) {
    return <p className="text-[#c8ff00]/80 text-center font-mono text-sm py-12">NENHUM REGISTRO VISUAL ENCONTRADO.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((src, index) => (
          <div
            key={src || index}
            className="relative aspect-square overflow-hidden cursor-pointer bg-[#050505] border border-[#1a1a1a] hover:border-[#c8ff00] hover:shadow-[0_0_15px_rgba(200,255,0,0.15)] transition-all duration-300 group"
            onClick={() => setSelectedImage(src)}
          >
            <Image
              src={src}
              alt={`Galeria de foto ${index + 1}`}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
            />
            {/* Dark red grain overlay */}
            <div className="absolute inset-0 bg-[#8b0000]/5 opacity-30 group-hover:opacity-0 transition-opacity duration-300" />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999999 }}
            className="flex flex-col items-center justify-center bg-black/98 p-4"
            onClick={() => setSelectedImage(null)}
          >
            {/* Fixed Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              style={{ position: 'absolute', top: '24px', right: '24px', zIndex: 999999 }}
              className="text-[#c8ff00] hover:text-[#c8ff00] bg-[#0a0a0a]/80 p-3 border border-[#333] hover:border-[#c8ff00] transition-all flex items-center gap-2 cursor-pointer"
              aria-label="Fechar"
            >
              <span className="font-heading tracking-widest text-lg hidden sm:block">FECHAR</span>
              <X size={24} />
            </button>

            <div
              className="relative w-full max-w-5xl h-[80vh] border border-[#1a1a1a] p-1 bg-[#050505] z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Foto ampliada"
                fill
                className="object-contain p-2"
                priority
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
