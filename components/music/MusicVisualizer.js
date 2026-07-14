'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks';

export default function MusicVisualizer({ isPlaying, color = '#E8A0BF' }) {
  const prefersReducedMotion = useReducedMotion();
  const bars = [0, 1, 2, 3, 4];

  if (prefersReducedMotion || !isPlaying) {
    return (
      <div className="flex h-5 items-end gap-0.5" aria-hidden="true">
        {bars.map((i) => (
          <div
            key={i}
            className="w-1 rounded-full opacity-40"
            style={{ height: 6 + (i % 2) * 4, backgroundColor: color }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex h-5 items-end gap-0.5" aria-hidden="true">
      {bars.map((i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full"
          style={{ backgroundColor: color }}
          animate={{ height: [6, 14 + (i % 3) * 4, 8, 16 - i * 2, 6] }}
          transition={{
            duration: 0.8 + i * 0.1,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
}
