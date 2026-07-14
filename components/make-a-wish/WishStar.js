'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks';
import { cn } from '@/utils';

export default function WishStar({ onClick, flying = false, className }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={flying}
      className={cn(
        'group relative flex h-32 w-32 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-gold disabled:pointer-events-none sm:h-40 sm:w-40',
        className
      )}
      animate={
        flying
          ? { y: -600, scale: 0.2, opacity: 0 }
          : prefersReducedMotion
            ? {}
            : { y: [0, -12, 0] }
      }
      transition={
        flying
          ? { duration: 1.8, ease: 'easeIn' }
          : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
      }
      whileHover={flying ? {} : { scale: 1.1 }}
      whileTap={flying ? {} : { scale: 0.92 }}
      aria-label="Make a wish — tap the star"
    >
      {/* Outer glow rings */}
      <motion.span
        className="absolute inset-0 rounded-full bg-champagne-gold/20 blur-2xl"
        animate={
          prefersReducedMotion
            ? {}
            : { scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }
        }
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.span
        className="absolute inset-2 rounded-full bg-rose-pink/15 blur-xl"
        animate={
          prefersReducedMotion
            ? {}
            : { scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }
        }
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      />

      {/* Star shape */}
      <svg
        viewBox="0 0 100 100"
        className="relative h-24 w-24 drop-shadow-glow-gold sm:h-28 sm:w-28"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F7E7CE" />
            <stop offset="50%" stopColor="#FFDAB9" />
            <stop offset="100%" stopColor="#E8A0BF" />
          </linearGradient>
          <filter id="starGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <polygon
          points="50,5 61,38 95,38 68,58 79,91 50,72 21,91 32,58 5,38 39,38"
          fill="url(#starGrad)"
          filter="url(#starGlow)"
        />
      </svg>

      {/* Sparkle particles around star */}
      {!flying &&
        [...Array(6)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-champagne-gold"
            style={{
              top: `${20 + Math.sin(i * 1.05) * 40}%`,
              left: `${20 + Math.cos(i * 1.05) * 40}%`,
            }}
            animate={
              prefersReducedMotion
                ? {}
                : { opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.35,
            }}
            aria-hidden="true"
          />
        ))}
    </motion.button>
  );
}
