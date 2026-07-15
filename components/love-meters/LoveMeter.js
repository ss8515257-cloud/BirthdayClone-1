'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks';
import { LOVE_METERS_META } from '@/constants';
import { cn } from '@/utils';

export default function LoveMeter({ meter, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);

  const { label, emoji, color, value, overflow, caption } = meter;
  const fillPercent = overflow ? 108 : value;
  const delay = prefersReducedMotion ? 0 : index * 0.18;

  useEffect(() => {
    if (!inView) return;

    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    const duration = 1600;
    const start = performance.now();
    let frame;

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayValue(Math.round(eased * value));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    const timeout = setTimeout(() => {
      frame = requestAnimationFrame(tick);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [inView, value, delay, prefersReducedMotion]);

  return (
    <motion.div
      ref={ref}
      className="glass-card relative overflow-hidden p-5 sm:p-6"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.6, delay }}
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl" aria-hidden="true">
            {emoji}
          </span>
          <div>
            <h3 className="font-playfair text-lg text-cream-white sm:text-xl">
              {label}
            </h3>
            <p className="font-dancing text-sm text-cream-white/80">{caption}</p>
          </div>
        </div>

        <div className="flex items-baseline gap-1 font-poppins">
          <span
            className="text-2xl font-semibold tabular-nums sm:text-3xl"
            style={{ color }}
            aria-live="polite"
          >
            {displayValue}
          </span>
          {overflow && inView && (
            <motion.span
              className="text-lg font-medium"
              style={{ color }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay + 1.5, duration: 0.4 }}
            >
              {LOVE_METERS_META.overflowLabel}
            </motion.span>
          )}
          {!overflow && (
            <span className="text-sm text-cream-white/60">%</span>
          )}
        </div>
      </div>

      {/* Track */}
      <div
        className="relative h-4 overflow-visible rounded-full bg-white/10"
        role="meter"
        aria-valuenow={displayValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label}: ${overflow ? 'off the charts' : `${displayValue}%`}`}
      >
        <motion.div
          className={cn(
            'absolute inset-y-0 left-0 rounded-full',
            overflow && 'overflow-visible'
          )}
          style={{
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            boxShadow: `0 0 20px ${color}66`,
          }}
          initial={{ width: '0%' }}
          animate={inView ? { width: `${fillPercent}%` } : { width: '0%' }}
          transition={{
            duration: prefersReducedMotion ? 0.2 : 1.6,
            delay,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        {/* Overflow sparkle */}
        {overflow && inView && (
          <motion.span
            className="absolute top-1/2 -translate-y-1/2 text-sm"
            style={{ left: '100%' }}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 4 }}
            transition={{ delay: delay + 1.4, duration: 0.4 }}
            aria-hidden="true"
          >
            💫
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}
