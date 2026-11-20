import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { timeline } from '../data';

export default function Timeline() {
  return (
    <section id="timeline" className="relative z-10 px-5 py-20 sm:py-28">
      <motion.h2
        className="font-display mb-3 text-center text-3xl font-bold text-gradient-rose sm:text-4xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        رحلتنا مع بعض
      </motion.h2>
      <p className="mb-14 text-center text-rose-100/60">
        لحظات مرّت وبقيت أحلى ذكريات
      </p>

      <div className="relative mx-auto max-w-3xl">
        {/* الخط العمودي */}
        <div className="absolute right-4 top-0 h-full w-0.5 bg-gradient-to-b from-rose-300 via-rose-400 to-rose-600 sm:right-1/2 sm:translate-x-1/2" />

        <div className="space-y-10">
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              className={`relative flex items-start gap-6 ${
                i % 2 === 0 ? 'sm:flex-row-reverse' : ''
              }`}
              initial={{ opacity: 0, x: i % 2 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', delay: 0.1 }}
            >
              {/* النقطة */}
              <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-rose-300 bg-[#3b1232] shadow-lg sm:absolute sm:right-1/2 sm:translate-x-1/2">
                <Sparkles size={14} className="text-rose-300" />
              </div>

              {/* البطاقة */}
              <div
                className={`glass-pink flex-1 rounded-2xl p-5 sm:w-[calc(50%-2rem)] sm:flex-1 ${
                  i % 2 === 0 ? 'sm:ms-auto' : 'sm:me-auto'
                }`}
                style={{
                  background: `linear-gradient(135deg, hsla(${
                    item.hue
                  }, 70%, 50%, 0.12), hsla(${item.hue + 20}, 60%, 40%, 0.08))`,
                }}
              >
                <span className="font-cairo text-xs text-rose-200/70">
                  {item.date}
                </span>
                <h3 className="font-display mt-1 text-xl font-bold text-rose-100">
                  {item.title}
                </h3>
                <p className="font-amiri mt-2 leading-relaxed text-rose-50/80">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
