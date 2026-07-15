'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { INTRO_TEXT } from '@/constants';

export default function IntroExperience({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete?.(), 5000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="flex h-full w-full flex-col items-center justify-center bg-gradient-night px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-champagne-gold"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0.5], scale: [0, 1, 0.8] }}
          transition={{ duration: 2, delay: i * 0.1, repeat: Infinity, repeatDelay: 3 }}
        />
      ))}

      <motion.p
        className="mb-6 font-dancing text-xl text-cream-white/95 sm:mb-8 sm:text-3xl md:text-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        {INTRO_TEXT.subtitle}
      </motion.p>

      <motion.h1
        className="heading-display text-gradient-luxury text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 2, type: 'spring' }}
      >
        {INTRO_TEXT.name}
      </motion.h1>

      <motion.div
        className="absolute bottom-12 text-3xl sm:bottom-20 sm:text-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      >
        🌙
      </motion.div>
    </motion.div>
  );
}
