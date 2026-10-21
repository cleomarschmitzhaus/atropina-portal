import type { Metadata } from 'next';
import { BAND_MEMBERS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'História',
  description: 'Conheça a trajetória, fases e história oficial da horda Atropina.',
};

export default function HistoriaPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 relative">
      {/* Background Glows */}
      <div className="absolute top-10 left-10 w-[250px] h-[250px] bg-[#8b0000]/5 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-20 right-10 w-[200px] h-[200px] bg-[#c8ff00]/5 rounded-full blur-[90px] pointer-events-none z-0"></div>

      <header className="relative z-10 mb-16 text-center">
        <h1 className="font-heading text-5xl md:text-7xl text-[#c8ff00] text-glow-red uppercase tracking-widest">
          História
        </h1>
        <div className="w-24 h-[1px] bg-[#c8ff00] mx-auto mt-4"></div>
      </header>
      
      {/* Dossier Card com a Cronologia Oficial */}
      <div className="relative z-10 space-y-12 text-[#c8ff00]/80 text-base md:text-lg leading-relaxed mb-20 bg-[#0f0f0f]/50 p-8 md:p-12 border border-[#1e1e1e] box-glow-red font-body">
        {/* Decorative corner crosshairs */}
        <div className="absolute top-2 left-2 text-[10px] font-mono text-neutral-800 font-bold">+</div>
        <div className="absolute top-2 right-2 text-[10px] font-mono text-neutral-800 font-bold">+</div>
        <div className="absolute bottom-2 left-2 text-[10px] font-mono text-neutral-800 font-bold">+</div>
        <div className="absolute bottom-2 right-2 text-[10px] font-mono text-neutral-800 font-bold">+</div>

        {/* FASE 1: As Origens */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 border-b border-[#262626] pb-3 mb-6">
            <span className="w-2 h-2 bg-[#8b0000] animate-pulse"></span>
            <h2 className="font-heading text-2xl md:text-3xl text-[#c8ff00] uppercase tracking-wider">
              As Origens <span className="text-[#8b0000] font-mono text-lg md:text-xl">(1996–2001)</span>
            </h2>
          </div>

          <p className="first-letter:text-5xl first-letter:font-heading first-letter:text-[#8b0000] first-letter:mr-3 first-letter:float-left first-letter:font-bold">
            A banda Atropina nasceu em 1996 na cidade de Teutônia, no Rio Grande do Sul, criada por um grupo de amigos ainda na escola. O objetivo desde o início era fazer um som pesado e agressivo, com letras em português que criticam duramente a igreja e o controle da sociedade pelas religiões.
          </p>

          <p>
            Nos primeiros anos, o som da banda misturava estilos rápidos e pesados do metal. Em 1998, gravaram sua primeira fita demo, chamada <em>“Louvar a Tudo por Nada”</em>, lançada também em Portugal em parceria com outra banda chamada Bestial. Isso ajudou a espalhar o som pelo sul do país e a abrir portas para os primeiros shows.
          </p>

          <p>
            Em 2001, lançaram o primeiro disco completo, <em>“Santos de Porcelana”</em>, que também ganhou uma versão em Portugal. O álbum marcou a fase mais brutal desse início e permitiu que a banda tocasse em vários festivais no sul do Brasil.
          </p>
        </section>

        {/* FASE 2: A Pausa e o Projeto Legis Edax */}
        <section className="space-y-4 pt-6 border-t border-[#1a1a1a]">
          <div className="flex items-center gap-3 border-b border-[#262626] pb-3 mb-6">
            <span className="w-2 h-2 bg-[#c8ff00] animate-pulse"></span>
            <h2 className="font-heading text-2xl md:text-3xl text-[#c8ff00] uppercase tracking-wider">
              A Pausa e o Projeto Legis Edax <span className="text-[#8b0000] font-mono text-lg md:text-xl">(2004–2007)</span>
            </h2>
          </div>

          <p className="border-l-2 border-[#8b0000] pl-4 italic text-[#c8ff00]/90 bg-[#8b0000]/5 py-2">
            Entre 2004 e 2007, os integrantes resolveram criar um novo projeto chamado <strong>Legis Edax</strong>, que tocava um metal ainda mais pesado e com letras em inglês. Com esse nome, lançaram um trabalho chamado <em>“Hideous Manipulation”</em> apenas na internet. O projeto acabou encerrado em 2008 por motivos pessoais. Hoje, os músicos encaram essa fase como parte da própria história da Atropina, servindo como uma transição para um som mais pesado.
          </p>
        </section>

        {/* FASE 3: O Retorno e a Nova Fase */}
        <section className="space-y-4 pt-6 border-t border-[#1a1a1a]">
          <div className="flex items-center gap-3 border-b border-[#262626] pb-3 mb-6">
            <span className="w-2 h-2 bg-[#8b0000] animate-pulse"></span>
            <h2 className="font-heading text-2xl md:text-3xl text-[#c8ff00] uppercase tracking-wider">
              O Retorno e a Nova Fase <span className="text-[#8b0000] font-mono text-lg md:text-xl">(2012–Presente)</span>
            </h2>
          </div>

          <p>
            Após quatro anos parada, a Atropina voltou com força total em 2012, resgatando seu nome original, o estilo pesado e as letras em português. O baterista Mateus Perotti retornou à banda em 2014 e ficou até 2018, período em que a banda gravou dois álbuns importantes:
          </p>

          <ul className="space-y-3 pl-4 border-l border-[#262626] my-4 font-mono text-sm md:text-base">
            <li className="flex items-start gap-2">
              <span className="text-[#8b0000] font-bold mt-0.5">•</span>
              <span>
                <strong className="text-[#c8ff00]">Mallevs Maleficarvm (2014):</strong> Um disco que conta a história de um antigo livro usado pela Inquisição para perseguir e castigar pessoas no passado.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#8b0000] font-bold mt-0.5">•</span>
              <span>
                <strong className="text-[#c8ff00]">Porões das Luxúrias (2016):</strong> Lançado para comemorar os 20 anos da banda, o álbum fala sobre a hipocrisia e os erros escondidos por líderes religiosos.
              </span>
            </li>
          </ul>

          <p>
            Posteriormente, o jovem Gian Rossi assumiu as baquetas para gravar o álbum <em>Prego em Carne Podre</em> (2021), trabalho produzido durante a pandemia que retrata um mundo que finalmente deixa de seguir as regras religiosas. O disco fez muito sucesso no Brasil e no exterior, sendo eleito um dos melhores álbuns de metal do mundo pela revista portuguesa <em>World of Metal</em>.
          </p>

          <p>
            Dando seguimento à trajetória, o baterista <strong>Jonas Jacobs</strong> assumiu as baquetas, marcando presença nos shows de estrada e preparando-se para gravar o novo álbum da banda, intitulado <em>A Liturgia da Morte</em>, com início das gravações marcado para este final de ano.
          </p>

          <div className="mt-8 pt-6 border-t border-[#262626] bg-black/40 p-4 border-l-2 border-[#c8ff00]">
            <p className="font-heading text-lg md:text-xl text-[#c8ff00] tracking-wide">
              Trabalhando de forma totalmente independente, a Atropina segue firme na estrada, levando seu som pesado e suas críticas para palcos de todo o Brasil.
            </p>
          </div>
        </section>
      </div>

      {/* Seção Integrantes */}
      <section className="relative z-10">
        <h2 className="font-heading text-4xl text-center text-[#c8ff00] mb-12 uppercase tracking-widest">
          Integrantes da banda
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {BAND_MEMBERS.map((member, index) => (
            <div 
              key={index} 
              className="bg-[#0f0f0f]/40 border border-[#1a1a1a] p-6 text-center hover:border-[#c8ff00] hover:shadow-[0_0_15px_rgba(200,255,0,0.1)] transition-all duration-300 group relative overflow-hidden"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#8b0000] to-transparent"></div>
              
              <h3 className="font-heading text-2xl text-[#c8ff00] group-hover:text-[#c8ff00] transition-colors mt-4 mb-2">
                {member.name}
              </h3>
              
              <p className="text-neutral-500 font-mono text-[11px] uppercase tracking-wider">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
