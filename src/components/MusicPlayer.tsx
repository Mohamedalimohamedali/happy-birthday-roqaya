import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { getAssetUrl } from '../utils/assets';

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
    source: getAssetUrl('audio/ramy-kol-sana.mp3'),
  },
  {
    id: 'ramy-ehsasi-maak',
    title: 'إحساسي معاك',
    artist: 'رامي صبري',
    source: getAssetUrl('audio/ramy-ehsasi-maak.mp3'),
  },
];

interface MusicPlayerProps {
  activeTrackId: string;
  onTrackChange?: (trackId: string) => void;
  playSignal: number;
}

/**
 * مشغل صوتي يعمل بالكامل في الخلفية مع زر تحكم ناعم وشفاف في الزاوية العلوية
 */
export default function MusicPlayer({
  activeTrackId,
  playSignal,
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrackIdRef = useRef<string>(activeTrackId);
  const [muted, setMuted] = useState(false);

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

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack.source}
        preload="auto"
        loop
      />

      {/* زر كتم / تشغيل صوت صغير وشفاف في الزاوية العلوية */}
      <motion.button
        onClick={toggleMute}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed top-5 left-5 z-[90] flex h-10 w-10 items-center justify-center rounded-full border border-rose-300/30 bg-black/40 text-rose-200 shadow-lg backdrop-blur-md transition hover:bg-black/60 hover:text-white"
        aria-label={muted ? 'تشغيل الصوت' : 'كتم الصوت'}
        title={muted ? 'اضغطي لتشغيل الصوت' : 'اضغطي لكتم الصوت'}
      >
        {muted ? (
          <VolumeX size={18} className="text-rose-400" />
        ) : (
          <div className="relative">
            <Volume2 size={18} />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-rose-400 animate-ping" />
          </div>
        )}
      </motion.button>
    </>
  );
}