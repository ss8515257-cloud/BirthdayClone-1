'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks';
import { FALLING_PETALS } from '@/constants/content';

const PETAL_COLORS = ['#E8A0BF', '#F8E8EE', '#FFDAB9', '#C8B6E2', '#F7E7CE'];

export default function FallingPetals() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {FALLING_PETALS.map((petal, i) => (
        <motion.span
          key={i}
          className="absolute opacity-40"
          style={{
            left: petal.left,
            top: '-5%',
            width: petal.size,
            height: petal.size * 1.4,
            backgroundColor: PETAL_COLORS[i % PETAL_COLORS.length],
            borderRadius: '50% 0 50% 50%',
            transform: 'rotate(45deg)',
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, (i % 2 === 0 ? 1 : -1) * 30],
            rotate: [45, 45 + (i % 2 === 0 ? 180 : -180)],
            opacity: [0, 0.5, 0.5, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
