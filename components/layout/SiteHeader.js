'use client';

import { motion } from 'framer-motion';
import { SITE_CONFIG } from '@/constants';

export default function SiteHeader({ show = true }) {
  if (!show) return null;

  return (
    <motion.header
      className="safe-top fixed left-0 right-0 top-0 z-30 px-4 py-4 sm:px-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="glass-card flex items-center gap-2 px-4 py-2">
          <span className="text-lg" aria-hidden="true">
            ❤️
          </span>
          <span className="font-dancing text-lg text-rose-pink sm:text-xl">
            {SITE_CONFIG.name}
          </span>
        </div>

        <div className="glass-card hidden items-center gap-2 px-4 py-2 sm:flex">
          <span className="h-2 w-2 animate-pulse rounded-full bg-rose-pink" />
          <span className="text-xs text-cream-white/60">A magical journey</span>
        </div>
      </div>
    </motion.header>
  );
}
