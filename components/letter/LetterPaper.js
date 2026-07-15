'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { LETTER_CONTENT, LETTER_META } from '@/constants/content';
import { useReducedMotion } from '@/hooks';

export default function LetterPaper() {
  const prefersReducedMotion = useReducedMotion();

  const paragraphs = useMemo(
    () => LETTER_CONTENT.split('\n\n').filter(Boolean),
    []
  );

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.5,
        delayChildren: 0.3,
      },
    },
  };

  const line = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.2 : 0.9, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className="relative mx-auto w-full max-w-2xl"
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div
        className="relative overflow-hidden rounded-lg p-5 shadow-premium sm:p-8 md:p-12"
        style={{
          background:
            'linear-gradient(135deg, #FFF8F0 0%, #FFF3E6 50%, #FDEBD8 100%)',
        }}
      >
        {/* Parchment texture edges */}
        <div className="pointer-events-none absolute inset-0 rounded-lg shadow-[inset_0_0_60px_rgba(183,110,121,0.12)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-gradient-to-b from-rose-gold/10 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2 bg-gradient-to-t from-rose-gold/10 to-transparent" />

        {/* Greeting */}
        <motion.p
          className="mb-6 text-center font-dancing text-2xl text-rose-gold sm:text-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {LETTER_META.subtitle}
        </motion.p>

        <motion.div
          className="space-y-5"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {paragraphs.map((para, i) => (
            <motion.p
              key={i}
              variants={line}
              className="font-dancing text-base leading-relaxed text-night-sky/80 sm:text-lg md:text-xl"
            >
              {para}
            </motion.p>
          ))}
        </motion.div>

        {/* Signature flourish */}
        <motion.div
          className="mt-8 flex items-center justify-end gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: prefersReducedMotion ? 0.4 : 3 }}
        >
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-rose-gold/50" />
          <span className="text-2xl">❤️</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
