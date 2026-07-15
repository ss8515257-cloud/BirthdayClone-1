'use client';

import { motion } from 'framer-motion';
import { X, Music2 } from 'lucide-react';
import { MUSIC_TRACKS } from '@/constants/music';
import { cn } from '@/utils';

function TrackCard({ track, isSelected, onSelect }) {
  return (
    <motion.button
      onClick={() => onSelect(track)}
      className={cn(
        'group relative w-full overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 sm:p-5',
        isSelected
          ? 'border-rose-pink/60 bg-rose-pink/10 shadow-glow'
          : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10'
      )}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      aria-label={`Select ${track.name}`}
      aria-pressed={isSelected}
    >
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at top left, ${track.color}20, transparent 70%)`,
        }}
      />

      <div className="relative flex items-center gap-4">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl shadow-glass"
          style={{ backgroundColor: `${track.color}25` }}
        >
          {track.emoji}
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-playfair text-base font-semibold text-cream-white sm:text-lg">
            {track.name}
          </p>
          <p className="text-xs text-cream-white/80">{track.mood}</p>
          <p className="mt-1 truncate text-sm text-cream-white/70">
            {track.description}
          </p>
        </div>

        {isSelected && (
          <motion.span
            className="text-rose-pink"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            aria-hidden="true"
          >
            ♪
          </motion.span>
        )}
      </div>
    </motion.button>
  );
}

export default function MusicSelector({
  selectedTrack,
  onSelect,
  onSkip,
  onClose,
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label="Music selection"
    >
      <motion.div
        className="glass-card relative max-h-[85dvh] w-full max-w-lg overflow-y-auto p-5 sm:max-h-[90vh] sm:p-8"
        initial={{ scale: 0.92, y: 24 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 24 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      >
        {onClose && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-cream-white/75 transition-colors hover:bg-white/20 hover:text-white"
            aria-label="Close music selector"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <div className="mb-6 text-center">
          <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-pink/20">
            <Music2 className="h-6 w-6 text-rose-pink" />
          </div>
          <h3 className="heading-script text-gradient-luxury">
            Set the Mood
          </h3>
          <p className="mt-2 text-sm text-cream-white/75">
            Choose a soundtrack for your magical journey.
            <br />
            <span className="text-cream-white/60">
              Music never plays without your permission.
            </span>
          </p>
          <p className="mt-2 text-xs text-cream-white/50">
            Add your own MP3s to public/assets/music/ for full tracks.
            Ambient preview plays until then.
          </p>
        </div>

        <div className="space-y-3">
          {MUSIC_TRACKS.map((track) => (
            <TrackCard
              key={track.id}
              track={track}
              isSelected={selectedTrack === track.id}
              onSelect={onSelect}
            />
          ))}
        </div>

        <button
          onClick={onSkip}
          className="mt-6 w-full rounded-xl py-3 text-center text-sm text-cream-white/70 transition-colors hover:bg-white/5 hover:text-cream-white/95"
        >
          Continue without music
        </button>
      </motion.div>
    </motion.div>
  );
}
