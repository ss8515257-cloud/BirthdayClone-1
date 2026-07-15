'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import {
  BIRTHDAY_WISHES,
  BIRTHDAY_WISHES_META,
  WISH_BUBBLE_POSITIONS,
} from '@/constants/content';
import { SOUND_EFFECTS } from '@/constants';
import { useHaptic } from '@/hooks';
import { playSound } from '@/lib/audio';
import { fireRosePetals } from '@/lib/confetti';
import FeaturedWish from './FeaturedWish';
import WishBubble from './WishBubble';
import FallingPetals from './FallingPetals';

export default function WishGarden() {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const { vibrate } = useHaptic();

  const handleSelect = (wishIndex) => {
    setFeaturedIndex(wishIndex);
    setFocusedIndex(wishIndex);
    vibrate(15);
    try {
      playSound(SOUND_EFFECTS.sparkle, { volume: 0.2 });
    } catch {}
    try {
      fireRosePetals();
    } catch {}
  };

  const closeFocus = () => setFocusedIndex(null);

  const focusedWish =
    focusedIndex !== null ? BIRTHDAY_WISHES[focusedIndex] : null;

  return (
    <div className="relative">
      <FallingPetals />

      {/* Garden area */}
      <div className="relative mx-auto min-h-[320px] w-full max-w-5xl sm:min-h-[520px] md:min-h-[580px]">
        {/* Floating bubbles */}
        <div className="absolute inset-0 hidden sm:block" aria-hidden={focusedIndex !== null}>
          {WISH_BUBBLE_POSITIONS.map((pos, i) => {
            const wishIndex =
              (i * 7 + 3) % BIRTHDAY_WISHES.length;
            return (
              <WishBubble
                key={i}
                wish={BIRTHDAY_WISHES[wishIndex]}
                index={i}
                position={pos}
                onSelect={() => handleSelect(wishIndex)}
                isActive={focusedIndex === wishIndex}
              />
            );
          })}
        </div>

        {/* Featured wish — centered */}
        <div className="relative z-20 flex min-h-[280px] items-center justify-center px-1 sm:min-h-[520px] sm:px-2 md:min-h-[580px]">
          <FeaturedWish
            activeIndex={featuredIndex}
            onIndexChange={setFeaturedIndex}
          />
        </div>
      </div>

      <p className="relative z-10 mt-6 text-center font-dancing text-lg text-cream-white/80">
        <span className="hidden sm:inline">{BIRTHDAY_WISHES_META.tapHint}</span>
        <span className="sm:hidden">Swipe through wishes below</span>
      </p>

      {/* Mobile wish chips */}
      <div className="relative z-10 mt-4 flex gap-2 overflow-x-auto px-1 pb-2 scrollbar-none sm:hidden">
        {BIRTHDAY_WISHES.filter((_, i) => i % 13 === 0).map((wish, i) => {
          const wishIndex = i * 13;
          return (
            <button
              key={wishIndex}
              type="button"
              onClick={() => handleSelect(wishIndex)}
              className="shrink-0 rounded-2xl border border-white/20 bg-gradient-to-br from-rose-pink/25 to-lavender/15 px-4 py-3 text-left shadow-glass backdrop-blur-md"
            >
              <span className="mb-1 block text-sm" aria-hidden="true">🌸</span>
              <span className="block max-w-[200px] font-dancing text-sm text-cream-white/95">
                {wish.length > 40 ? `${wish.slice(0, 40)}…` : wish}
              </span>
            </button>
          );
        })}
      </div>

      <p className="relative z-10 mt-2 text-center font-poppins text-sm text-cream-white/60">
        {BIRTHDAY_WISHES.length} {BIRTHDAY_WISHES_META.totalLabel}
      </p>

      {/* Focus overlay */}
      <AnimatePresence>
        {focusedWish && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeFocus}
            role="dialog"
            aria-modal="true"
            aria-label="Birthday wish"
          >
            <div className="absolute inset-0 bg-night-sky/70 backdrop-blur-sm" />

            <motion.div
              className="relative z-[1] w-full max-w-md rounded-3xl border border-white/20 bg-gradient-to-br from-rose-pink/30 via-lavender/20 to-champagne-gold/25 p-8 text-center shadow-premium backdrop-blur-md"
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeFocus}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-cream-white transition hover:bg-white/20"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <span className="mb-4 block text-5xl" aria-hidden="true">
                🌸
              </span>
              <p className="font-dancing text-2xl leading-relaxed text-cream-white">
                &ldquo;{focusedWish}&rdquo;
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
