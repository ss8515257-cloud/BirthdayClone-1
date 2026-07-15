'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MEMORY_BOOK_PAGES } from '@/constants/content';
import { SOUND_EFFECTS } from '@/constants';
import { playSound } from '@/lib/audio';
import { useHaptic, useReducedMotion } from '@/hooks';
import { cn } from '@/utils';
import BookCover from './BookCover';
import BookSpread from './BookSpread';

export default function MemoryBook() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState(1);
  const touchStartX = useRef(0);
  const { vibrate } = useHaptic();
  const prefersReducedMotion = useReducedMotion();

  const totalPages = MEMORY_BOOK_PAGES.length;
  const page = MEMORY_BOOK_PAGES[currentPage];

  const playPageTurn = useCallback(() => {
    vibrate(12);
    try {
      playSound(SOUND_EFFECTS.paperTurn, { volume: 0.25 });
    } catch {
      // Sound file may not exist yet
    }
  }, [vibrate]);

  const goToPage = useCallback(
    (next, direction) => {
      if (isFlipping) return;
      if (next < 0 || next >= totalPages) return;

      setFlipDirection(direction);
      setIsFlipping(true);
      playPageTurn();

      const delay = prefersReducedMotion ? 0 : 600;
      setTimeout(() => {
        setCurrentPage(next);
        setIsFlipping(false);
      }, delay);
    },
    [isFlipping, totalPages, playPageTurn, prefersReducedMotion]
  );

  const handleOpen = () => {
    setIsOpen(true);
    playPageTurn();
  };

  const handlePrev = () => goToPage(currentPage - 1, -1);
  const handleNext = () => goToPage(currentPage + 1, 1);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
  };

  if (!isOpen) {
    return (
      <div className="perspective-1000 mx-auto w-full max-w-sm sm:max-w-md">
        <div
          className="preserve-3d relative h-[min(72vh,360px)] sm:h-[420px] md:h-[480px]"
          style={{ transform: 'rotateY(-5deg) rotateX(2deg)' }}
        >
          <div className="absolute -bottom-4 left-4 right-4 h-4 rounded-full bg-black/20 blur-xl" />
          <BookCover onOpen={handleOpen} />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* Book body */}
      <div
        className="perspective-1000 relative"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute -bottom-4 left-8 right-8 h-6 rounded-full bg-black/25 blur-xl" />

        <div
          className="preserve-3d relative overflow-hidden rounded-lg shadow-premium"
          style={{ transform: 'rotateX(1deg)' }}
        >
          {/* Book spine */}
          <div className="absolute bottom-0 left-0 top-0 z-20 w-4 bg-gradient-to-r from-rose-gold/50 via-rose-gold/30 to-transparent" />

          {/* Pages container — flows naturally on mobile, fixed height on desktop */}
          <div className="relative sm:h-[400px] md:h-[460px] sm:overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                className="flex sm:absolute sm:inset-0"
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : {
                        rotateY: flipDirection * 90,
                        opacity: 0,
                      }
                }
                animate={{ rotateY: 0, opacity: 1 }}
                exit={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : {
                        rotateY: flipDirection * -90,
                        opacity: 0,
                      }
                }
                transition={{
                  duration: prefersReducedMotion ? 0.15 : 0.6,
                  ease: [0.4, 0, 0.2, 1],
                }}
                style={{ transformOrigin: 'left center', transformStyle: 'preserve-3d' }}
              >
                <BookSpread
                  page={page}
                  pageNumber={currentPage + 1}
                  totalPages={totalPages}
                />
              </motion.div>
            </AnimatePresence>

            {/* Page curl shadow during flip */}
            {isFlipping && !prefersReducedMotion && (
              <motion.div
                className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/10 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between gap-4 px-2">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0 || isFlipping}
          className={cn(
            'glass-card flex h-11 w-11 items-center justify-center transition-all',
            currentPage === 0
              ? 'cursor-not-allowed opacity-30'
              : 'hover:shadow-glow'
          )}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Page dots */}
        <div className="flex items-center gap-2" role="tablist" aria-label="Book pages">
          {MEMORY_BOOK_PAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i, i > currentPage ? 1 : -1)}
              disabled={isFlipping}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                i === currentPage
                  ? 'w-6 bg-rose-pink'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              )}
              aria-label={`Page ${i + 1}`}
              aria-selected={i === currentPage}
              role="tab"
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages - 1 || isFlipping}
          className={cn(
            'glass-card flex h-11 w-11 items-center justify-center transition-all',
            currentPage === totalPages - 1
              ? 'cursor-not-allowed opacity-30'
              : 'hover:shadow-glow'
          )}
          aria-label="Next page"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <p className="mt-4 text-center text-xs text-cream-white/60">
        Swipe or tap arrows to turn the page
      </p>
    </div>
  );
}
