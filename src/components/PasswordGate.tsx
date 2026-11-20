import { FormEvent, useState } from 'react';
import { LockKeyhole, Sparkles, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState('');
  const [wrong, setWrong] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const clean = password.trim().toLowerCase();
    
    const valid = [
      'love',
      '1234',
      '0000',
      'رقية',
      'رقيّة',
      'بحبك',
      'حب',
      'حبيبتي',
    ];

    if (valid.includes(clean) || clean.includes('love') || clean.includes('رقي')) {
      onUnlock();
      return;
    }

    setWrong(true);
    setPassword('');
  };

  return (
    <motion.div
      className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#210b19] via-[#4c1d4a] to-[#1a0a14]" />
      <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-400/20 blur-3xl animate-pulse" />

      <motion.form
        onSubmit={submit}
        className="glass-pink relative z-10 w-full max-w-md rounded-3xl border border-rose-200/30 bg-[#280c21]/90 px-7 py-10 shadow-2xl backdrop-blur-2xl sm:px-12"
        initial={{ y: 30, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ type: 'spring' }}
      >
        <motion.div
          className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-rose-400 to-pink-500 text-white shadow-lg"
          animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <LockKeyhole size={28} />
        </motion.div>

        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="text-yellow-300" size={18} />
          <Heart className="text-rose-400 animate-pulse" size={18} fill="#f472b6" />
          <Sparkles className="text-yellow-300" size={18} />
        </div>

        <h1 className="font-display text-3xl font-bold text-gradient-rose">هدية خاصة لرقيّة 💕</h1>
        <p className="mt-3 font-amiri text-lg text-rose-100/80">
          اكتبي كلمة السر عشان تفتحي المفاجأة
        </p>

        <input
          autoFocus
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setWrong(false);
          }}
          type="password"
          autoComplete="off"
          placeholder="كلمة السر"
          className="mt-6 w-full rounded-2xl border border-rose-200/30 bg-black/30 px-5 py-4 text-center font-display text-xl tracking-[0.25em] text-white outline-none transition placeholder:text-sm placeholder:tracking-normal placeholder:text-rose-100/40 focus:border-rose-300 focus:ring-2 focus:ring-rose-300/30"
        />

        <button
          type="submit"
          className="mt-4 w-full rounded-2xl bg-gradient-to-r from-rose-400 via-rose-500 to-pink-500 px-5 py-4 font-display text-lg font-bold text-white shadow-xl glow transition hover:scale-[1.02] active:scale-[0.98]"
        >
          افتحي الهدية ✨
        </button>

        <div className="mt-4 min-h-[24px]">
          {wrong && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-medium text-rose-200"
            >
              كلمة السر مش صح، جربي تاني ❤️
            </motion.p>
          )}
        </div>
      </motion.form>
    </motion.div>
  );
}