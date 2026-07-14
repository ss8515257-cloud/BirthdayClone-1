'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks';
import { cn } from '@/utils';

const BOX_COLOR = '#E8A0BF';
const RIBBON_COLOR = '#F7E7CE';
const BOX_SIZE = 200;

export default function GiftBox({ onOpen, isOpen, isOpening, className }) {
  const prefersReducedMotion = useReducedMotion();
  const disabled = isOpen || isOpening;

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      disabled={disabled}
      className={cn(
        'group relative mx-auto block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-gold disabled:cursor-default',
        className
      )}
      animate={
        isOpening
          ? { scale: [1, 1.05, 0.98, 1.02, 1], rotate: [0, -2, 2, -1, 0] }
          : isOpen
            ? { scale: 1 }
            : prefersReducedMotion
              ? {}
              : { y: [0, -10, 0] }
      }
      transition={
        isOpening
          ? { duration: 0.6 }
          : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
      }
      whileHover={disabled ? {} : { scale: 1.04 }}
      whileTap={disabled ? {} : { scale: 0.96 }}
      aria-label="Open your birthday gift"
    >
      <motion.span
        className="absolute inset-0 rounded-full bg-rose-pink/30 blur-3xl"
        animate={
          isOpen || prefersReducedMotion
            ? { opacity: 0.6, scale: 1.2 }
            : { opacity: [0.3, 0.6, 0.3], scale: [1, 1.15, 1] }
        }
        transition={{ duration: 2.5, repeat: Infinity }}
        aria-hidden="true"
      />

      <div
        className="perspective-1000 preserve-3d relative"
        style={{ width: BOX_SIZE, height: BOX_SIZE + 40 }}
      >
        <svg
          width={BOX_SIZE}
          height={BOX_SIZE + 40}
          viewBox="0 0 200 240"
          className="relative z-10"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="boxShine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>

          <rect x="30" y="100" width="140" height="110" rx="6" fill={BOX_COLOR} />
          <rect
            x="30"
            y="100"
            width="140"
            height="110"
            rx="6"
            fill="url(#boxShine)"
            opacity="0.35"
          />

          {(isOpen || isOpening) && (
            <motion.rect
              x="40"
              y="110"
              width="120"
              height="90"
              rx="4"
              fill="#FFF8F0"
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpen ? 0.9 : 0.5 }}
              transition={{ duration: 0.5 }}
            />
          )}

          <rect x="94" y="100" width="12" height="110" fill={RIBBON_COLOR} />
          <rect x="30" y="148" width="140" height="10" fill={RIBBON_COLOR} />
        </svg>

        <motion.div
          className="absolute left-0 right-0"
          style={{ top: 52, height: 56, transformOrigin: 'bottom center' }}
          animate={
            isOpen || isOpening
              ? { rotateX: -110, y: -20, opacity: isOpen ? 0.6 : 1 }
              : { rotateX: 0, y: 0, opacity: 1 }
          }
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.7, ease: 'easeOut' }}
        >
          <svg width={BOX_SIZE} height={70} viewBox="0 0 200 70" aria-hidden="true">
            <rect x="24" y="20" width="152" height="36" rx="4" fill={BOX_COLOR} opacity="0.9" />
            <rect x="94" y="20" width="12" height="36" fill={RIBBON_COLOR} />
            <ellipse cx="78" cy="18" rx="18" ry="10" fill={RIBBON_COLOR} />
            <ellipse cx="122" cy="18" rx="18" ry="10" fill={RIBBON_COLOR} />
            <circle cx="100" cy="18" r="6" fill={RIBBON_COLOR} opacity="0.85" />
          </svg>
        </motion.div>

        {(isOpen || isOpening) &&
          [...Array(8)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-champagne-gold"
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: Math.cos((i / 8) * Math.PI * 2) * 80,
                y: Math.sin((i / 8) * Math.PI * 2) * 80,
                opacity: 0,
                scale: 0,
              }}
              transition={{ duration: 0.8, delay: 0.2 }}
              aria-hidden="true"
            />
          ))}
      </div>
    </motion.button>
  );
}
