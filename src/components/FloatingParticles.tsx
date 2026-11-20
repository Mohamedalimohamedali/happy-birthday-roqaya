import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  emoji: string;
}

const EMOJIS = ['❤️', '✨', '🌸', '💕', '⭐', '💖', '🌹'];

/** قلوب ونجوم طايرة في الخلفية */
export default function FloatingParticles({ count = 18 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const arr: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 12 + Math.random() * 22,
      duration: 9 + Math.random() * 12,
      delay: Math.random() * 12,
      drift: (Math.random() - 0.5) * 120,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    }));
    setParticles(arr);
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden no-select">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute bottom-0"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animation: `float-up ${p.duration}s linear ${p.delay}s infinite`,
            ['--drift' as string]: `${p.drift}px`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
