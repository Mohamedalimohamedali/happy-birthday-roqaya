import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Gift } from 'lucide-react';

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
}

/** قلوب قابلة للنقر - بتطلع قلوب صغيرة عند النقر */
export default function ClickableHearts() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  const spawn = useCallback((e: React.MouseEvent) => {
    const id = Date.now() + Math.random();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setHearts((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id));
    }, 1500);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-30">
      {Array.from({ length: 6 }).map((_, i) => (
        <button
          key={i}
          onClick={spawn}
          className="pointer-events-auto absolute no-select"
          style={{
            top: `${15 + i * 14}%`,
            left: `${8 + (i % 3) * 30}%`,
          }}
          aria-label="قلب"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.15, 1],
              opacity: [0.5, 0.9, 0.5],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
          >
            <Heart
              size={22 + (i % 3) * 6}
              className="text-rose-300/60"
              fill="#f472b6"
            />
          </motion.div>
        </button>
      ))}

      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            className="pointer-events-none absolute"
            style={{ left: h.x, top: h.y }}
            initial={{ opacity: 1, scale: 0.5, y: 0 }}
            animate={{ opacity: 0, scale: 1.8, y: -80 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <Heart size={20} className="text-rose-400" fill="#ec4899" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/** صندوق هدية مخفي يكشف رسالة عند النقر */
export function HiddenGift() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-center py-8">
      <button
        onClick={() => setOpen(!open)}
        className="group relative flex flex-col items-center gap-2"
        aria-label="هدية مخفية"
      >
        <motion.div
          animate={open ? { rotate: -15, y: -6 } : { rotate: 0, y: 0 }}
          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-300 to-rose-500 shadow-lg glow"
        >
          <Gift size={28} className="text-white" />
        </motion.div>
        <span className="font-cairo text-xs text-rose-200/70">
          {open ? '💖' : 'في حاجة صغيرة...'}
        </span>

        <AnimatePresence>
          {open && (
            <motion.div
              className="glass-pink absolute -top-20 rounded-xl px-4 py-2 text-sm text-rose-50 shadow-lg"
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              انتي أجمل هدية في حياتي 🎁
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
