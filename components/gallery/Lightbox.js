'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Lightbox({ photos, index, onClose, onNavigate }) {
  const isOpen = index !== null && index >= 0;
  const photo = isOpen ? photos[index] : null;

  const goPrev = useCallback(
    () => onNavigate((index - 1 + photos.length) % photos.length),
    [index, photos.length, onNavigate]
  );
  const goNext = useCallback(
    () => onNavigate((index + 1) % photos.length),
    [index, photos.length, onNavigate]
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, goPrev, goNext]);

  return (
    <AnimatePresence>
      {isOpen && photo && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-3 pb-[calc(env(safe-area-inset-bottom,0px)+4.5rem)] sm:p-4 sm:pb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={photo.caption}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-night-sky/80 backdrop-blur-md" />

          {/* Close — top-right, clear of nav buttons */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-[calc(env(safe-area-inset-top,0px)+0.75rem)] z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-cream-white backdrop-blur transition hover:bg-white/20 sm:right-4 sm:top-4"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Desktop side arrows */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-2 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-cream-white backdrop-blur transition hover:bg-white/20 sm:flex sm:left-6"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-2 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-cream-white backdrop-blur transition hover:bg-white/20 sm:flex sm:right-6"
            aria-label="Next photo"
          >
            <ChevronRight className="h-7 w-7" />
          </button>

          {/* Framed photo */}
          <motion.div
            key={photo.id}
            className="relative z-[1] w-full max-w-[min(100%,28rem)] rounded-lg bg-cream-white p-2.5 pb-10 shadow-premium sm:max-w-lg sm:p-4 sm:pb-16"
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-sm">
              {photo.src ? (
                <Image
                  src={photo.src}
                  alt={photo.caption}
                  fill
                  sizes="(max-width: 640px) 90vw, 512px"
                  className="object-cover"
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${photo.color}, ${photo.color}aa)`,
                  }}
                >
                  <span className="text-6xl sm:text-8xl">{photo.illustration}</span>
                </div>
              )}
            </div>
            <div className="absolute inset-x-0 bottom-3 px-3 text-center sm:bottom-4 sm:px-4">
              <p className="font-dancing text-base text-night-sky/85 sm:text-2xl">
                {photo.caption}
              </p>
              {photo.date && (
                <p className="mt-1 font-poppins text-[10px] uppercase tracking-widest text-rose-gold/70 sm:text-xs">
                  {photo.date}
                </p>
              )}
            </div>
          </motion.div>

          {/* Mobile bottom nav bar — no overlap with close */}
          <div
            className="absolute inset-x-3 bottom-[calc(env(safe-area-inset-bottom,0px)+0.75rem)] z-10 flex items-center justify-between gap-2 sm:hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={goPrev}
              className="touch-target flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-cream-white backdrop-blur transition active:bg-white/20"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <span className="rounded-full bg-white/10 px-4 py-2 font-poppins text-xs text-cream-white/80 backdrop-blur">
              {index + 1} / {photos.length}
            </span>

            <button
              type="button"
              onClick={goNext}
              className="touch-target flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-cream-white backdrop-blur transition active:bg-white/20"
              aria-label="Next photo"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
