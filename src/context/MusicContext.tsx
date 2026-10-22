'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Track, Album } from '@/types';
import { SAMPLE_TRACKS, MUSIC_SCRIPT_URL, DISCOGRAPHY } from '@/lib/constants';
import { toStreamableSrc } from '@/lib/drive';

interface MusicContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  isBuffering: boolean;
  playlist: Track[];
  albums: Album[];
  isLoadingAlbums: boolean;
  isMinimized: boolean;
  setIsMinimized: (val: boolean | ((prev: boolean) => boolean)) => void;
  playTrack: (track: Track, newPlaylist?: Track[]) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setIsPlaying: (playing: boolean) => void;
  setIsBuffering: (buffering: boolean) => void;
  setPlaylist: (tracks: Track[]) => void;
}

const ALBUM_METADATA: Record<string, { year: string; type: string; order: number }> = {
  'louvar a tudo por nada': { year: '1998', type: 'Demo / Remaster', order: 1 },
  'santos de porcelana': { year: '2001', type: 'Full-length', order: 2 },
  'legis edax': { year: '2005', type: 'EP / Side Project', order: 3 },
  'mallevs maleficarvm': { year: '2014', type: 'Full-length', order: 4 },
  'porões das luxúrias': { year: '2016', type: 'Full-length', order: 5 },
  'prego em carne podre': { year: '2021', type: 'Full-length', order: 6 },
};

export function getAlbumInfo(title: string) {
  const lower = title.toLowerCase();
  for (const [key, data] of Object.entries(ALBUM_METADATA)) {
    if (lower.includes(key)) {
      return data;
    }
  }
  return { year: '', type: 'Lançamento', order: 99 };
}

export function cleanTrackTitle(title: string): string {
  return title.replace(/^Atropina\s*-\s*.*?\s*-\s*/i, '').trim();
}

const DISCOGRAPHY_CACHE_KEY = 'atropina_discography_v1';

const FALLBACK_ALBUMS: Album[] = DISCOGRAPHY.map((item) => ({
  title: item.title,
  type: item.type,
  year: item.year,
  tracks: [],
}));

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [playlist, setPlaylist] = useState<Track[]>(SAMPLE_TRACKS);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoadingAlbums, setIsLoadingAlbums] = useState<boolean>(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);

  // Carrega a discografia e as músicas do Google Drive uma única vez com cache em sessionStorage
  useEffect(() => {
    if (!MUSIC_SCRIPT_URL) {
      setAlbums(FALLBACK_ALBUMS);
      setIsLoadingAlbums(false);
      return;
    }

    const controller = new AbortController();

    async function loadDiscography() {
      try {
        setIsLoadingAlbums(true);
        let rawData: Album[] | null = null;

        try {
          const cached = sessionStorage.getItem(DISCOGRAPHY_CACHE_KEY);
          if (cached) {
            const parsed = JSON.parse(cached);
            if (Array.isArray(parsed) && parsed.length > 0) {
              rawData = parsed;
            }
          }
        } catch {
          // Ignora erros de leitura do sessionStorage
        }

        if (!rawData) {
          const res = await fetch(MUSIC_SCRIPT_URL, { signal: controller.signal });
          if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
          }
          const fetched = await res.json();
          if (Array.isArray(fetched) && fetched.length > 0) {
            rawData = fetched;
            try {
              sessionStorage.setItem(DISCOGRAPHY_CACHE_KEY, JSON.stringify(fetched));
            } catch {
              // Ignora erros de quota do sessionStorage
            }
          }
        }

        if (Array.isArray(rawData) && rawData.length > 0) {
          const normalizedAlbums = rawData
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
                  album: album.title,
                  coverUrl: t.coverUrl || album.coverUrl,
                })),
              };
            })
            .sort((a, b) => (a.order || 99) - (b.order || 99));

          setAlbums(normalizedAlbums);

          const loadedTracks: Track[] = normalizedAlbums.flatMap((album) => album.tracks || []);
          if (loadedTracks.length > 0) {
            setPlaylist(loadedTracks);
          }
        } else {
          setAlbums(FALLBACK_ALBUMS);
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return;
        console.error('Erro ao carregar músicas do Drive:', err);
        setAlbums(FALLBACK_ALBUMS);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingAlbums(false);
        }
      }
    }

    loadDiscography();

    return () => controller.abort();
  }, []);

  const currentTrack = playlist.length > 0 ? playlist[currentTrackIndex] || playlist[0] : null;

  const playTrack = (track: Track, newPlaylist?: Track[]) => {
    let activePlaylist = playlist;
    if (newPlaylist && newPlaylist.length > 0) {
      activePlaylist = newPlaylist;
      setPlaylist(newPlaylist);
    }

    const index = activePlaylist.findIndex((t) => t.id === track.id || t.src === track.src);
    if (index !== -1) {
      setCurrentTrackIndex(index);
    } else {
      const updated = [...activePlaylist, track];
      setPlaylist(updated);
      setCurrentTrackIndex(updated.length - 1);
    }

    setIsBuffering(true);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const nextTrack = () => {
    if (playlist.length > 1) {
      setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
      setIsBuffering(true);
      setIsPlaying(true);
    }
  };

  const prevTrack = () => {
    if (playlist.length > 1) {
      setCurrentTrackIndex((prev) => (prev > 0 ? prev - 1 : playlist.length - 1));
      setIsBuffering(true);
      setIsPlaying(true);
    }
  };

  return (
    <MusicContext.Provider
      value={{
        currentTrack,
        isPlaying,
        isBuffering,
        playlist,
        albums,
        isLoadingAlbums,
        isMinimized,
        setIsMinimized,
        playTrack,
        togglePlay,
        nextTrack,
        prevTrack,
        setIsPlaying,
        setIsBuffering,
        setPlaylist,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}
