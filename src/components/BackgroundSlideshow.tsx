'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { preloadImages } from '@/lib/preloadImages';

export { preloadImages };

const GOOGLE_SCRIPT_URL =
  'https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnSE3CKWZsr3WceVHCpWrOwW-Sv11mg05bs4NyAYw6sRqz6Xq58-8ZbRhppLjEoW6g603CUT07uPtCnDUHDvWHUQBslX4b6HIRQhP4-ecwKKlgYKrIpQFxD9OTUPAKt7a_zPZlF0hqMTzSqVI_3QD-E9ZT9X6HC4tpUNYohTgAC3H3F9yKz9erq_k3mjoAvtbExycRFOHMQQyaRYoop-MsD8fDRXzwwjzk2Bg_5vtw2KIIYOzQBn0N1BCJrQp6YK0qhxX-VVJjPQ6jTohc8eqVEgW-iKsw&lib=Mpl-8RFm9o06wAVCtsTr2tCtfeZesi9Pz';

export function BackgroundSlideshow() {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Estados do Preloader Inicial
  const [showLoader, setShowLoader] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [progress, setProgress] = useState(0);
  const finishedRef = useRef(false);

  // Função para finalizar o carregamento com fade-out suave e remoção do DOM
  const finishLoading = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    // Inicia a transição suave de fade-out
    setIsFading(true);

    // Remove completamente do DOM após a conclusão da animação (700ms)
    setTimeout(() => {
      setShowLoader(false);
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    }, 700);
  };

  useEffect(() => {
    // Trava a rolagem durante a tela de carregamento
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }

    // Limite de tempo de segurança (6 segundos) para evitar travar o usuário
    const safetyTimeout = setTimeout(() => {
      if (!finishedRef.current) {
        console.warn('Preloader: limite de tempo de segurança atingido (6s). Liberando interface.');
        finishLoading();
      }
    }, 6000);

    // Busca dinâmica das URLs de imagens no Google Drive
    fetch(GOOGLE_SCRIPT_URL)
      .then((res) => res.json())
      .then(async (data) => {
        let urls: string[] = [];
        if (Array.isArray(data)) {
          urls = data.map((img: any) => img.url).filter(Boolean);
        } else if (data && Array.isArray(data.data)) {
          urls = data.data.map((img: any) => img.url).filter(Boolean);
        }

        if (urls.length === 0) {
          finishLoading();
          return;
        }

        // Embaralha e seleciona as imagens para o slide de fundo
        const shuffled = [...urls].sort(() => 0.5 - Math.random());
        const slideImages = shuffled.slice(0, 8);
        setImages(slideImages);

        // Pré-carrega todas as imagens selecionadas via Image() e Promise.all
        try {
          await preloadImages(slideImages, (loaded, total) => {
            const percent = Math.round((loaded / total) * 100);
            setProgress(percent);
          });
        } catch (err) {
          console.error('Erro durante pré-carregamento:', err);
        }

        // Breve pausa para exibir 100% antes de iniciar o fade-out
        setTimeout(() => {
          finishLoading();
        }, 200);
      })
      .catch((err) => {
        console.error('Falha ao obter lista de imagens do Drive:', err);
        finishLoading();
      });

    return () => {
      clearTimeout(safetyTimeout);
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    };
  }, []);

  // Transição automática das imagens do slide a cada 5 segundos
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <>
      {/* Indicador Visual de Progresso / Overlay de Carregamento */}
      {showLoader && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed inset-0 z-[99999] bg-[#050505] flex flex-col items-center justify-center p-6 select-none transition-opacity duration-700 ease-out ${
            isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{ background: 'radial-gradient(circle at center, #120303 0%, #050505 85%)' }}
        >
          {/* Marcadores decorativos nos cantos (estética brutalista) */}
          <div className="absolute top-6 left-6 text-xs font-mono text-[#c8ff00]/30 select-none">+</div>
          <div className="absolute top-6 right-6 text-xs font-mono text-[#c8ff00]/30 select-none">+</div>
          <div className="absolute bottom-6 left-6 text-xs font-mono text-[#c8ff00]/30 select-none">+</div>
          <div className="absolute bottom-6 right-6 text-xs font-mono text-[#c8ff00]/30 select-none">+</div>

          {/* Círculo de Carregamento com porcentagem no centro */}
          <div className="relative flex items-center justify-center mb-6">
            <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
              {/* Trilha escura de fundo */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#1a1a1a"
                strokeWidth="4"
                fill="transparent"
              />
              {/* Arco de progresso ativo */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#c8ff00"
                strokeWidth="4"
                strokeDasharray={251.327}
                strokeDashoffset={251.327 - (progress / 100) * 251.327}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-300 ease-out drop-shadow-[0_0_10px_rgba(200,255,0,0.6)]"
              />
            </svg>

            {/* Porcentagem no meio do círculo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-heading text-3xl text-[#c8ff00] tracking-wider text-glow-lime">
                {progress}%
              </span>
            </div>
          </div>

          {/* Texto de Status Limpo */}
          <p className="font-mono text-xs sm:text-sm tracking-widest uppercase text-[#c8ff00]/90 text-center">
            Carregando arquivos da banda...
          </p>

          {/* Assinatura sutil */}
          <span className="font-mono text-[10px] text-[#c8ff00]/40 tracking-widest mt-4 uppercase">
            ATROPINA // DEATH METAL
          </span>
        </div>
      )}

      {/* Slide de Fundo */}
      {images.length > 0 && (
        <div className="fixed top-0 left-0 w-full h-[100vh] sm:h-screen z-[0] overflow-hidden bg-black pointer-events-none">
          {images.map((src, index) => (
            <div
              key={src}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={src}
                alt="Atropina Background"
                fill
                className="object-cover object-[center_top] grayscale contrast-[1.1]"
                priority={index === 0}
              />
            </div>
          ))}

          {/* Camada de gradiente sombrio por cima para garantir legibilidade */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/40 to-[#0a0a0a]/80 mix-blend-multiply"></div>

          {/* Camada de ruído / scanline extra por cima das fotos */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
            }}
          ></div>
        </div>
      )}
    </>
  );
}
