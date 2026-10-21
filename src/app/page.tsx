import { GalleryPreview } from '@/components/GalleryPreview';
import Image from 'next/image';
import Link from 'next/link';
import { PlatformLinks } from '@/components/PlatformLinks';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center p-6 overflow-hidden">
        {/* Cinematic Background Lights */}
        <div className="absolute inset-0 bg-[#050505]/40 z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[600px] md:h-[600px] bg-[#8b0000]/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
        <div className="absolute top-1/3 left-1/4 w-[200px] h-[200px] bg-[#c8ff00]/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

        {/* Brutalist Frame Lines */}
        <div className="absolute inset-x-8 top-8 bottom-8 border border-white/5 pointer-events-none z-10 hidden md:block"></div>
        <div className="absolute left-12 top-0 bottom-0 border-l border-white/5 pointer-events-none z-10 hidden lg:block"></div>
        <div className="absolute right-12 top-0 bottom-0 border-r border-white/5 pointer-events-none z-10 hidden lg:block"></div>



        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">


          <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
            <Link
              href="/galeria"
              className="bg-[#8b0000] hover:bg-[#b91c1c] text-white font-heading text-xl tracking-widest uppercase px-10 py-4 transition-all duration-300 transform hover:-translate-y-0.5 border border-transparent active:translate-y-0 shadow-lg shadow-black/80 hover:shadow-[#8b0000]/20"
            >
              Galeria
            </Link>
            <Link
              href="/historia"
              className="border border-[#c8ff00]/30 hover:border-[#c8ff00] text-[#c8ff00] hover:text-[#c8ff00] font-heading text-xl tracking-widest uppercase px-10 py-4 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 hover:bg-[#c8ff00]/5"
            >
              Conheça a História
            </Link>
          </div>
        </div>

        {/* Bottom Banner Bar */}
        <div className="mt-16 z-10 w-full max-w-lg px-6 text-center select-none hidden md:block">
          <div className="text-xs font-mono text-[#c8ff00] font-bold tracking-[0.2em] uppercase text-glow-lime bg-black/40 py-2 px-4 border border-[#c8ff00]/20 rounded-sm">
            NOVO ÁLBUM: &quot;A LITURGIA DA MORTE&quot; disponível em breve
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 px-6 bg-[#0c0c0c]/10 border-y border-[#121212]/50 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-[#8b0000] to-transparent"></div>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#8b0000] to-[#c8ff00] rounded-sm opacity-20 group-hover:opacity-40 blur transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-56 h-56 md:w-64 md:h-64 bg-black border border-[#1e1e1e] flex items-center justify-center p-4">
                <Image
                  src="/logo-green.png"
                  alt="Band Symbol"
                  width={200}
                  height={200}
                  className="w-full h-full object-contain filter brightness-90 group-hover:brightness-100 transition-all duration-500"
                />
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-2/3 text-left">
            <h2 className="font-heading text-4xl md:text-5xl mb-6 text-[#c8ff00] tracking-wider uppercase">
              História
            </h2>
            <p className="text-[#c8ff00]/80 mb-4 text-base md:text-lg leading-relaxed font-body">
              Formada nas profundezas do underground brasileiro, Atropina destila um Death Metal cru, 
              brutal e impiedoso, incorporando a atmosfera gélida e blasfema do Black Metal. 
            </p>
            <p className="text-[#c8ff00]/80 mb-8 text-base md:text-lg leading-relaxed font-body">
              Nossa música é a trilha sonora para o caos, o declínio da humanidade e a escuridão que 
              habita a mente humana. Uma parede sonora implacável, feita para esmagar dogmas e libertar 
              espíritos.
            </p>
            <Link
              href="/historia"
              className="inline-flex items-center gap-2 text-[#c8ff00] hover:text-white transition-colors uppercase tracking-wider font-mono text-sm font-bold group"
            >
              <span>Leia a biografia completa</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest section */}
      <section className="py-24 px-6 bg-[#070707]/10 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-4xl md:text-5xl mb-12 text-[#c8ff00] tracking-wider uppercase">
            Música
          </h2>
          <div className="bg-[#0f0f0f] border border-[#1a1a1a] p-8 md:p-12 box-glow-red rounded-sm">
            <p className="text-[#c8ff00]/80 mb-8 font-body max-w-2xl mx-auto text-base">
              Acesse nossa discografia completa, merchs e canais oficiais diretamente na plataforma de sua preferência.
            </p>
            <PlatformLinks className="justify-center" />
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="py-24 px-6 bg-[#0c0c0c]/10 border-t border-[#121212]/50 relative">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-heading text-4xl md:text-5xl mb-6 text-[#c8ff00] tracking-wider uppercase">
            Galeria
          </h2>
          <p className="text-[#c8ff00]/80 mb-10 max-w-xl mx-auto font-body text-base">
            Registros dos shows, ensaios e rituais sonoros.
          </p>
          
          <GalleryPreview />

          <Link
            href="/galeria"
            className="inline-flex items-center justify-center px-8 py-3 border border-[#8b0000] text-[#c8ff00] hover:bg-[#8b0000] hover:text-white uppercase font-heading text-lg tracking-widest transition-all duration-300"
          >
            Ver Galeria Completa
          </Link>
        </div>
      </section>
    </div>
  );
}
