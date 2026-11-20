import { motion } from 'framer-motion';
import { Sparkles, ChevronDown } from 'lucide-react';
import { content } from '../data';
import BirthdayCake from './BirthdayCake';
import { HiddenGift } from './ClickableHearts';

export default function Hero({
  onCelebrate,
  onCakeDone,
}: {
  onCelebrate: () => void;
  onCakeDone?: () => void;
}) {
  return (
    <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
      {/* لمعة علوية */}
      <motion.div
        className="mb-4 flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-sm text-rose-200"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Sparkles size={14} />
        عيد ميلاد سعيد
      </motion.div>

      {/* العنوان الرئيسي */}
      <motion.h1
        className="font-display text-4xl font-black leading-tight sm:text-6xl md:text-7xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, type: 'spring' }}
      >
        <span className="shimmer-text block">{content.hero.title}</span>
      </motion.h1>

      {/* الاسم */}
      <motion.div
        className="my-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <span className="font-display text-3xl font-bold text-gradient-gold sm:text-5xl">
          {content.hero.name}
        </span>
      </motion.div>

      <motion.p
        className="mb-8 max-w-md font-amiri text-base leading-relaxed text-rose-100/80 sm:text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {content.hero.subtitle}
      </motion.p>

      {/* الكيكة */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, type: 'spring' }}
        className="my-6"
      >
        <BirthdayCake onAllBlown={onCakeDone} />
      </motion.div>

      {/* زر الاحتفال */}
      <motion.button
        onClick={onCelebrate}
        className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-rose-300 to-rose-500 px-8 py-4 font-display text-lg font-semibold text-white shadow-xl glow animate-pulse-glow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <Sparkles size={20} className="animate-gentle-float" />
        {content.hero.surpriseBtn}
      </motion.button>

      <HiddenGift />

      {/* سهم للأسفل */}
      <motion.div
        className="mt-8 text-rose-200/40"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
}
