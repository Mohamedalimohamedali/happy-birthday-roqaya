import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Clock, Heart, PartyPopper } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isToday: boolean;
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isToday: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const currentYear = now.getFullYear();

      // target: 22 November 00:00:00 (Month 10 is November in JS 0-indexed)
      let target = new Date(currentYear, 10, 22, 0, 0, 0);

      // Check if today is 22 November
      if (now.getMonth() === 10 && now.getDate() === 22) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isToday: true,
        });
        return;
      }

      // If November 22 has already passed this year, count to next year
      if (now.getTime() > target.getTime()) {
        target = new Date(currentYear + 1, 10, 22, 0, 0, 0);
      }

      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isToday: true,
        });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isToday: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (n: number) => (n < 10 ? `0${n}` : `${n}`);

  if (timeLeft.isToday) {
    return (
      <motion.div
        className="my-8 mx-auto max-w-lg rounded-3xl border border-yellow-300/50 bg-gradient-to-r from-rose-500/30 via-pink-500/30 to-amber-500/30 p-6 text-center shadow-2xl backdrop-blur-xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring' }}
      >
        <div className="flex items-center justify-center gap-2 text-yellow-300 mb-2">
          <PartyPopper size={24} className="animate-bounce" />
          <span className="font-display text-xl font-bold">اليوم هو 22 نوفمبر!</span>
          <PartyPopper size={24} className="animate-bounce" />
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-gradient-gold">
          🎉 عيد ميلاد سعيد يا نور عيني 🎂
        </h3>
        <p className="mt-2 font-amiri text-lg text-rose-100">
          اليوم اتولدت أحلى وأغلى حاجة في حياتي وعوض ربنا ليا 💕👸🏼
        </p>
      </motion.div>
    );
  }

  const timeUnits = [
    ...(timeLeft.days > 0 ? [{ label: 'أيام', value: formatNumber(timeLeft.days) }] : []),
    { label: 'ساعات', value: formatNumber(timeLeft.hours) },
    { label: 'دقائق', value: formatNumber(timeLeft.minutes) },
    { label: 'ثواني', value: formatNumber(timeLeft.seconds) },
  ];

  return (
    <motion.div
      className="my-8 mx-auto w-full max-w-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      <div className="glass-pink relative overflow-hidden rounded-3xl border border-rose-300/40 bg-[#280c21]/90 p-6 shadow-2xl backdrop-blur-xl">
        {/* Glowing backdrop */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 h-20 w-48 rounded-full bg-rose-400/25 blur-2xl pointer-events-none" />

        <div className="flex items-center justify-center gap-2 mb-4 text-rose-200">
          <Clock size={16} className="text-yellow-300 animate-spin" />
          <span className="font-display text-sm font-semibold tracking-wide">
            العد التنازلي لعيد ميلاد رقيّة (22 نوفمبر) 🎂✨
          </span>
          <Heart size={16} className="text-rose-400 fill-rose-400 animate-pulse" />
        </div>

        {/* Counter cards */}
        <div className="grid grid-flow-col auto-cols-fr gap-3 sm:gap-4">
          {timeUnits.map((unit, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-center justify-center rounded-2xl border border-rose-300/30 bg-black/40 py-3 sm:py-4 px-2 shadow-inner"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring' }}
            >
              <span className="font-mono text-3xl sm:text-4xl font-black text-gradient-gold tracking-tight">
                {unit.value}
              </span>
              <span className="mt-1 font-cairo text-xs font-medium text-rose-200/80">
                {unit.label}
              </span>
            </motion.div>
          ))}
        </div>

        <p className="mt-4 text-center font-amiri text-sm text-rose-100/70">
          ساعات قليلة وتكمل فرحتي بأجمل يوم في السنة 💕
        </p>
      </div>
    </motion.div>
  );
}