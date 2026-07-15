'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, SectionHeader, Container } from '@/components/layout';
import LanternsCanvas from './LanternsCanvas';
import { SOUND_EFFECTS } from '@/constants';
import { playSound } from '@/lib/audio';
import { useHaptic } from '@/hooks';

export default function LanternsSection() {
  const [activeMessage, setActiveMessage] = useState(null);
  const { vibrate } = useHaptic();

  const handleLanternReveal = useCallback(
    (message) => {
      setActiveMessage(message);
      vibrate(15);
      try {
        playSound(SOUND_EFFECTS.lantern, { volume: 0.2 });
      } catch {
        // Sound file may not exist yet
      }
      setTimeout(() => setActiveMessage(null), 4000);
    },
    [vibrate]
  );

  return (
    <Section
      id="lanterns"
      ariaLabel="Floating Lanterns"
      className="relative overflow-hidden !p-0"
      noPadding
    >
      <div className="absolute inset-0 bg-gradient-to-b from-night-sky via-twilight to-night-sky" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Container className="section-header-offset pb-4">
          <SectionHeader
            title="Floating Lanterns"
            subtitle="Carrying wishes to the sky"
            emoji="🏮"
          />
        </Container>

        <div className="canvas-height relative mx-auto w-full max-w-6xl">
          <LanternsCanvas
            onLanternReveal={handleLanternReveal}
            className="h-full w-full"
          />
        </div>

        <Container className="pb-16 pt-6">
          <p className="text-center font-dancing text-lg text-cream-white/70">
            Tap a lantern to reveal a hidden message
          </p>

          <AnimatePresence>
            {activeMessage && (
              <motion.div
                className="glass-card mx-auto mt-6 max-w-md p-6 text-center"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                role="status"
              >
                <p className="font-dancing text-xl text-cream-white/95">
                  {activeMessage}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </div>
    </Section>
  );
}
