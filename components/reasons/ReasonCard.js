'use client';

import { motion } from 'framer-motion';
import { cn } from '@/utils';

const ACCENT_COLORS = [
  '#E8A0BF',
  '#C8B6E2',
  '#F7E7CE',
  '#FFDAB9',
  '#D4BBFC',
  '#B76E79',
];

export default function ReasonCard({ reason, index, total, className }) {
  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];

  return (
    <motion.div
      className={cn(
        'relative mx-auto flex h-full w-full max-w-lg flex-col items-center justify-center rounded-2xl p-8 text-center shadow-premium sm:p-12',
        className
      )}
      style={{
        background: `linear-gradient(145deg, ${accent}22 0%, rgba(255,248,240,0.95) 40%, rgba(255,248,240,0.98) 100%)`,
        border: `1px solid ${accent}44`,
      }}
    >
      {/* Number badge */}
      <span
        className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-poppins text-xs font-medium uppercase tracking-widest"
        style={{ backgroundColor: `${accent}33`, color: accent }}
      >
        <span aria-hidden="true">💝</span>
        {index + 1} of {total}
      </span>

      <p className="mb-3 font-poppins text-sm uppercase tracking-wider text-rose-gold/70">
        You are amazing because of
      </p>

      <h3
        className="font-dancing text-4xl leading-tight sm:text-5xl md:text-6xl"
        style={{ color: accent }}
      >
        {reason}
      </h3>

      {/* Decorative hearts */}
      <div className="mt-8 flex gap-2" aria-hidden="true">
        {[...Array(3)].map((_, i) => (
          <motion.span
            key={i}
            className="text-lg opacity-60"
            animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            ❤️
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
