'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion, useHaptic } from '@/hooks';

export default function HeroButterfly({ left, top, delay, color }) {
  const [flown, setFlown] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { vibrate } = useHaptic();

  const handleInteract = () => {
    if (flown) return;
    setFlown(true);
    vibrate(15);
  };

  if (flown) {
    return (
      <motion.div
        className="absolute cursor-pointer"
        style={{ left, top }}
        initial={{ opacity: 1 }}
        animate={{
          x: [0, 80, 200],
          y: [0, -60, -120],
          opacity: [1, 1, 0],
          rotate: [0, 15, 30],
        }}
        transition={{ duration: 2, ease: 'easeOut' }}
        aria-hidden="true"
      >
        <ButterflySVG color={color} />
      </motion.div>
    );
  }

  return (
    <motion.button
      className="absolute cursor-pointer border-none bg-transparent p-0"
      style={{ left, top }}
      onClick={handleInteract}
      onMouseEnter={handleInteract}
      animate={
        prefersReducedMotion
          ? {}
          : {
              y: [0, -8, 0],
              x: [0, 4, 0],
            }
      }
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
      aria-label="Butterfly"
    >
      <motion.div
        animate={
          prefersReducedMotion
            ? {}
            : { rotateY: [0, 20, 0, -20, 0] }
        }
        transition={{ duration: 0.8, repeat: Infinity, delay }}
      >
        <ButterflySVG color={color} />
      </motion.div>
    </motion.button>
  );
}

function ButterflySVG({ color }) {
  return (
    <svg width="32" height="28" viewBox="0 0 32 28" fill="none">
      <ellipse cx="10" cy="14" rx="10" ry="12" fill={color} opacity="0.8" />
      <ellipse cx="22" cy="14" rx="10" ry="12" fill={color} opacity="0.6" />
      <ellipse cx="16" cy="14" rx="2" ry="10" fill="#302B63" />
      <line x1="16" y1="4" x2="14" y2="0" stroke="#302B63" strokeWidth="1" />
      <line x1="16" y1="4" x2="18" y2="0" stroke="#302B63" strokeWidth="1" />
    </svg>
  );
}
