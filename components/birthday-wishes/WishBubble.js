'use client';

import { motion } from 'framer-motion';
import { cn } from '@/utils';
import { useReducedMotion } from '@/hooks';

const SIZE_CLASSES = {
  sm: 'max-w-[140px] px-3 py-2 text-xs',
  md: 'max-w-[180px] px-4 py-3 text-sm',
};

const BLOOM_COLORS = [
  'from-rose-pink/30 to-lavender/20',
  'from-lavender/30 to-light-purple/20',
  'from-peach/30 to-champagne-gold/20',
  'from-champagne-gold/30 to-rose-pink/20',
];

export default function WishBubble({
  wish,
  index,
  position,
  onSelect,
  isActive = false,
}) {
  const prefersReducedMotion = useReducedMotion();
  const size = position.size || 'sm';
  const snippet =
    wish.length > 48 ? `${wish.slice(0, 48).trim()}…` : wish;

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(index)}
      className={cn(
        'absolute z-10 rounded-2xl border border-white/25 bg-gradient-to-br text-left shadow-glass backdrop-blur-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-pink',
        SIZE_CLASSES[size],
        BLOOM_COLORS[index % BLOOM_COLORS.length],
        isActive && 'ring-2 ring-champagne-gold shadow-glow'
      )}
      style={{ left: position.left, top: position.top }}
      animate={
        prefersReducedMotion
          ? {}
          : {
              y: [0, -10, 0, 8, 0],
              x: [0, 4, 0, -4, 0],
            }
      }
      transition={{
        duration: position.duration || 6,
        delay: position.delay || 0,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileHover={{ scale: 1.06, zIndex: 30 }}
      whileTap={{ scale: 0.96 }}
      aria-label={`Read wish: ${wish}`}
    >
      <span className="mb-1 block text-base" aria-hidden="true">
        🌸
      </span>
      <span className="font-dancing leading-snug text-cream-white/90">
        {snippet}
      </span>
    </motion.button>
  );
}
