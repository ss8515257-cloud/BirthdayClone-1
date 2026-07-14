'use client';

import { motion } from 'framer-motion';
import { LETTER_META } from '@/constants/content';

export default function WaxSeal({ onClick, sealed = true }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={!sealed}
      className="group relative flex h-20 w-20 items-center justify-center rounded-full focus-visible:outline-none disabled:pointer-events-none sm:h-24 sm:w-24"
      whileHover={sealed ? { scale: 1.08 } : {}}
      whileTap={sealed ? { scale: 0.94 } : {}}
      aria-label="Open the letter"
    >
      {/* Glow */}
      <span className="absolute inset-0 rounded-full bg-rose-pink/40 blur-xl transition-opacity group-hover:opacity-100 sm:opacity-70" />

      {/* Wax body */}
      <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose-pink via-rose-gold to-rose-gold shadow-premium sm:h-20 sm:w-20">
        {/* Wax drip texture ring */}
        <span className="absolute inset-1 rounded-full border border-white/20" />
        <span
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.35), transparent 45%)',
          }}
        />
        <span className="relative font-playfair text-2xl font-bold text-cream-white sm:text-3xl">
          {LETTER_META.sealInitial}
        </span>
      </span>

      {/* Uneven wax edge */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full text-rose-gold"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          opacity="0.25"
          d="M50 6c8 0 12 6 20 8s16-2 20 6-2 16 0 24 8 14 2 22-16 4-22 10-8 14-16 14-14-8-22-10-18 2-24-6 4-16 2-24-8-14-2-22 16-4 22-10 12-8 20-6z"
        />
      </svg>
    </motion.button>
  );
}
