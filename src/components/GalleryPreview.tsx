'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function GalleryPreview() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    fetch('https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnSE3CKWZsr3WceVHCpWrOwW-Sv11mg05bs4NyAYw6sRqz6Xq58-8ZbRhppLjEoW6g603CUT07uPtCnDUHDvWHUQBslX4b6HIRQhP4-ecwKKlgYKrIpQFxD9OTUPAKt7a_zPZlF0hqMTzSqVI_3QD-E9ZT9X6HC4tpUNYohTgAC3H3F9yKz9erq_k3mjoAvtbExycRFOHMQQyaRYoop-MsD8fDRXzwwjzk2Bg_5vtw2KIIYOzQBn0N1BCJrQp6YK0qhxX-VVJjPQ6jTohc8eqVEgW-iKsw&lib=Mpl-8RFm9o06wAVCtsTr2tCtfeZesi9Pz')
      .then(res => res.json())
      .then(data => {
        let urls: string[] = [];
        if (Array.isArray(data)) {
          urls = data.map((img: any) => img.url);
        } else if (data && Array.isArray(data.data)) {
          urls = data.data.map((img: any) => img.url);
        }
        
        if (urls.length > 0) {
          setImages(urls.slice(0, 4));
        }
      })
      .catch(err => console.error('Failed to load gallery preview', err));
  }, []);

  if (images.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      {images.map((src, idx) => (
        <div key={src} className="relative aspect-square overflow-hidden group border border-[#1e1e1e] hover:border-[#8b0000] transition-colors">
          <Image
            src={src}
            alt={"Atropina foto ${idx + 1}"}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
          />
        </div>
      ))}
    </div>
  );
}
