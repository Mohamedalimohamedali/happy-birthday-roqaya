import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { content } from '../data';

export default function FinalSurprise({
  onReveal,
}: {
  onReveal?: () => void;
}) {
  const [revealed, setRevealed] = useState(false);

  const handle = () => {
    setRevealed(true);
    onReveal?.();
    setTimeout(() => onReveal?.(), 500);
  };

  return (
    <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
      <motion.h2
        className="font-display mb-8 text-3xl font-bold text-gradient-rose sm:text-5xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {content.finalSurprise.title}
      </motion.h2>

      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.button
            key="btn"
            onClick={handle}
            className="group relative flex items-center gap-3 rounded-full bg-gradient-to-r from-rose-400 via-rose-500 to-pink-500 px-9 py-5 font-display text-lg font-bold text-white shadow-2xl glow animate-pulse-glow"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <Sparkles className="animate-gentle-float text-yellow-300" size={24} />
            <span>{content.finalSurprise.button}</span>
            <Heart
              size={24}
              className="animate-gentle-float text-rose-200"
              fill="white"
            />
          </motion.button>
        ) : (
          <motion.div
            key="reveal"
            className="relative"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 120 }}
          >
            {/* نافورة قلوب متحركة تغطي المكان */}
            <div className="pointer-events-none absolute -inset-40 overflow-hidden">
              {Array.from({ length: 24 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute left-1/2 top-1/2 text-3xl select-none"
                  initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: 0,
                    scale: 1.8,
                    x: (Math.random() - 0.5) * 500,
                    y: -120 - Math.random() * 350,
                    rotate: (Math.random() - 0.5) * 60,
                  }}
                  transition={{ duration: 2.2, delay: i * 0.06 }}
                >
                  {['❤️', '💖', '💕', '✨', '🌸', '👸🏼', '💍'][i % 7]}
                </motion.span>
              ))}
            </div>

            {/* توهج خلفي مشع */}
            <motion.div
              className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2"
              animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0.85, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="h-80 w-80 rounded-full bg-gradient-to-tr from-rose-500/30 to-pink-400/30 blur-3xl" />
            </motion.div>

            <div className="glass-pink max-w-xl rounded-3xl border border-rose-300/40 bg-[#280c21]/95 p-8 shadow-2xl backdrop-blur-2xl glow sm:p-12">
              <motion.div
                className="mb-5 text-5xl"
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ❤️👸🏼
              </motion.div>
              <p className="font-amiri text-xl leading-relaxed text-rose-50 sm:text-2xl font-bold">
                {content.finalSurprise.reveal}
              </p>
              <motion.div
                className="mt-8 flex items-center justify-center gap-2 border-t border-rose-200/20 pt-6 text-rose-200"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <span className="font-display text-base font-bold">
                  {content.sender} 💕 {content.recipient}
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}