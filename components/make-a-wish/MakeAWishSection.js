'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Section, SectionHeader, Container } from '@/components/layout';
import { MAKE_A_WISH_TEXT, SOUND_EFFECTS } from '@/constants';
import { useHaptic, useReducedMotion } from '@/hooks';
import { fireGoldenParticles, fireFireworks } from '@/lib/confetti';
import { playSound } from '@/lib/audio';
import WishStar from './WishStar';

const PHASES = ['closeEyes', 'makeWish', 'tapStar'];

export default function MakeAWishSection() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [wished, setWished] = useState(false);
  const [flying, setFlying] = useState(false);
  const { vibrate } = useHaptic();
  const prefersReducedMotion = useReducedMotion();

  const ready = phaseIndex >= PHASES.length - 1;

  useEffect(() => {
    if (wished) return;

    if (prefersReducedMotion) {
      setPhaseIndex(PHASES.length - 1);
      return;
    }

    const timer = setInterval(() => {
      setPhaseIndex((prev) => {
        if (prev >= PHASES.length - 1) return prev;
        return prev + 1;
      });
    }, 2200);

    return () => clearInterval(timer);
  }, [wished, prefersReducedMotion]);

  const currentText = wished
    ? MAKE_A_WISH_TEXT.dreamComesTrue
    : MAKE_A_WISH_TEXT[PHASES[phaseIndex]];

  const handleWish = useCallback(() => {
    if (wished || flying) return;

    setFlying(true);
    vibrate(40);

    try {
      playSound(SOUND_EFFECTS.sparkle, { volume: 0.35 });
    } catch {}

    setTimeout(() => {
      try {
        fireGoldenParticles();
      } catch {}
    }, 800);

    setTimeout(() => {
      try {
        fireFireworks();
      } catch {}
      setWished(true);
      setFlying(false);
    }, 1600);
  }, [wished, flying, vibrate]);

  return (
    <Section
      id="make-a-wish"
      ariaLabel="Make a Wish"
      className="overflow-hidden"
    >
      {/* Starfield backdrop */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {[...Array(40)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-cream-white"
            style={{
              width: `${1 + (i % 3)}px`,
              height: `${1 + (i % 3)}px`,
              top: `${(i * 17 + 7) % 100}%`,
              left: `${(i * 23 + 11) % 100}%`,
              opacity: 0.15 + (i % 5) * 0.1,
              animation: prefersReducedMotion
                ? 'none'
                : `twinkle ${3 + (i % 4)}s ease-in-out infinite`,
              animationDelay: `${(i % 8) * 0.4}s`,
            }}
          />
        ))}
      </div>

      <Container size="narrow">
        <SectionHeader
          title="Make a Wish"
          subtitle="Close your eyes..."
          emoji="✨"
        />

        <div className="relative flex min-h-[24rem] flex-col items-center justify-center">
          {/* Prompt text */}
          <AnimatePresence mode="wait">
            <motion.p
              key={currentText}
              className="mb-12 text-center font-dancing text-2xl text-champagne-gold sm:text-3xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              {currentText}
            </motion.p>
          </AnimatePresence>

          {/* Star */}
          {!wished && (
            <WishStar
              onClick={handleWish}
              flying={flying}
              className={ready ? 'cursor-pointer' : 'pointer-events-none opacity-60'}
            />
          )}

          {/* Trail particles when flying */}
          {flying && (
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              {[...Array(12)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-champagne-gold"
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: (Math.random() - 0.5) * 120,
                    y: -200 - Math.random() * 200,
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{ duration: 1.2, delay: i * 0.06 }}
                />
              ))}
            </div>
          )}

          {wished && (
            <motion.div
              className="mt-4 text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="text-6xl" aria-hidden="true">
                🌟
              </span>
            </motion.div>
          )}
        </div>
      </Container>
    </Section>
  );
}
