import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, CakeSlice } from 'lucide-react';

interface Candle {
  id: number;
  lit: boolean;
}

/** كيكة عيد ميلاد تفاعلية - الزائر ينفخ الشموع */
export default function BirthdayCake({
  onAllBlown,
}: {
  onAllBlown?: () => void;
}) {
  const [candles, setCandles] = useState<Candle[]>(
    Array.from({ length: 5 }, (_, i) => ({ id: i, lit: true }))
  );

  const blow = () => {
    setCandles((prev) => {
      const next = prev.map((c) => ({ ...c, lit: false }));
      if (next.every((c) => !c.lit)) setTimeout(() => onAllBlown?.(), 400);
      return next;
    });
  };

  const relight = () =>
    setCandles((prev) => prev.map((c) => ({ ...c, lit: true })));

  const allOut = candles.every((c) => !c.lit);

  return (
    <div className="flex flex-col items-center no-select">
      <div className="relative">
        {/* الشموع */}
        <div className="flex items-end justify-center gap-3">
          {candles.map((c) => (
            <div key={c.id} className="relative flex flex-col items-center">
              {/* اللهب */}
              <AnimatePresence>
                {c.lit && (
                  <motion.div
                    className="flame relative -mb-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                  >
                    <div className="h-5 w-3 rounded-full bg-gradient-to-t from-orange-500 via-yellow-300 to-yellow-100 blur-[1px]" />
                    <div className="absolute left-1/2 top-1 h-2 w-1.5 -translate-x-1/2 rounded-full bg-blue-400/70" />
                  </motion.div>
                )}
              </AnimatePresence>
              {/* الشمعة */}
              <div className="h-10 w-1.5 rounded-t-sm bg-gradient-to-b from-rose-100 to-rose-300" />
            </div>
          ))}
        </div>

        {/* الكيكة - طبقات */}
        <div className="relative mt-1">
          {/* الطبقة العلوية */}
          <div className="relative mx-auto h-14 w-44 rounded-t-xl rounded-b-md bg-gradient-to-b from-rose-200 to-rose-300 shadow-lg">
            {/* كريمة */}
            <div className="absolute inset-x-0 top-0 h-3 rounded-t-xl bg-white/80" />
            {/* نقط كريمة */}
            <div className="absolute -top-2 left-0 flex w-full justify-around">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="h-3 w-3 rounded-full bg-rose-100 shadow-sm" />
              ))}
            </div>
          </div>
          {/* الطبقة السفلية */}
          <div className="relative mx-auto -mt-1 h-16 w-56 rounded-md bg-gradient-to-b from-rose-400 to-rose-500 shadow-xl">
            <div className="absolute inset-x-0 top-0 h-3 bg-rose-300/80" />
            <div className="absolute -top-2 left-0 flex w-full justify-around">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="h-3 w-3 rounded-full bg-rose-200 shadow-sm" />
              ))}
            </div>
            {/* لوحة الاسم */}
            <div className="absolute inset-x-0 bottom-3 flex justify-center">
              <span className="font-display rounded-full bg-white/20 px-4 py-0.5 text-sm text-white">
                🎂
              </span>
            </div>
          </div>
          {/* الطبق */}
          <div className="mx-auto h-2 w-64 rounded-full bg-white/10" />
        </div>
      </div>

      {/* زر النفخ */}
      <div className="mt-6 flex flex-col items-center gap-2">
        <AnimatePresence mode="wait">
          {!allOut ? (
            <motion.button
              key="blow"
              onClick={blow}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-300 to-rose-500 px-6 py-3 font-cairo text-white shadow-lg glow transition-transform hover:scale-105 active:scale-95"
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Wind size={18} />
              انفخي الشموع
            </motion.button>
          ) : (
            <motion.div
              key="wishes"
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.p
                className="font-display text-lg text-gradient-gold"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                اتمني أمنية! ✨
              </motion.p>
              <button
                onClick={relight}
                className="flex items-center gap-2 rounded-full border border-rose-300/40 bg-white/5 px-5 py-2 text-sm text-rose-100 transition hover:bg-white/10"
              >
                <CakeSlice size={16} />
               ولّعيها تاني
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
