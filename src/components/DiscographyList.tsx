'use client';

import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { Play, Pause, Volume2, Disc, Music, Loader2 } from 'lucide-react';
import { useMusic } from '@/context/MusicContext';
import { DISCOGRAPHY, MUSIC_SCRIPT_URL } from '@/lib/constants';
import { Album, Track } from '@/types';
import { toStreamableSrc } from '@/lib/drive';

// Metadados e ordenação cronológica oficial da horda Atropina
const ALBUM_METADATA: Record<string, { year: string; type: string; order: number }> = {
  'louvar a tudo por nada': { year: '1998', type: 'Demo / Remaster', order: 1 },
  'santos de porcelana': { year: '2001', type: 'Full-length', order: 2 },
  'legis edax': { year: '2005', type: 'EP / Side Project', order: 3 },
  'mallevs maleficarvm': { year: '2014', type: 'Full-length', order: 4 },
  'porões das luxúrias': { year: '2016', type: 'Full-length', order: 5 },
  'prego em carne podre': { year: '2021', type: 'Full-length', order: 6 },
};

function getAlbumInfo(title: string) {
  const lower = title.toLowerCase();
  for (const [key, data] of Object.entries(ALBUM_METADATA)) {
    if (lower.includes(key)) {
      return data;
    }
  }
  return { year: '', type: 'Lançamento', order: 99 };
}

function cleanTrackTitle(title: string): string {
  return title.replace(/^Atropina\s*-\s*.*?\s*-\s*/i, '').trim();
}

export default function DiscographyList() {
  const { currentTrack, isPlaying, isBuffering, playTrack, togglePlay } = useMusic();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!MUSIC_SCRIPT_URL) {
      setAlbums(
        DISCOGRAPHY.map((item) => ({
          title: item.title,
          type: item.type,
          year: item.year,
          tracks: [],
        }))
      );
      return;
    }

    setIsLoading(true);
    fetch(MUSIC_SCRIPT_URL)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const cleaned = data
            .map((album: Album) => {
              const meta = getAlbumInfo(album.title);
              return {
                ...album,
                year: album.year || meta.year,
                type: album.type || meta.type,
                order: meta.order,
                tracks: (album.tracks || []).map((t: Track) => ({
                  ...t,
                  title: cleanTrackTitle(t.title),
                  src: toStreamableSrc(t.src, t.id),
                })),
              };
            })
            // Garante ordenação cronológica exata: Louvar a Tudo por Nada -> Santos de Porcelana -> ...
            .sort((a, b) => (a.order || 99) - (b.order || 99));

          setAlbums(cleaned);
        } else {
          setAlbums(
            DISCOGRAPHY.map((item) => ({
              title: item.title,
              type: item.type,
              year: item.year,
              tracks: [],
            }))
          );
        }
      })
      .catch((err) => {
        console.error('Falha ao carregar álbuns do Google Drive:', err);
        setAlbums(
          DISCOGRAPHY.map((item) => ({
            title: item.title,
            type: item.type,
            year: item.year,
            tracks: [],
          }))
        );
      })
      .finally(() => setIsLoading(false));
  }, []);

  // Lista com todas as músicas de todos os álbuns combinadas para a playlist contínua
  const allTracks = useMemo(() => {
    const list: Track[] = [];
    albums.forEach((album) => {
      if (album.tracks && album.tracks.length > 0) {
        album.tracks.forEach((t) => {
          list.push({
            ...t,
            album: album.title,
            coverUrl: t.coverUrl || album.coverUrl,
          });
        });
      }
    });
    return list;
  }, [albums]);

  return (
    <div className="relative z-10 space-y-8">
      {isLoading && (
        <div className="flex items-center justify-center p-8 text-[#c8ff00] font-mono text-sm tracking-widest animate-pulse">
          <Disc size={20} className="animate-spin mr-3 text-[#8b0000]" />
          CARREGANDO DISCOGRAFIA E ÁUDIOS DO DRIVE...
        </div>
      )}

      {albums.map((album, index) => (
        <div
          key={album.id || album.title + index}
          className="bg-[#0f0f0f]/50 border border-[#1a1a1a] p-6 md:p-8 flex flex-col md:flex-row gap-8 hover:border-[#8b0000]/60 hover:shadow-[0_0_25px_rgba(139,0,0,0.2)] transition-all duration-300 rounded-sm relative overflow-hidden group"
        >
          {/* Identificador de catálogo cronológico */}
          <div className="absolute top-3 right-3 text-[10px] font-mono text-neutral-600 tracking-wider">
            ID: ATRP_{String(index + 1).padStart(2, '0')}
          </div>

          {/* Capa do Álbum (Real do Drive ou Fallback estilizado) */}
          <div className="w-full md:w-52 h-52 bg-[#050505] border border-[#262626] group-hover:border-[#c8ff00] shrink-0 flex items-center justify-center relative overflow-hidden shadow-md transition-all">
            {album.coverUrl ? (
              <>
                <Image
                  src={album.coverUrl}
                  alt={`Capa do álbum ${album.title}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-tr from-[#050505] to-[#141414]">
                <Music size={28} className="text-[#8b0000] mb-2 opacity-50" />
                <span className="font-heading text-lg text-neutral-500 group-hover:text-[#c8ff00] transition-colors tracking-widest text-center">
                  ATROPINA
                </span>
                <span className="font-mono text-[9px] text-[#8b0000] tracking-widest uppercase text-center mt-1">
                  {album.type || 'Lançamento'}
                </span>
                <span className="font-heading text-sm text-[#c8ff00] text-center mt-3">{album.year}</span>
              </div>
            )}
          </div>

          {/* Detalhes do Álbum e Lista de Músicas */}
          <div className="flex-grow text-left flex flex-col justify-start">
            <div className="flex items-baseline gap-3 mb-1">
              <h3 className="font-heading text-3xl md:text-4xl text-[#c8ff00] group-hover:text-[#c8ff00] transition-colors uppercase tracking-wider">
                {album.title}
              </h3>
            </div>

            <div className="flex gap-4 font-mono text-xs text-[#c8ff00]/70 mb-4">
              {album.year && <span>ANO: {album.year}</span>}
              {album.year && album.type && <span>•</span>}
              {album.type && <span className="uppercase">{album.type}</span>}
            </div>

            {/* Lista de Faixas com Play/Pause */}
            {album.tracks && album.tracks.length > 0 ? (
              <div className="mt-2 space-y-2 border-t border-[#1e1e1e] pt-4">
                <h4 className="text-[11px] font-mono text-[#c8ff00]/60 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <Disc size={13} className="text-[#8b0000]" />
                  Faixas disponíveis ({album.tracks.length}):
                </h4>
                <div className="grid grid-cols-1 gap-1.5">
                  {album.tracks.map((track, trackIdx) => {
                    const isThisCurrentTrack = currentTrack?.src === track.src;
                    const isThisTrackBuffering = isBuffering && isThisCurrentTrack;
                    const isThisTrackPlaying = isPlaying && isThisCurrentTrack && !isThisTrackBuffering;

                    return (
                      <button
                        key={track.id || trackIdx}
                        onClick={() => {
                          if (isThisCurrentTrack) {
                            if (isThisTrackBuffering) return;
                            togglePlay();
                          } else {
                            playTrack(
                              {
                                ...track,
                                album: album.title,
                                coverUrl: track.coverUrl || album.coverUrl,
                              },
                              allTracks
                            );
                          }
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-left font-mono text-xs border transition-all ${
                          isThisCurrentTrack
                            ? 'bg-[#c8ff00]/10 border-[#c8ff00] text-[#c8ff00]'
                            : 'bg-[#050505]/70 border-[#1a1a1a] text-[#c8ff00]/80 hover:border-[#c8ff00]/50 hover:text-[#c8ff00]'
                        }`}
                      >
                        <div className="flex items-center gap-3 truncate">
                          <span className="text-[#8b0000] font-bold text-[11px] w-5">
                            {String(trackIdx + 1).padStart(2, '0')}
                          </span>
                          <span className="truncate">{track.title}</span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 ml-3">
                          {isThisTrackBuffering ? (
                            <span className="flex items-center gap-1.5 text-[#c8ff00] font-bold text-[11px]">
                              <Loader2 size={13} className="animate-spin text-[#c8ff00]" />
                              <span className="hidden sm:inline animate-pulse">CARREGANDO...</span>
                            </span>
                          ) : isThisTrackPlaying ? (
                            <span className="flex items-center gap-1.5 text-[#c8ff00] font-bold text-[11px]">
                              <Volume2 size={14} className="animate-pulse" />
                              <span className="hidden sm:inline">TOCANDO</span>
                            </span>
                          ) : (
                            <span className="flex items-center gap-1.5 text-neutral-400 hover:text-[#c8ff00] text-[11px]">
                              <Play size={12} />
                              <span className="hidden sm:inline">TOCAR</span>
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-sm text-[#c8ff00]/80 font-mono italic mt-2">
                Disponível nas plataformas digitais e mídias físicas.
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
