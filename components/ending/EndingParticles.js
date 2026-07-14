'use client';

import { motion } from 'framer-motion';
import { ENDING_PARTICLES } from '@/constants';
import { useReducedMotion } from '@/hooks';

export default function EndingParticles() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {ENDING_PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          className="absolute bottom-0 text-lg opacity-40"
          style={{ left: p.left }}
          animate={{
            y: ['0vh', '-110vh'],
            opacity: [0, 0.6, 0],
            rotate: [0, (i % 2 === 0 ? 1 : -1) * 20],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {i % 3 === 0 ? '❤️' : i % 3 === 1 ? '✨' : '🌸'}
        </motion.span>
      ))}

      {/* Golden dust */}
      {[...Array(20)].map((_, i) => (
        <motion.span
          key={`dust-${i}`}
          className="absolute h-1 w-1 rounded-full bg-champagne-gold"
          style={{
            left: `${(i * 17 + 5) % 100}%`,
            top: `${(i * 23 + 10) % 100}%`,
          }}
          animate={{
            opacity: [0.1, 0.8, 0.1],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 3 + (i % 4),
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}
