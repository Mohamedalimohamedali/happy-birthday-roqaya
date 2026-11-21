import { useEffect, useRef } from 'react';

export interface Track {
  id: string;
  title: string;
  artist: string;
  source: string;
}

export const defaultTracks: Track[] = [
  {
    id: 'ramy-kol-sana',
    title: 'كل سنة',
    artist: 'رامي صبري',
    source: '/audio/ramy-kol-sana.mp3',
  },
  {
    id: 'ramy-ehsasi-maak',
    title: 'إحساسي معاك',
    artist: 'رامي صبري',
    source: '/audio/ramy-ehsasi-maak.mp3',
  },
];

interface MusicPlayerProps {
  activeTrackId: string;
  onTrackChange?: (trackId: string) => void;
  playSignal: number;
}

/**
 * مشغل صوتي يعمل بالكامل في الخلفية:
 * 1. يبدأ أغنية رامي صبري (كل سنة) فور كتابة كلمة السر وتستمر شغالة بدون إعادة عند فتح الهدية.
 * 2. عند الضغط على الصورة، ينتقل تلقائياً لأغنية (إحساسي معاك) لرامي صبري.
 * 3. عند الضغط على علامة الإغلاق (X)، يرجع مباشرة لأغنية رامي صبري الأولى (كل سنة).
 */
export default function MusicPlayer({
  activeTrackId,
  playSignal,
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrackIdRef = useRef<string>(activeTrackId);

  const currentTrack =
    defaultTracks.find((t) => t.id === activeTrackId) || defaultTracks[0];

  // Handle track switches or play signals
  useEffect(() => {
    if (playSignal === 0) return;
    const audio = audioRef.current;
    if (!audio) return;

    const trackChanged = currentTrackIdRef.current !== activeTrackId;
    currentTrackIdRef.current = activeTrackId;

    if (trackChanged || !audio.src.endsWith(currentTrack.source)) {
      audio.src = currentTrack.source;
      audio.currentTime = 0;
      audio.volume = 0.95;
      audio.play().catch((err) => {
        console.warn('Playback error:', err);
      });
    } else {
      // Same track: if already playing, DO NOT reset to 0
      if (audio.paused) {
        audio.play().catch((err) => {
          console.warn('Playback error:', err);
        });
      }
    }
  }, [playSignal, activeTrackId, currentTrack]);

  return (
    <audio
      ref={audioRef}
      src={currentTrack.source}
      preload="auto"
      loop
    />
  );
}