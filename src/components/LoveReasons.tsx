import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Shuffle } from 'lucide-react';

const reasons = [
  'إنك مش بس حبيبتي.. إنتي بنتي وصاحبتي ونور عيني وكل حاجة ليا في الدنيا 💕',
  'إنك أحلى حاجة في حياتي وأكبر عوض من ربنا ليا عشت أتمناه ✨',
  'خوفك عليا وحبك ليا وإنك بتشيليني زي ما مفيش حد في الكون بيعمل معايا 💖',
  'ابتسامتك اللي بتنور يومي وضحكتك اللي بتخليني أنسى أي تعب أو هم 🌸',
  'قلبك الأبيض وطيبتك اللي مهما لفيت ودورت مش هلاقي زيهم أبداً 👸🏼',
  'حلمي اللي بدعي بيه ربنا كل يوم: إنك تبقي معايا وفي بيتي قريب لآخر العمر 💍❤️',
];

export default function LoveReasons() {
  const [index, setIndex] = useState(0);

  const nextReason = () => {
    setIndex((prev) => (prev + 1) % reasons.length);
  };

  return (
    <section className="relative z-10 px-5 py-16 sm:py-20 text-center">
      <div className="mx-auto max-w-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-300/30 bg-rose-500/15 px-4 py-1.5 text-xs text-rose-200 mb-3">
          <Heart size={14} className="text-rose-400 fill-rose-400 animate-pulse" />
          <span>من القلب لرقيّة</span>
        </div>

        <h2 className="font-display mb-3 text-3xl font-bold text-gradient-rose sm:text-4xl">
          ليه إنتي كل حياتي؟ 💕
        </h2>
        <p className="mb-8 text-rose-100/70 text-sm sm:text-base">
          اضغطي على الزر عشان تشوفي حاجة جديدة بحبها فيكي
        </p>

        <div className="glass-pink relative overflow-hidden rounded-3xl border border-rose-300/40 bg-[#280c21]/90 p-8 shadow-2xl backdrop-blur-xl">
          <span className="font-mono text-xs font-semibold text-rose-300/80 mb-2 block">
            سبب رقم {index + 1} من {reasons.length}
          </span>

          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              className="font-amiri text-xl sm:text-2xl leading-relaxed text-rose-50 min-h-[90px] flex items-center justify-center font-bold"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {reasons[index]}
            </motion.p>
          </AnimatePresence>

          <div className="mt-6 flex justify-center">
            <motion.button
              onClick={nextReason}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-400 via-rose-500 to-pink-500 px-6 py-3 font-cairo text-sm font-bold text-white shadow-lg transition hover:scale-105 active:scale-95"
              whileTap={{ scale: 0.95 }}
            >
              <Shuffle size={16} />
              <span>سبب تاني بحبك عشانه ✨</span>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}