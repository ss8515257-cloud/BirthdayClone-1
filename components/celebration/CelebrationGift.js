'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CELEBRATION_GIFT, SOUND_EFFECTS } from '@/constants';
import { useHaptic } from '@/hooks';
import { playSound } from '@/lib/audio';
import { fireGiftExplosion } from '@/lib/confetti';
import GiftBox from './GiftBox';

export default function CelebrationGift() {
  const [phase, setPhase] = useState('idle'); // idle | opening | opened
  const { vibrate } = useHaptic();

  const isOpening = phase === 'opening';
  const isOpened = phase === 'opened';

  const handleOpen = useCallback(() => {
    if (phase !== 'idle') return;

    setPhase('opening');
    vibrate(50);

    try {
      playSound(SOUND_EFFECTS.giftOpen, { volume: 0.4 });
    } catch {}

    setTimeout(() => {
      try {
        fireGiftExplosion();
      } catch {}
      try {
        playSound(SOUND_EFFECTS.fireworks, { volume: 0.35 });
      } catch {}
      setPhase('opened');
    }, 700);
  }, [phase, vibrate]);

  const handleCelebrateAgain = () => {
    vibrate(30);
    try {
      fireGiftExplosion();
    } catch {}
    try {
      playSound(SOUND_EFFECTS.fireworks, { volume: 0.3 });
    } catch {}
  };

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-center">
      <GiftBox
        onOpen={handleOpen}
        isOpen={isOpened}
        isOpening={isOpening}
      />

      <div className="mt-8 min-h-[200px] w-full text-center">
        <AnimatePresence mode="wait">
          {phase === 'idle' && (
            <motion.p
              key="hint"
              className="font-dancing text-xl text-cream-white/95 sm:text-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {CELEBRATION_GIFT.tapHint}
            </motion.p>
          )}

          {isOpening && (
            <motion.p
              key="opening"
              className="font-dancing text-xl text-cream-white/90 sm:text-2xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {CELEBRATION_GIFT.openingHint}
            </motion.p>
          )}

          {isOpened && (
            <motion.div
              key="revealed"
              className="mx-auto max-w-md rounded-3xl border border-white/20 bg-gradient-to-br from-rose-pink/25 via-lavender/20 to-champagne-gold/25 p-5 shadow-premium backdrop-blur-md sm:p-8"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <span className="mb-4 block text-5xl" aria-hidden="true">
                🎉
              </span>
              <h3 className="mb-4 font-playfair text-2xl text-gradient-gold sm:text-3xl">
                {CELEBRATION_GIFT.title}
              </h3>
              <p className="font-dancing text-lg leading-relaxed text-cream-white/95 sm:text-xl">
                {CELEBRATION_GIFT.message}
              </p>
              <p className="mt-6 font-dancing text-xl text-cream-white/90">
                {CELEBRATION_GIFT.signature}
              </p>

              <motion.button
                type="button"
                onClick={handleCelebrateAgain}
                className="btn-magnetic mt-8 bg-gradient-to-r from-rose-pink to-lavender text-night-sky shadow-glow"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                {CELEBRATION_GIFT.celebrateAgain}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
