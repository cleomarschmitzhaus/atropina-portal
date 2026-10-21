'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Minimize2, Disc, Loader2 } from 'lucide-react';
import { useMusic } from '@/context/MusicContext';

export default function AudioPlayer() {
  const {
    currentTrack,
    isPlaying,
    isBuffering,
    playlist,
    isMinimized,
    setIsMinimized,
    togglePlay,
    nextTrack,
    prevTrack,
    setIsPlaying,
    setIsBuffering,
  } = useMusic();

  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Mudo
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Transição de faixa (currentTrack): carrega nova fonte e inicia streaming
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack?.src) return;

    setLoadError(false);
    setProgress(0);
    setCurrentTime(0);

    // Atualiza a fonte de áudio e reinicia buffer
    audio.src = currentTrack.src;
    audio.load();

    if (isPlaying) {
      setIsBuffering(true);
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          if (err.name === 'AbortError') return;
          console.error('Falha ao iniciar faixa:', err);
          setIsBuffering(false);
        });
      }
    }
  }, [currentTrack?.src]);

  // Play / Pause manual
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack?.src) return;

    if (isPlaying) {
      if (audio.paused) {
        setIsBuffering(true);
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            if (err.name === 'AbortError') return;
            console.error('Falha ao dar play:', err);
            setIsBuffering(false);
          });
        }
      }
    } else {
      audio.pause();
      setIsBuffering(false);
    }
  }, [isPlaying]);

  if (!currentTrack) {
    return null;
  }

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const dur = audioRef.current.duration;
    setCurrentTime(current);
    if (dur && !isNaN(dur)) {
      setProgress((current / dur) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleCanPlay = () => {
    setIsBuffering(false);
    // Se deveria estar tocando mas o play inicial foi abortado pelo load, executa agora
    if (isPlaying && audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch((err) => {
        if (err.name === 'AbortError') return;
        console.error('Falha no play pós-canplay:', err);
      });
    }
  };

  const handlePlaying = () => {
    setIsBuffering(false);
    setIsPlaying(true);
  };

  const handleWaiting = () => {
    setIsBuffering(true);
  };

  const handleEnded = () => {
    setIsBuffering(true);
    nextTrack();
  };

  const handleError = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    const target = e.currentTarget;
    // Ignora se for interrupção de transição entre músicas (MEDIA_ERR_ABORTED = 1)
    if (target.error && target.error.code === 1) {
      return;
    }
    console.error('Falha ao carregar a faixa:', currentTrack.title, target.error);
    setIsBuffering(false);
    setLoadError(true);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !audioRef.current || !duration) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    audioRef.current.currentTime = percentage * duration;
    setProgress(percentage * 100);
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || !isFinite(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const toggleMute = () => setIsMuted(!isMuted);

  return (
    <div
      style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}
      className={`transition-all duration-500 shadow-[0_0_30px_rgba(139,0,0,0.25)] bg-[#050505]/95 backdrop-blur-md border border-[#8b0000]/50 flex flex-col overflow-hidden ${
        isMinimized ? 'w-14 h-14 rounded-none hover:border-[#c8ff00] hover:bg-[#8b0000]/20' : 'w-80 rounded-none'
      }`}
    >
      <audio
        ref={audioRef}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onCanPlay={handleCanPlay}
        onPlaying={handlePlaying}
        onWaiting={handleWaiting}
        onEnded={handleEnded}
        onError={handleError}
      />

      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="w-full h-full flex items-center justify-center text-[#8b0000] hover:text-[#c8ff00] transition-colors relative group overflow-hidden"
          aria-label="Abrir Player"
        >
          {currentTrack.coverUrl ? (
            <>
              <Image
                src={currentTrack.coverUrl}
                alt={currentTrack.album || currentTrack.title}
                fill
                className={`object-cover ${isPlaying ? 'brightness-110' : 'brightness-75 group-hover:brightness-100'} transition-all`}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
              {isBuffering ? (
                <Loader2
                  size={24}
                  className="absolute text-[#c8ff00] animate-spin drop-shadow-[0_0_6px_rgba(0,0,0,0.9)]"
                />
              ) : (
                <Disc
                  size={22}
                  className={`absolute text-[#c8ff00] drop-shadow-[0_0_6px_rgba(0,0,0,0.9)] transition-transform ${
                    isPlaying ? 'animate-spin' : ''
                  }`}
                />
              )}
            </>
          ) : (
            isBuffering ? (
              <Loader2 size={24} className="animate-spin text-[#c8ff00]" />
            ) : (
              <Disc size={24} className={`transition-transform ${isPlaying ? 'animate-spin' : ''}`} />
            )
          )}
          {isPlaying && !isBuffering && (
            <div className="absolute top-2 right-2 w-2 h-2 bg-[#c8ff00] shadow-[0_0_5px_#c8ff00] rounded-full animate-pulse z-10"></div>
          )}
          {isBuffering && (
            <div className="absolute top-2 right-2 w-2 h-2 bg-[#ffaa00] shadow-[0_0_5px_#ffaa00] rounded-full animate-ping z-10"></div>
          )}
        </button>
      ) : (
        <>
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 border-b border-[#1a1a1a] bg-[#000000]/60">
            <div className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 ${isBuffering ? 'bg-[#ffaa00] animate-ping' : 'bg-[#8b0000] animate-pulse'}`}></span>
              <span className="text-[10px] font-mono text-[#c8ff00]/80 uppercase tracking-widest flex items-center gap-1.5">
                {isBuffering ? 'Carregando Áudio...' : 'Reprodutor Profano'}
              </span>
            </div>
            <button
              onClick={() => setIsMinimized(true)}
              className="text-[#c8ff00]/80 hover:text-[#c8ff00] transition-colors p-1"
              aria-label="Minimizar"
            >
              <Minimize2 size={16} />
            </button>
          </div>

          <div className="p-4 flex flex-col gap-4">
            {/* Track Info com Capa Dinâmica do Álbum */}
            <div className="flex items-start gap-3">
              <div className="w-14 h-14 bg-[#111] border border-[#222] flex items-center justify-center flex-shrink-0 group relative overflow-hidden shadow-md">
                {currentTrack.coverUrl ? (
                  <>
                    <Image
                      src={currentTrack.coverUrl}
                      alt={currentTrack.album || currentTrack.title}
                      fill
                      className="object-cover"
                    />
                    {isBuffering ? (
                      <div className="absolute bottom-1 right-1 bg-black/80 p-1 rounded-full">
                        <Loader2 size={14} className="text-[#c8ff00] animate-spin" />
                      </div>
                    ) : isPlaying ? (
                      <div className="absolute bottom-1 right-1 bg-black/70 p-0.5 rounded-full">
                        <Disc size={12} className="text-[#c8ff00] animate-spin" />
                      </div>
                    ) : null}
                  </>
                ) : isBuffering ? (
                  <Loader2 size={20} className="text-[#c8ff00] animate-spin" />
                ) : (
                  <Disc size={20} className={`text-[#8b0000] ${isPlaying ? 'animate-spin' : ''}`} />
                )}
              </div>
              <div className="flex flex-col overflow-hidden justify-center h-14">
                <h4 className="text-[#c8ff00] font-mono text-sm tracking-wider truncate" title={currentTrack.title}>
                  {currentTrack.title}
                </h4>
                <p className="text-[#8b0000] text-xs font-mono tracking-widest uppercase truncate">
                  {currentTrack.album ? `${currentTrack.artist} — ${currentTrack.album}` : currentTrack.artist}
                </p>
                {isBuffering && (
                  <span className="text-[10px] font-mono text-[#c8ff00] animate-pulse">
                    ⚡ Conectando ao Drive...
                  </span>
                )}
              </div>
            </div>

            {loadError && (
              <p className="text-[10px] font-mono text-[#dc2626] tracking-wider uppercase border border-[#8b0000]/50 bg-[#8b0000]/10 px-2 py-1.5">
                Não foi possível carregar esta faixa. Tente outra.
              </p>
            )}

            {/* Barra de Progresso */}
            <div className="flex flex-col gap-1.5 mt-1">
              <div
                ref={progressBarRef}
                className="h-1.5 bg-[#141414] border border-[#222] w-full cursor-pointer relative group"
                onClick={handleProgressClick}
              >
                <div
                  className="h-full bg-[#c8ff00] relative transition-all duration-100 shadow-[0_0_8px_#c8ff00]"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-4 bg-[#f5f5f5] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
              <div className="flex justify-between items-center text-[10px] text-[#c8ff00]/80 font-mono tracking-widest">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controles */}
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-1">
                <button
                  onClick={toggleMute}
                  className="text-[#c8ff00]/80 hover:text-[#c8ff00] transition-colors p-1.5"
                  aria-label="Mudo"
                >
                  {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-16 accent-[#c8ff00]"
                  aria-label="Volume"
                />
              </div>

              <div className="flex items-center gap-3">
                {playlist.length > 1 && (
                  <button
                    onClick={prevTrack}
                    className="text-[#c8ff00]/80 hover:text-[#c8ff00] transition-colors"
                    aria-label="Anterior"
                  >
                    <SkipBack size={18} />
                  </button>
                )}

                <button
                  onClick={togglePlay}
                  className="w-10 h-10 flex items-center justify-center bg-[#111] border border-[#222] hover:border-[#8b0000] text-[#c8ff00] hover:text-[#8b0000] transition-all shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                  aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
                >
                  {isBuffering ? (
                    <Loader2 size={18} className="animate-spin text-[#c8ff00]" />
                  ) : isPlaying ? (
                    <Pause size={18} />
                  ) : (
                    <Play size={18} className="ml-1" />
                  )}
                </button>

                {playlist.length > 1 && (
                  <button
                    onClick={nextTrack}
                    className="text-[#c8ff00]/80 hover:text-[#c8ff00] transition-colors"
                    aria-label="Próximo"
                  >
                    <SkipForward size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
