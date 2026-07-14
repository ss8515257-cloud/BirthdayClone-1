'use client';

import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useApp } from '@/lib/context';
import { useHaptic } from '@/hooks';
import MusicSelector from './MusicSelector';
import MusicControls, { MusicFab } from './MusicControls';

export default function MusicPlayer() {
  const {
    musicEnabled,
    selectedTrack,
    showMusicSelector,
    musicHydrated,
    hydrateMusic,
    selectTrack,
    skipMusic,
    changeTrack,
    setShowMusicSelector,
  } = useApp();

  const { vibrate } = useHaptic();

  useEffect(() => {
    hydrateMusic();
  }, [hydrateMusic]);

  const handleSelect = (track) => {
    vibrate(15);
    if (musicEnabled && selectedTrack) {
      changeTrack(track.id);
    } else {
      selectTrack(track.id);
    }
  };

  const handleSkip = () => {
    vibrate(10);
    skipMusic();
  };

  const handleCloseSelector = () => {
    if (musicEnabled) {
      setShowMusicSelector(false);
    } else {
      skipMusic();
    }
  };

  if (!musicHydrated) return null;

  return (
    <>
      <AnimatePresence>
        {showMusicSelector && (
          <MusicSelector
            selectedTrack={selectedTrack}
            onSelect={handleSelect}
            onSkip={handleSkip}
            onClose={musicEnabled ? handleCloseSelector : null}
          />
        )}
      </AnimatePresence>

      {musicEnabled ? <MusicControls /> : !showMusicSelector && <MusicFab />}
    </>
  );
}
