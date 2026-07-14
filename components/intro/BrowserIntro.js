'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { SITE_CONFIG } from '@/constants';

export default function BrowserIntro({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete?.(), 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="flex h-full w-full items-center justify-center bg-black/80 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-3xl overflow-hidden rounded-xl bg-twilight shadow-premium"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <div className="flex items-center gap-2 border-b border-white/10 bg-night-sky px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <div className="ml-4 flex-1 rounded-md bg-white/10 px-4 py-1.5 text-sm text-cream-white/70">
            {SITE_CONFIG.url.replace('https://', '')}
          </div>
        </div>

        <motion.div
          className="flex h-64 items-center justify-center bg-gradient-night sm:h-80"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center"
          >
            <p className="font-dancing text-3xl text-rose-pink sm:text-4xl">
              Welcome to something magical...
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="pointer-events-none fixed inset-0 bg-gradient-night"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3, duration: 1 }}
      />
    </motion.div>
  );
}
