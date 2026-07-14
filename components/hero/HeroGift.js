'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks';

export default function HeroGift({ left, bottom, color, ribbon, delay, size }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="absolute"
      style={{ left, bottom }}
      animate={
        prefersReducedMotion
          ? {}
          : { y: [0, -6, 0], rotate: [-1, 1, -1] }
      }
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 56 56"
        style={{ filter: `drop-shadow(0 6px 16px ${color}50)` }}
      >
        {/* Box body */}
        <rect x="8" y="22" width="40" height="30" rx="3" fill={color} />
        {/* Lid */}
        <rect x="6" y="16" width="44" height="10" rx="2" fill={color} opacity="0.85" />
        {/* Vertical ribbon */}
        <rect x="25" y="16" width="6" height="36" fill={ribbon} />
        {/* Horizontal ribbon */}
        <rect x="8" y="30" width="40" height="5" fill={ribbon} />
        {/* Bow left */}
        <ellipse cx="22" cy="14" rx="8" ry="5" fill={ribbon} />
        {/* Bow right */}
        <ellipse cx="34" cy="14" rx="8" ry="5" fill={ribbon} />
        {/* Bow center */}
        <circle cx="28" cy="14" r="3" fill={ribbon} opacity="0.8" />
      </svg>
    </motion.div>
  );
}
