import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Music, Sparkles, ImagePlus, Cake } from 'lucide-react';
import { gallery as initialGallery } from '../data';

interface GalleryProps {
  onPhotoOpen?: () => void;
  onSwitchToRamy?: () => void;
}

export default function Gallery({ onPhotoOpen, onSwitchToRamy }: GalleryProps) {
  const [galleryItems, setGalleryItems] = useState(initialGallery);
  const [selected, setSelected] = useState<(typeof initialGallery)[number] | null>(null);
  const [imageError, setImageError] = useState(false);

  const memory = galleryItems[0];

  const handleCustomPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImageError(false);
    setGalleryItems((prev) => [
      {
        ...prev[0],
        image: url,
        caption: file.name.replace(/\.[^/.]+$/, '') || 'صورتنا الحلوة',
      },
    ]);
  };

  const handlePhotoClick = () => {
    setSelected(memory);
    onPhotoOpen?.();
  };

  return (
    <section id="memories" className="relative z-10 px-5 py-20 sm:py-28">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-rose-400/10 px-4 py-1.5 text-xs text-rose-200 border border-rose-300/20 mb-3">
          <Sparkles size={14} className="text-yellow-300" />
          اضغطي على الصورة وشوفي المفاجأة 🎶
        </div>
        <h2 className="font-display mb-3 text-3xl font-bold text-gradient-rose sm:text-5xl">
          أجمل ذكرى لينا 💕
        </h2>
        <p className="mb-10 text-rose-100/70 text-base sm:text-lg">
          صورة واحدة.. بس فيها حكاية وسنين من الحب
        </p>
      </motion.div>

      {/* Main photo card */}
      <motion.div
        className="relative mx-auto max-w-3xl cursor-pointer group"
        initial={{ opacity: 0, scale: 0.9, y: 35 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, type: 'spring' }}
        whileHover={{ scale: 1.015 }}
        onClick={handlePhotoClick}
      >
        {/* Glowing backdrop */}
        <motion.div
          className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-rose-500/25 via-pink-400/20 to-amber-300/20 blur-2xl"
          animate={{ opacity: [0.5, 0.85, 0.5], scale: [0.98, 1.03, 0.98] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-md sm:p-6">
          <div className="relative overflow-hidden rounded-2xl bg-black/40">
            {imageError || !memory.image ? (
              <div className="flex h-96 w-full flex-col items-center justify-center bg-gradient-to-br from-rose-950/60 to-purple-950/60 p-8 text-center text-rose-100">
                <Heart size={64} className="text-rose-400 animate-pulse mb-4" />
                <p className="font-display text-2xl font-bold">{memory.caption}</p>
                <p className="mt-2 text-sm text-rose-200/70">{memory.date}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-rose-500/30 px-4 py-2 text-xs font-semibold text-rose-100">
                  <Cake size={14} /> اضغطي هنا لتشغيل أغنية عيد الميلاد
                </span>
              </div>
            ) : (
              <motion.img
                src={memory.image}
                alt="رقيّة ومحمود معاً"
                onError={() => setImageError(true)}
                className="max-h-[78vh] w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            <div className="absolute bottom-4 right-4 left-4 flex items-end justify-between text-white sm:bottom-6 sm:right-6 sm:left-6">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/60 px-3 py-1 text-xs backdrop-blur-md mb-2">
                  <Music size={13} className="text-yellow-300" />
                  <span>اضغطي لتشغيل Happy Birthday 🎉</span>
                </div>
                <p className="font-display text-2xl font-bold sm:text-3xl">{memory.caption}</p>
                <p className="mt-1 font-amiri text-sm text-rose-100/90 sm:text-base">{memory.date}</p>
              </div>

              <motion.div
                className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/90 shadow-xl backdrop-blur-md"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              >
                <Heart size={24} fill="white" />
              </motion.div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-rose-100/80">
            <span className="font-amiri text-sm sm:text-base">
              ✨ اضغطي على الصورة لتكبيرها وسماع أغنية هابي بيرث داي
            </span>
            <label
              onClick={(e) => e.stopPropagation()}
              className="flex cursor-pointer items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 font-medium transition hover:bg-white/20 text-rose-100"
            >
              <ImagePlus size={14} />
              <span>تغيير الصورة</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCustomPhoto}
              />
            </label>
          </div>
        </div>
      </motion.div>

      {/* Fullscreen Photo Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[140] flex items-center justify-center bg-black/85 p-4 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative max-h-[92vh] max-w-4xl overflow-hidden rounded-3xl border border-rose-300/30 bg-[#1e0a19]/90 p-3 shadow-2xl backdrop-blur-2xl sm:p-5"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(event) => event.stopPropagation()}
            >
              {/* Top Banner indicating Birthday Song */}
              <div className="mb-3 flex items-center justify-between border-b border-rose-200/20 pb-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-white shadow-md">
                    <Cake size={17} />
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold text-rose-100">
                      🎉 أغنية Happy Birthday to You شغالة دلوقتي!
                    </p>
                    <p className="text-xs text-rose-200/70">
                      كل سنة وانتي طيبة يا رقيّة وبألف صحة وهنا وسعادة 💕
                    </p>
                  </div>
                </div>
              </div>

              {/* Photo View */}
              <div className="relative overflow-hidden rounded-2xl bg-black/40">
                {imageError || !selected.image ? (
                  <div className="flex h-80 w-full flex-col items-center justify-center bg-rose-950/40 p-6 text-center">
                    <Heart size={48} className="text-rose-400 mb-2" />
                    <p className="font-display text-xl text-rose-100">{selected.caption}</p>
                  </div>
                ) : (
                  <img
                    src={selected.image}
                    alt="رقيّة ومحمود"
                    className="max-h-[75vh] w-full rounded-2xl object-contain"
                  />
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelected(null)}
                className="absolute left-6 top-6 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:bg-rose-500"
                aria-label="إغلاق الصورة"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}