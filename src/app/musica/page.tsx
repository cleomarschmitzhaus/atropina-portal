import type { Metadata } from 'next';
import { PlatformLinks } from '@/components/PlatformLinks';
import DiscographyList from '@/components/DiscographyList';

export const metadata: Metadata = {
  title: 'Música e Lançamentos',
  description: 'Ouça a discografia completa da banda Atropina.',
};

export default function MusicaPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 relative">
      {/* Background decoration */}
      <div className="absolute top-1/4 right-5 w-[300px] h-[300px] bg-[#8b0000]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <header className="relative z-10 mb-16 text-center">
        <h1 className="font-heading text-5xl md:text-7xl text-[#c8ff00] text-glow-red uppercase tracking-widest">
          Música
        </h1>
        <div className="w-24 h-[1px] bg-[#8b0000] mx-auto mt-4"></div>
      </header>

      <p className="relative z-10 text-[#c8ff00]/80 text-base md:text-lg text-center max-w-3xl mx-auto mb-16 font-body leading-relaxed">
        A discografia da Atropina é um testamento à brutalidade. Do som mais cru das primeiras demos em fitas magnéticas à
        produção esmagadora dos álbuns recentes. Mergulhe no abismo sonoro através das plataformas digitais oficiais ou
        escute diretamente por aqui.
      </p>

      <div className="relative z-10 mb-20 flex justify-center">
        <PlatformLinks className="justify-center" />
      </div>

      <h2 className="relative z-10 font-heading text-4xl text-[#c8ff00] mb-10 uppercase tracking-widest border-b border-[#1e1e1e] pb-4">
        Catálogo de Lançamentos
      </h2>

      {/* Lista Dinâmica de Álbuns e Faixas */}
      <DiscographyList />
    </div>
  );
}
