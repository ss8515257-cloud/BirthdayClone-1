'use client';

import { motion } from 'framer-motion';
import { HERO_STARS, HERO_CLOUDS } from '@/constants/hero';
import { useReducedMotion } from '@/hooks';

function Cloud({ left, top, scale, opacity, duration }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="absolute"
      style={{ left, top, scale, opacity }}
      animate={
        prefersReducedMotion
          ? {}
          : { x: ['0%', '8%', '0%'] }
      }
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
    >
      <svg width="120" height="48" viewBox="0 0 120 48" fill="none">
        <ellipse cx="40" cy="30" rx="35" ry="18" fill="white" />
        <ellipse cx="70" cy="24" rx="28" ry="22" fill="white" />
        <ellipse cx="95" cy="30" rx="22" ry="16" fill="white" />
      </svg>
    </motion.div>
  );
}

export default function HeroBackground() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Moonlight beam */}
      <div
        className="absolute left-1/2 top-0 h-full w-full max-w-[600px] -translate-x-1/2 opacity-20"
        style={{
          background:
            'radial-gradient(ellipse at top, rgba(247,231,206,0.35) 0%, transparent 70%)',
        }}
      />

      {/* Moon */}
      <motion.div
        className="absolute right-[8%] top-[8%] sm:right-[12%] sm:top-[10%]"
        animate={
          prefersReducedMotion
            ? {}
            : { scale: [1, 1.05, 1], opacity: [0.7, 0.9, 0.7] }
        }
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="relative">
          <div className="absolute inset-0 scale-150 rounded-full bg-champagne-gold/20 blur-3xl" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-champagne-gold/30 to-cream-white/10 shadow-glow-gold sm:h-20 sm:w-20">
            <span className="text-3xl sm:text-4xl">🌙</span>
          </div>
        </div>
      </motion.div>

      {/* Clouds */}
      {HERO_CLOUDS.map((cloud, i) => (
        <Cloud key={i} {...cloud} />
      ))}

      {/* Stars */}
      {HERO_STARS.map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-champagne-gold"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
          }}
          animate={
            prefersReducedMotion
              ? { opacity: 0.6 }
              : { opacity: [0.2, 1, 0.2], scale: [1, 1.3, 1] }
          }
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            delay: star.delay,
          }}
        />
      ))}

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-night-sky to-transparent" />
    </div>
  );
}
