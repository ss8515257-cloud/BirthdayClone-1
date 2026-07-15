'use client';

import { useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Shuffle } from 'lucide-react';
import { REASONS_YOU_ARE_AMAZING } from '@/constants/content';
import { SOUND_EFFECTS } from '@/constants';
import { playSound } from '@/lib/audio';
import { useHaptic, useReducedMotion } from '@/hooks';
import { randomInt } from '@/utils';
import ReasonCard from './ReasonCard';

const TOTAL = REASONS_YOU_ARE_AMAZING.length;

const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.92,
  }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir) => ({
    x: dir > 0 ? '-100%' : '100%',
    opacity: 0,
    scale: 0.92,
  }),
};

export default function ReasonsCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const touchStartX = useRef(0);
  const { vibrate } = useHaptic();
  const prefersReducedMotion = useReducedMotion();

  const reason = REASONS_YOU_ARE_AMAZING[index];
  const progress = ((index + 1) / TOTAL) * 100;

  const playNavSound = useCallback(() => {
    vibrate(10);
    try {
      playSound(SOUND_EFFECTS.buttonClick, { volume: 0.2 });
    } catch {}
  }, [vibrate]);

  const goTo = useCallback(
    (next, dir) => {
      if (next < 0 || next >= TOTAL) return;
      setDirection(dir);
      setIndex(next);
      playNavSound();
    },
    [playNavSound]
  );

  const handlePrev = () => goTo(index - 1, -1);
  const handleNext = () => goTo(index + 1, 1);

  const handleShuffle = () => {
    let next = randomInt(0, TOTAL - 1);
    if (next === index && TOTAL > 1) {
      next = (next + 1) % TOTAL;
    }
    setDirection(next > index ? 1 : -1);
    setIndex(next);
    playNavSound();
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Progress bar */}
      <div className="mb-6 px-2">
        <div className="mb-2 flex items-center justify-between font-poppins text-xs text-cream-white/70">
          <span>{index + 1} / {TOTAL}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-rose-pink via-lavender to-champagne-gold"
            animate={{ width: `${progress}%` }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
          />
        </div>
      </div>

      {/* Card area */}
      <div
        className="relative h-[min(52vh,300px)] min-h-[240px] sm:h-[340px] md:h-[380px]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: prefersReducedMotion ? 0.15 : 0.45,
              ease: 'easeInOut',
            }}
            className="absolute inset-0"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) handleNext();
              else if (info.offset.x > 80) handlePrev();
            }}
          >
            <ReasonCard reason={reason} index={index} total={TOTAL} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-center gap-2 sm:mt-8 sm:gap-4">
        <button
          type="button"
          onClick={handlePrev}
          disabled={index === 0}
          className="touch-target flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-cream-white backdrop-blur transition hover:bg-white/20 disabled:opacity-30 sm:h-12 sm:w-12"
          aria-label="Previous reason"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          type="button"
          onClick={handleShuffle}
          className="touch-target flex h-11 items-center gap-2 rounded-full bg-white/10 px-3 font-poppins text-sm text-cream-white backdrop-blur transition hover:bg-white/20 sm:h-12 sm:px-5"
          aria-label="Random reason"
        >
          <Shuffle className="h-4 w-4" />
          <span className="hidden sm:inline">Surprise me</span>
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={index === TOTAL - 1}
          className="touch-target flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-cream-white backdrop-blur transition hover:bg-white/20 disabled:opacity-30 sm:h-12 sm:w-12"
          aria-label="Next reason"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <p className="mt-6 text-center font-dancing text-lg text-cream-white/80">
        Swipe or tap to discover more
      </p>
    </div>
  );
}
