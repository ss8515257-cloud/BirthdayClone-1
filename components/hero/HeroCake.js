'use client';

import { motion } from 'framer-motion';
import { HERO_SPARKLES } from '@/constants/hero';
import { useReducedMotion } from '@/hooks';

function Candle({ x, delay }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <g transform={`translate(${x}, 0)`}>
      {/* Candle stick */}
      <rect x="-2" y="0" width="4" height="18" rx="1" fill="#FFF8F0" />
      {/* Flame */}
      <motion.ellipse
        cx="0"
        cy="-4"
        rx="3"
        ry="5"
        fill="#FFDAB9"
        animate={
          prefersReducedMotion
            ? {}
            : {
                ry: [5, 6, 4.5, 5],
                opacity: [0.9, 1, 0.85, 0.9],
              }
        }
        transition={{
          duration: 0.8,
          repeat: Infinity,
          delay,
          ease: 'easeInOut',
        }}
      />
      <motion.ellipse
        cx="0"
        cy="-3"
        rx="1.5"
        ry="3"
        fill="#F7E7CE"
        animate={
          prefersReducedMotion
            ? {}
            : { ry: [3, 3.5, 2.8, 3] }
        }
        transition={{
          duration: 0.6,
          repeat: Infinity,
          delay: delay + 0.1,
        }}
      />
    </g>
  );
}

export default function HeroCake() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative">
      {/* Glow behind cake */}
      <motion.div
        className="absolute inset-0 scale-125 rounded-full bg-rose-pink/20 blur-2xl"
        animate={
          prefersReducedMotion
            ? {}
            : { opacity: [0.4, 0.7, 0.4], scale: [1.2, 1.3, 1.2] }
        }
        transition={{ duration: 3, repeat: Infinity }}
      />

      <motion.svg
        width="160"
        height="160"
        viewBox="0 0 160 160"
        className="relative z-10 sm:h-[200px] sm:w-[200px]"
        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.5 }}
        aria-hidden="true"
      >
        {/* Plate */}
        <ellipse cx="80" cy="145" rx="65" ry="8" fill="#C8B6E2" opacity="0.4" />

        {/* Bottom tier */}
        <rect x="30" y="100" width="100" height="35" rx="6" fill="#E8A0BF" />
        <rect x="30" y="95" width="100" height="10" rx="4" fill="#F8E8EE" />

        {/* Middle tier */}
        <rect x="42" y="68" width="76" height="30" rx="5" fill="#C8B6E2" />
        <rect x="42" y="63" width="76" height="9" rx="3" fill="#F8E8EE" />

        {/* Top tier */}
        <rect x="54" y="40" width="52" height="26" rx="4" fill="#FFDAB9" />
        <rect x="54" y="36" width="52" height="8" rx="3" fill="#FFF8F0" />

        {/* Drip frosting details */}
        <circle cx="45" cy="105" r="4" fill="#F8E8EE" />
        <circle cx="60" cy="108" r="3" fill="#F8E8EE" />
        <circle cx="100" cy="106" r="4" fill="#F8E8EE" />
        <circle cx="115" cy="103" r="3" fill="#F8E8EE" />

        {/* Sprinkles */}
        {[62, 75, 88, 100, 70, 82, 95].map((x, i) => (
          <rect
            key={i}
            x={x}
            y={78 + (i % 3) * 4}
            width="3"
            height="6"
            rx="1"
            fill={['#E8A0BF', '#F7E7CE', '#D4BBFC', '#FFDAB9'][i % 4]}
            transform={`rotate(${(i * 30) % 60 - 30} ${x} ${80})`}
          />
        ))}

        {/* Candles */}
        <g transform="translate(80, 36)">
          <Candle x={-16} delay={0} />
          <Candle x={0} delay={0.2} />
          <Candle x={16} delay={0.4} />
        </g>
      </motion.svg>

      {/* Sparkles around cake */}
      {HERO_SPARKLES.map((sparkle, i) => (
        <motion.span
          key={i}
          className="absolute text-xs text-cream-white/90"
          style={{ left: sparkle.left, top: sparkle.top }}
          animate={
            prefersReducedMotion
              ? { opacity: 0.5 }
              : { opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: sparkle.delay,
          }}
          aria-hidden="true"
        >
          ✦
        </motion.span>
      ))}
    </div>
  );
}
