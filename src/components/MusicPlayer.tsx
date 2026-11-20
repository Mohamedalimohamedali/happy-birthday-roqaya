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
    id: 'happy-birthday',
    title: 'Happy Birthday to You',
    artist: 'أغنية عيد الميلاد',
    source: '/audio/happy-birthday.mp3',
  },
];

interface MusicPlayerProps {
  activeTrackId: string;
  onTrackChange: (trackId: string) => void;
  playSignal: number;
}

/**
 * مشغل صوتي يعمل بالكامل في الخلفية بدون أي شريط أو ويدجت جانبي مزعج
 * يبدأ أغنية رامي صبري فور فتح الباسورد
 * وينتقل لأغنية هابي بيرث داي فور الضغط على الصورة
 */
export default function MusicPlayer({
  activeTrackId,
  playSignal,
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack =
    defaultTracks.find((t) => t.id === activeTrackId) || defaultTracks[0];

  // Sync track source
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.src.endsWith(currentTrack.source)) {
      audio.src = currentTrack.source;
      audio.load();
    }
  }, [currentTrack.source]);

  // Handle playSignal changes
  useEffect(() => {
    if (playSignal === 0) return;
    const audio = audioRef.current;
    if (!audio) return;

    const targetSrc = currentTrack.source;
    if (!audio.src.endsWith(targetSrc)) {
      audio.src = targetSrc;
    }

    audio.currentTime = 0;
    audio.volume = 0.9;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Autoplay waiting for user gesture:', err);
      });
    }
  }, [playSignal, currentTrack]);

  return (
    <audio
      ref={audioRef}
      src={currentTrack.source}
      preload="auto"
      loop={activeTrackId === 'ramy-kol-sana'}
    />
  );
}