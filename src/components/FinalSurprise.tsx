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
            className="group relative flex items-center gap-3 rounded-full bg-gradient-to-r from-rose-300 via-rose-400 to-rose-500 px-8 py-5 font-display text-lg font-bold text-white shadow-2xl glow animate-pulse-glow"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <Sparkles className="animate-gentle-float" size={22} />
            {content.finalSurprise.button}
            <Heart
              size={22}
              className="animate-gentle-float"
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
            {/* توهج خلفي */}
            <motion.div
              className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2"
              animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="h-72 w-72 rounded-full bg-rose-400/30 blur-3xl" />
            </motion.div>

            <div className="glass-pink max-w-xl rounded-3xl p-10 glow">
              <motion.div
                className="mb-4 text-4xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ❤️
              </motion.div>
              <p className="font-amiri text-xl leading-relaxed text-rose-50 sm:text-2xl">
                {content.finalSurprise.reveal}
              </p>
              <motion.div
                className="mt-6 flex items-center justify-center gap-2 text-rose-200"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <span className="font-display text-sm">
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
