import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Heart } from 'lucide-react';
import { content } from '../data';

/** رسالة بتأثير الكتابة التدريجي */
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
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(interval);
    }, 45);
    return () => clearInterval(interval);
  }, [started, fullText]);

  const done = typed.length === fullText.length;

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
          className="relative rounded-lg p-8 shadow-2xl sm:p-12"
          style={{
            background:
              'linear-gradient(135deg, #fffdf9 0%, #fff5f7 100%)',
            boxShadow:
              '0 20px 60px rgba(0,0,0,0.3), inset 0 0 40px rgba(236,72,153,0.05)',
          }}
        >
          {/* خطوط الورقة */}
          <div
            className="pointer-events-none absolute inset-6 opacity-20"
            style={{
              backgroundImage:
                'repeating-linear-gradient(transparent, transparent 31px, #ec489933 32px)',
            }}
          />
          {/* شريط جانبي */}
          <div className="absolute right-0 top-0 h-full w-1.5 bg-gradient-to-b from-rose-300 to-rose-500" />

          <div className="relative">
            <p
              className={`font-amiri whitespace-pre-line text-lg leading-relaxed text-gray-800 sm:text-xl ${
                done ? '' : 'caret'
              }`}
            >
              {typed}
            </p>

            {done && (
              <motion.div
                className="mt-8 flex items-center justify-end gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="font-amiri text-2xl text-rose-500">
                  {content.sender}
                </span>
                <Heart fill="#ec4899" className="text-rose-500" size={20} />
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
