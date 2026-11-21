import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Heart, Sparkles } from 'lucide-react';
import { content } from '../data';

/** رسالة بتأثير الكتابة التدريجي مع إمكانية الإظهار الفوري بالنقر */
export default function Letter() {
  const fullText = content.letter.body;
  const [typed, setTyped] = useState('');
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setStarted(true);
      },
      { threshold: 0.25 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      i += 2; // سرعة مضاعفة ومريحة
      if (i >= fullText.length) {
        setTyped(fullText);
        clearInterval(interval);
      } else {
        setTyped(fullText.slice(0, i));
      }
    }, 22);
    return () => clearInterval(interval);
  }, [started, fullText]);

  const done = typed.length === fullText.length;

  const handleRevealAll = () => {
    setTyped(fullText);
  };

  return (
    <section id="letter" className="relative z-10 px-5 py-20 sm:py-28">
      <motion.div
        ref={ref}
        className="mx-auto max-w-2xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="mb-6 flex items-center justify-center gap-3">
          <Mail className="text-rose-200" size={24} />
          <h2 className="font-display text-3xl font-bold text-gradient-rose sm:text-4xl">
            {content.letter.title}
          </h2>
        </div>

        {/* ورقة الرسالة */}
        <div
          onClick={handleRevealAll}
          className="relative rounded-2xl p-8 shadow-2xl transition sm:p-12 cursor-pointer hover:shadow-rose-500/10"
          style={{
            background:
              'linear-gradient(135deg, #fffdf9 0%, #fff5f7 100%)',
            boxShadow:
              '0 20px 60px rgba(0,0,0,0.35), inset 0 0 40px rgba(236,72,153,0.06)',
          }}
          title={!done ? 'اضغطي لعرض الرسالة كاملة فوراً' : ''}
        >
          {/* خطوط الورقة */}
          <div
            className="pointer-events-none absolute inset-6 opacity-20"
            style={{
              backgroundImage:
                'repeating-linear-gradient(transparent, transparent 31px, #ec489933 32px)',
            }}
          />
          {/* شريط جانبي وردي */}
          <div className="absolute right-0 top-0 h-full w-2 rounded-r-2xl bg-gradient-to-b from-rose-300 via-rose-400 to-rose-500" />

          <div className="relative">
            <p
              className={`font-amiri whitespace-pre-line text-lg leading-relaxed text-gray-800 sm:text-xl font-medium ${
                done ? '' : 'caret'
              }`}
            >
              {typed}
            </p>

            {!done && (
              <div className="mt-4 text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 px-3.5 py-1 text-xs text-rose-600 font-cairo">
                  <Sparkles size={12} /> اضغطي على الورقة لقراءتها كاملة فوراً
                </span>
              </div>
            )}

            {done && (
              <motion.div
                className="mt-8 flex items-center justify-end gap-2 border-t border-rose-200/40 pt-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <span className="font-amiri text-2xl font-bold text-rose-500">
                  {content.sender} 💕
                </span>
                <Heart fill="#ec4899" className="text-rose-500 animate-pulse" size={22} />
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}