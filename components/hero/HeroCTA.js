'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { HERO_TEXT, SOUND_EFFECTS } from '@/constants';
import { playSound } from '@/lib/audio';
import { useMagnetic, useReducedMotion, useHaptic } from '@/hooks';

export default function HeroCTA({ onClick }) {
  const { ref, handleMouseMove, handleMouseLeave } = useMagnetic(0.25);
  const prefersReducedMotion = useReducedMotion();
  const { vibrate } = useHaptic();
  const [ripples, setRipples] = useState([]);

  const handleClick = useCallback(
    (e) => {
      vibrate(20);

      try {
        playSound(SOUND_EFFECTS.buttonClick, { volume: 0.2 });
      } catch {
        // Sound file may not exist yet
      }

      if (!prefersReducedMotion) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = Date.now();
        setRipples((prev) => [...prev, { id, x, y }]);
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== id));
        }, 600);
      }

      onClick?.();
    },
    [onClick, prefersReducedMotion, vibrate]
  );

  return (
    <div className="flex flex-col items-center gap-6">
      <motion.button
        ref={ref}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="btn-magnetic relative overflow-hidden bg-gradient-to-r from-rose-pink via-lavender to-rose-pink bg-[length:200%_100%] px-6 py-3 text-base font-semibold text-night-sky shadow-glow-lg sm:px-10 sm:py-4 sm:text-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2, duration: 0.6 }}
        whileHover={
          prefersReducedMotion
            ? {}
            : { scale: 1.06, backgroundPosition: '100% 0' }
        }
        whileTap={{ scale: 0.95 }}
        aria-label={HERO_TEXT.cta}
      >
        {/* Shimmer overlay */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity hover:opacity-100" />

        {/* Ripples */}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute animate-ping rounded-full bg-white/40"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
            }}
          />
        ))}

        <span className="relative z-10 flex items-center gap-2">
          <span>🎁</span>
          {HERO_TEXT.cta}
          <span>✨</span>
        </span>
      </motion.button>

      <motion.div
        className="flex flex-col items-center gap-1 text-cream-white/60"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.8 }}
        aria-hidden="true"
      >
        <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </div>
  );
}
