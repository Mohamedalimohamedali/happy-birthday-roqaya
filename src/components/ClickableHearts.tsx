import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Gift } from 'lucide-react';

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  emoji?: string;
  size?: number;
}

const heartEmojis = ['❤️', '💖', '💕', '🌸', '✨'];

/** قلوب تفاعلية تطير عند لمس أو النقر على أي مكان في الشاشة */
export default function ClickableHearts() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  const handleGlobalClick = useCallback((e: MouseEvent | TouchEvent) => {
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else {
      return;
    }

    const id = Date.now() + Math.random();
    const emoji = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    const size = Math.floor(Math.random() * 8) + 18;

    setHearts((prev) => [...prev.slice(-15), { id, x: clientX, y: clientY, emoji, size }]);

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id));
    }, 1400);
  }, []);

  useEffect(() => {
    window.addEventListener('click', handleGlobalClick);
    return () => {
      window.removeEventListener('click', handleGlobalClick);
    };
  }, [handleGlobalClick]);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            className="pointer-events-none fixed select-none"
            style={{ left: h.x - 12, top: h.y - 12 }}
            initial={{ opacity: 1, scale: 0.4, y: 0 }}
            animate={{
              opacity: 0,
              scale: 1.5,
              y: -90,
              x: (Math.random() - 0.5) * 50,
              rotate: (Math.random() - 0.5) * 40,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <span style={{ fontSize: `${h.size}px` }}>{h.emoji}</span>
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
          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-300 via-rose-400 to-rose-500 shadow-xl glow"
        >
          <Gift size={28} className="text-white" />
        </motion.div>
        <span className="font-cairo text-xs text-rose-200/80">
          {open ? '💖' : 'اضغطي هنا في حاجة صغيرة...'}
        </span>

        <AnimatePresence>
          {open && (
            <motion.div
              className="glass-pink absolute -top-20 z-20 rounded-2xl border border-rose-300/40 bg-[#280c21]/95 px-5 py-2.5 text-sm font-semibold text-rose-100 shadow-2xl backdrop-blur-xl"
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              انتي أجمل هدية وعوض في حياتي كلها 🎁💕
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}