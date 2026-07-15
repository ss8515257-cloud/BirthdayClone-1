'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOADING_MESSAGES } from '@/constants';

export default function LoadingScreen({ onComplete }) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    const completeTimer = setTimeout(() => {
      onComplete?.();
    }, 3500);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="flex h-full w-full flex-col items-center justify-center bg-gradient-night"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        role="status"
        aria-label="Loading"
      >
        <motion.div
          className="relative mb-8"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="text-5xl sm:text-6xl">❤️</div>
          <motion.div
            className="absolute inset-0 rounded-full bg-rose-pink/30 blur-xl"
            animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        <motion.p
          key={messageIndex}
          className="mb-6 font-dancing text-xl text-cream-white/90 sm:mb-6 sm:text-3xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {LOADING_MESSAGES[messageIndex]}
        </motion.p>

        <div className="h-1 w-40 overflow-hidden rounded-full bg-white/10 sm:w-64">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-rose-pink via-lavender to-champagne-gold"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
