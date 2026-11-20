import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  left: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
  shape: 'rect' | 'circle';
}

const COLORS = ['#f472b6', '#ec4899', '#fcd34d', '#fbcfe8', '#fde68a', '#be185d'];

/** انفجار كونفيتي - استدعيه وقت ما تحب */
export default function Confetti({
  active,
  count = 120,
}: {
  active: boolean;
  count?: number;
}) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (!active) {
      setPieces([]);
      return;
    }
    const arr: ConfettiPiece[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 6 + Math.random() * 10,
      duration: 2.5 + Math.random() * 3,
      delay: Math.random() * 0.6,
      shape: Math.random() > 0.5 ? 'rect' : 'circle',
    }));
    setPieces(arr);
    const t = setTimeout(() => setPieces([]), 6000);
    return () => clearTimeout(t);
  }, [active, count]);

  if (!pieces.length) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden no-select">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute top-0"
          style={{
            left: `${p.left}%`,
            width: p.shape === 'rect' ? `${p.size}px` : `${p.size}px`,
            height: p.shape === 'rect' ? `${p.size * 1.6}px` : `${p.size}px`,
            background: p.color,
            borderRadius: p.shape === 'circle' ? '50%' : '2px',
            animation: `confetti-fall ${p.duration}s ease-in ${p.delay}s forwards`,
          }}
        />
      ))}
    </div>
  );
}
