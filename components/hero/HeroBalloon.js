'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks';

export default function HeroBalloon({ color, left, top, size, delay, duration }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="absolute"
      style={{ left, top }}
      animate={
        prefersReducedMotion
          ? {}
          : {
              y: [0, -18, 0],
              x: [0, 6, -4, 0],
              rotate: [-2, 2, -2],
            }
      }
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size * 1.5}
        viewBox="0 0 60 90"
        fill="none"
        style={{ filter: `drop-shadow(0 4px 12px ${color}40)` }}
      >
        {/* String */}
        <line
          x1="30"
          y1="52"
          x2="30"
          y2="88"
          stroke={color}
          strokeWidth="1"
          opacity="0.5"
        />
        {/* Balloon body */}
        <ellipse cx="30" cy="28" rx="24" ry="28" fill={color} />
        {/* Highlight */}
        <ellipse
          cx="22"
          cy="20"
          rx="8"
          ry="10"
          fill="white"
          opacity="0.25"
        />
        {/* Knot */}
        <polygon points="26,54 30,58 34,54" fill={color} />
      </svg>
    </motion.div>
  );
}
