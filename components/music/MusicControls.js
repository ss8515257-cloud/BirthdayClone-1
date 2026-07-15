'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Volume2,
  VolumeX,
  Music,
  Play,
  Pause,
  ListMusic,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import { MUSIC_TRACKS } from '@/constants/music';
import { useApp } from '@/lib/context';
import { useHaptic } from '@/hooks';
import { cn } from '@/utils';
import MusicVisualizer from './MusicVisualizer';

export default function MusicControls() {
  const {
    musicEnabled,
    selectedTrack,
    volume,
    setVolume,
    isMuted,
    isPlaying,
    toggleMute,
    togglePlay,
    openMusicSelector,
    usingAmbient,
  } = useApp();

  const [expanded, setExpanded] = useState(false);
  const { vibrate } = useHaptic();

  const track = MUSIC_TRACKS.find((t) => t.id === selectedTrack);

  if (!musicEnabled || !track) return null;

  const handleTogglePlay = () => {
    vibrate(10);
    togglePlay();
  };

  const handleToggleMute = () => {
    vibrate(10);
    toggleMute();
  };

  return (
    <motion.div
      className="mobile-music-bar fixed left-3 right-3 z-40 mx-auto max-w-md sm:bottom-4 sm:left-auto sm:right-6 sm:mx-0 md:safe-bottom"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="glass-card overflow-hidden shadow-premium">
        {/* Collapsed bar */}
        <div className="flex items-center gap-2 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3">
          <button
            onClick={handleTogglePlay}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-pink to-lavender text-night-sky shadow-glow transition-transform hover:scale-105"
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="ml-0.5 h-4 w-4" />
            )}
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-lg">{track.emoji}</span>
              <p className="truncate text-sm font-medium text-cream-white">
                {track.name}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <MusicVisualizer isPlaying={isPlaying} color={track.color} />
              {usingAmbient && (
                <span className="text-[10px] text-cream-white/60">
                  ambient preview
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => setExpanded((e) => !e)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-cream-white/75 transition-colors hover:bg-white/10 hover:text-white"
            aria-label={expanded ? 'Collapse controls' : 'Expand controls'}
            aria-expanded={expanded}
          >
            {expanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Expanded controls */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-white/10"
            >
              <div className="flex items-center gap-3 px-4 py-3">
                <Volume2 className="h-4 w-4 shrink-0 text-cream-white/70" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-white/20 accent-rose-pink"
                  aria-label="Volume"
                />
                <button
                  onClick={handleToggleMute}
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full transition-colors',
                    isMuted
                      ? 'bg-rose-pink/20 text-rose-pink'
                      : 'text-cream-white/75 hover:bg-white/10'
                  )}
                  aria-label={
                    !isPlaying ? 'Play music' : isMuted ? 'Unmute' : 'Mute'
                  }
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </button>
                <button
                  onClick={openMusicSelector}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-cream-white/75 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Change track"
                >
                  <ListMusic className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function MusicFab() {
  const { openMusicSelector } = useApp();
  const { vibrate } = useHaptic();

  return (
    <motion.button
      onClick={() => {
        vibrate(10);
        openMusicSelector();
      }}
      className="glass-card fixed right-3 top-[calc(env(safe-area-inset-top,0px)+3.75rem)] z-40 flex h-11 w-11 items-center justify-center shadow-glow sm:right-6 sm:top-auto sm:bottom-6 sm:h-12 sm:w-12 md:safe-bottom"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Enable music"
    >
      <Music className="h-5 w-5 text-rose-pink" />
    </motion.button>
  );
}
