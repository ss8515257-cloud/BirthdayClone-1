'use client';

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { SITE_CONFIG } from '@/constants';
import { useApp } from '@/lib/context';
import { useHaptic } from '@/hooks';

export default function SiteHeader({ show = true, showBack = false }) {
  const { goBackToJourney } = useApp();
  const { vibrate } = useHaptic();

  if (!show) return null;

  const handleBack = () => {
    vibrate(10);
    goBackToJourney();
  };

  return (
    <motion.header
      className="safe-top fixed left-0 right-0 top-0 z-30 px-3 py-2 sm:px-6 sm:py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          {showBack && (
            <button
              type="button"
              onClick={handleBack}
              className="glass-card flex shrink-0 items-center gap-1.5 px-3 py-1.5 text-cream-white/90 transition-colors hover:bg-white/10 hover:text-white sm:gap-2 sm:px-4 sm:py-2"
              aria-label="Back to journey choices"
            >
              <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="hidden font-poppins text-xs sm:inline">
                Journeys
              </span>
            </button>
          )}

          <div className="glass-card flex min-w-0 items-center gap-1.5 px-3 py-1.5 sm:gap-2 sm:px-4 sm:py-2">
            <span className="text-base sm:text-lg" aria-hidden="true">
              ❤️
            </span>
            <span className="truncate font-dancing text-base text-cream-white/90 sm:text-xl">
              {SITE_CONFIG.name}
            </span>
          </div>
        </div>

        <div className="glass-card hidden items-center gap-2 px-4 py-2 sm:flex">
          <span className="h-2 w-2 animate-pulse rounded-full bg-rose-pink" />
          <span className="text-xs text-cream-white/75">A magical journey</span>
        </div>
      </div>
    </motion.header>
  );
}
