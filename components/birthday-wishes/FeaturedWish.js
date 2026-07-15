'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import { BIRTHDAY_WISHES, BIRTHDAY_WISHES_META } from '@/constants/content';
import { useReducedMotion } from '@/hooks';
import { cn } from '@/utils';

export default function FeaturedWish({ activeIndex, onIndexChange }) {
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const wish = BIRTHDAY_WISHES[activeIndex];

  useEffect(() => {
    if (paused || prefersReducedMotion) return;

    const timer = setInterval(() => {
      onIndexChange((prev) => (prev + 1) % BIRTHDAY_WISHES.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [paused, prefersReducedMotion, onIndexChange]);

  const togglePause = useCallback(() => setPaused((p) => !p), []);

  return (
    <div className="relative z-20 mx-auto w-full max-w-xl">
      <div className="mb-4 flex items-center justify-between px-2">
        <p className="font-dancing text-lg text-cream-white/95">
          {BIRTHDAY_WISHES_META.featuredHint}
        </p>
        <button
          type="button"
          onClick={togglePause}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-cream-white/85 backdrop-blur transition hover:bg-white/20"
          aria-label={paused ? 'Resume wishes' : 'Pause wishes'}
        >
          {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </button>
      </div>

      <div
        className={cn(
          'relative overflow-hidden rounded-3xl border border-white/20 p-5 text-center shadow-premium backdrop-blur-md sm:p-8 md:p-10',
          'bg-gradient-to-br from-rose-pink/20 via-lavender/15 to-champagne-gold/20'
        )}
      >
        <span className="mb-4 block text-4xl" aria-hidden="true">
          🌺
        </span>

        <AnimatePresence mode="wait">
          <motion.blockquote
            key={activeIndex}
            className="font-dancing text-lg leading-relaxed text-cream-white sm:text-xl md:text-2xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5 }}
          >
            &ldquo;{wish}&rdquo;
          </motion.blockquote>
        </AnimatePresence>

        <p className="mt-6 font-poppins text-xs uppercase tracking-widest text-cream-white/60">
          {activeIndex + 1} / {BIRTHDAY_WISHES.length}
        </p>
      </div>
    </div>
  );
}
