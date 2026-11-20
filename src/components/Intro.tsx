import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles } from 'lucide-react';
import { content } from '../data';

/** شاشة الافتتاح بصندوق الهدية */
export default function Intro({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    setOpening(true);
    setTimeout(onOpen, 1600);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-6 text-center no-select"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8 }}
    >
      {/* خلفية متدرجة */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a0f1e] via-[#4c1d4a] to-[#1a0a14]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,114,182,0.25),transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 flex flex-col items-center"
      >
        <Sparkles className="mb-4 text-rose-200" size={28} />

        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-rose-300/30 bg-rose-500/20 px-4 py-1.5 text-xs text-rose-100 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-rose-400 animate-ping" />
          🎵 رامي صبري: كل سنة في حياتنا وانتي صاحبتي وبنتي وحبيبتي
        </div>

        <p className="mb-2 font-amiri text-lg text-rose-100/70 sm:text-xl">
          من {content.sender}...
        </p>

        <h1 className="font-display mb-10 text-3xl font-bold text-gradient-rose sm:text-5xl">
          {content.intro.line}
        </h1>

        {/* صندوق الهدية */}
        <motion.div
          className="relative mb-10"
          animate={opening ? { y: -30, scale: 1.1 } : { y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="relative"
            animate={
              opening
                ? { rotateX: 180, y: -120, opacity: 0 }
                : { rotateX: 0, y: 0, opacity: 1 }
            }
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* الغطاء */}
            <div className="mx-auto h-8 w-32 rounded-t-lg bg-gradient-to-r from-rose-300 via-rose-400 to-rose-300 shadow-lg" />
            <div className="mx-auto h-1 w-32 bg-rose-500/40" />
            {/* الصندوق */}
            <div className="mx-auto h-24 w-28 rounded-b-lg bg-gradient-to-b from-rose-400 to-rose-600 shadow-xl">
              <div className="flex h-full items-center justify-center">
                <div className="h-full w-3 bg-rose-200/60" />
              </div>
            </div>
            {/* العقدة */}
            <div className="absolute left-1/2 top-2 -translate-x-1/2">
              <div className="h-6 w-10 rounded-full bg-rose-200 shadow" />
              <div className="mx-auto h-6 w-6 rotate-45 rounded bg-rose-100 shadow" />
            </div>
          </motion.div>

          {/* توهج عند الفتح */}
          <AnimatePresence>
            {opening && (
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 4, opacity: 0 }}
                transition={{ duration: 1.2 }}
              >
                <div className="h-40 w-40 rounded-full bg-rose-200 blur-2xl" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* زر فتح الهدية */}
        <AnimatePresence>
          {!opening && (
            <motion.button
              onClick={handleOpen}
              className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-rose-300 to-rose-500 px-8 py-4 font-display text-lg font-semibold text-white shadow-lg glow transition-transform hover:scale-105 active:scale-95"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Gift
                size={22}
                className="transition-transform group-hover:rotate-12"
              />
              {content.intro.button}
            </motion.button>
          )}
        </AnimatePresence>

        {/* قلوب بتطلع من الهدية */}
        {opening && (
          <div className="pointer-events-none absolute inset-0">
            {Array.from({ length: 14 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute left-1/2 top-1/2 text-2xl"
                initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: 0,
                  scale: 1.5,
                  x: (Math.random() - 0.5) * 400,
                  y: -200 - Math.random() * 300,
                }}
                transition={{ duration: 1.5, delay: i * 0.05 }}
              >
                {['❤️', '✨', '💖', '🌸'][i % 4]}
              </motion.span>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
