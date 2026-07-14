'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, SectionHeader, Container } from '@/components/layout';
import StarryNightCanvas from './StarryNightCanvas';
import { SOUND_EFFECTS } from '@/constants';
import { playSound } from '@/lib/audio';
import { useHaptic } from '@/hooks';

export default function StarryNightSection() {
  const [touchCount, setTouchCount] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const { vibrate } = useHaptic();

  const handleStarTouch = useCallback(() => {
    setTouchCount((c) => c + 1);
    setShowHint(false);
    vibrate(10);
    try {
      playSound(SOUND_EFFECTS.sparkle, { volume: 0.15 });
    } catch {
      // Sound file may not exist yet
    }
  }, [vibrate]);

  return (
    <Section
      id="starry-night"
      ariaLabel="Starry Night"
      className="relative overflow-hidden !p-0"
      noPadding
    >
      <div className="absolute inset-0 bg-gradient-to-b from-night-sky via-deep-purple/50 to-night-sky" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Container className="pt-28 pb-4">
          <SectionHeader
            title="Starry Night"
            subtitle="Touch the stars above"
            emoji="⭐"
          />
        </Container>

        <div className="relative mx-auto h-[55vh] w-full max-w-6xl sm:h-[60vh]">
          <StarryNightCanvas
            onStarTouch={handleStarTouch}
            className="h-full w-full"
          />
        </div>

        <Container className="pb-16 pt-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <AnimatePresence>
              {showHint && (
                <motion.p
                  className="font-dancing text-lg text-lavender/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Tap the glowing stars to create sparkles ✨
                </motion.p>
              )}
            </AnimatePresence>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-cream-white/50 sm:gap-6">
              <span className="flex items-center gap-2">
                <span className="text-rose-pink">❤️</span> Heart
              </span>
              <span className="flex items-center gap-2">
                <span className="text-champagne-gold">G</span> Gurleen
              </span>
              <span className="flex items-center gap-2">
                <span className="text-lavender">✦</span> Happy Birthday
              </span>
            </div>

            {touchCount > 0 && (
              <motion.p
                className="text-sm text-rose-pink/70"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                {touchCount} sparkle{touchCount !== 1 ? 's' : ''} created
              </motion.p>
            )}
          </div>
        </Container>
      </div>
    </Section>
  );
}
