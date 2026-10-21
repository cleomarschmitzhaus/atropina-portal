'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Track, Album } from '@/types';
import { SAMPLE_TRACKS, MUSIC_SCRIPT_URL } from '@/lib/constants';
import { toStreamableSrc } from '@/lib/drive';

interface MusicContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  isBuffering: boolean;
  playlist: Track[];
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

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [playlist, setPlaylist] = useState<Track[]>(SAMPLE_TRACKS);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);

  // Carrega as músicas do Google Drive logo na inicialização da aplicação
  useEffect(() => {
    if (!MUSIC_SCRIPT_URL) return;

    fetch(MUSIC_SCRIPT_URL)
      .then((res) => res.json())
      .then((data: Album[]) => {
        if (Array.isArray(data) && data.length > 0) {
          const sortedAlbums = [...data].sort((a, b) => {
            return getAlbumInfo(a.title).order - getAlbumInfo(b.title).order;
          });

          const loadedTracks: Track[] = [];
          sortedAlbums.forEach((album) => {
            if (album.tracks && album.tracks.length > 0) {
              album.tracks.forEach((t) => {
                loadedTracks.push({
                  ...t,
                  title: cleanTrackTitle(t.title),
                  src: toStreamableSrc(t.src, t.id),
                  album: album.title,
                  coverUrl: t.coverUrl || album.coverUrl,
                });
              });
            }
          });

          if (loadedTracks.length > 0) {
            setPlaylist(loadedTracks);
          }
        }
      })
      .catch((err) => console.error('Erro ao carregar músicas do Drive:', err));
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
