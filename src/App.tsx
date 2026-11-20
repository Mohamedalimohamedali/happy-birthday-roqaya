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

  // When password is entered correctly and unlocked
  const handleUnlock = useCallback(() => {
    setUnlocked(true);
    setActiveTrackId('ramy-kol-sana');
    setPlaySignal((prev) => prev + 1);
  }, []);

  // When gift box is opened in Intro screen
  const handleIntroOpen = useCallback(() => {
    setOpened(true);
    fireConfetti();
    // Guarantee song continues playing
    setPlaySignal((prev) => prev + 1);
  }, [fireConfetti]);

  // When user clicks the photo inside the gallery -> Happy Birthday to You
  const handlePhotoOpen = useCallback(() => {
    setActiveTrackId('happy-birthday');
    setPlaySignal((prev) => prev + 1);
    fireConfetti();
  }, [fireConfetti]);

  // Switch back to Ramy Sabry
  const handleSwitchToRamy = useCallback(() => {
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
            onSwitchToRamy={handleSwitchToRamy}
          />

          <Letter />
          <Timeline />
          <FinalSurprise onReveal={fireConfetti} />
        </main>
      )}

      {/* مشغل الموسيقى (يبدأ فور فك القفل بأغنية رامي صبري) */}
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