import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import Intro from './components/Intro';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Letter from './components/Letter';
import Timeline from './components/Timeline';
import FinalSurprise from './components/FinalSurprise';
import MusicPlayer from './components/MusicPlayer';
import FloatingParticles from './components/FloatingParticles';
import Confetti from './components/Confetti';
import ClickableHearts from './components/ClickableHearts';
import PasswordGate from './components/PasswordGate';

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [opened, setOpened] = useState(false);
  const [activeTrackId, setActiveTrackId] = useState<string>('ramy-kol-sana');
  const [playSignal, setPlaySignal] = useState(0);
  const [confetti, setConfetti] = useState(false);

  const fireConfetti = useCallback(() => {
    setConfetti(false);
    requestAnimationFrame(() => setConfetti(true));
    setTimeout(() => setConfetti(false), 120);
  }, []);

  // عند كتابة الباسورد وفتحه: تبدأ أغنية رامي صبري (كل سنة)
  const handleUnlock = useCallback(() => {
    setUnlocked(true);
    setActiveTrackId('ramy-kol-sana');
    setPlaySignal((prev) => prev + 1);
  }, []);

  // عند الضغط على افتحي هديتك: تستمر الأغنية في العمل بدون أي إعادة من البداية
  const handleIntroOpen = useCallback(() => {
    setOpened(true);
    fireConfetti();
  }, [fireConfetti]);

  // عند النقر على الصورة: تشغيل أغنية رامي صبري (إحساسي معاك)
  const handlePhotoOpen = useCallback(() => {
    setActiveTrackId('ramy-ehsasi-maak');
    setPlaySignal((prev) => prev + 1);
    fireConfetti();
  }, [fireConfetti]);

  // عند إغلاق الصورة (علامة X): إيقاف إحساسي معاك والرجوع لأغنية رامي صبري الأولى (كل سنة)
  const handlePhotoClose = useCallback(() => {
    setActiveTrackId('ramy-kol-sana');
    setPlaySignal((prev) => prev + 1);
  }, []);

  return (
    <>
      <FloatingParticles count={16} />

      {/* شاشة القفل بكلمة السر */}
      <AnimatePresence>
        {!unlocked && <PasswordGate onUnlock={handleUnlock} />}
      </AnimatePresence>

      {/* شاشة الافتتاح بالهدية */}
      <AnimatePresence>
        {unlocked && !opened && <Intro onOpen={handleIntroOpen} />}
      </AnimatePresence>

      {/* المحتوى الرئيسي */}
      {opened && (
        <main className="relative min-h-screen">
          <FloatingParticles count={6} />
          <ClickableHearts />

          <Hero
            onCelebrate={fireConfetti}
            onCakeDone={fireConfetti}
          />

          <Gallery
            onPhotoOpen={handlePhotoOpen}
            onPhotoClose={handlePhotoClose}
          />

          <Letter />
          <Timeline />
          <FinalSurprise onReveal={fireConfetti} />
        </main>
      )}

      {/* مشغل الموسيقى بالخلفية */}
      {unlocked && (
        <MusicPlayer
          activeTrackId={activeTrackId}
          onTrackChange={(trackId) => setActiveTrackId(trackId)}
          playSignal={playSignal}
        />
      )}

      {/* كونفيتي احتفالي */}
      <Confetti active={confetti} />
    </>
  );
}