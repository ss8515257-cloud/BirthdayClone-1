'use client';

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { createMusicPlayer } from './audio';
import { MUSIC_TRACKS, MUSIC_STORAGE_KEYS } from '@/constants/music';

const AppContext = createContext(null);

function readStorage(key, fallback = null) {
  if (typeof window === 'undefined') return fallback;
  try {
    const value = localStorage.getItem(key);
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage unavailable
  }
}

export function AppProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentJourney, setCurrentJourney] = useState(null);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicChosen, setMusicChosen] = useState(false);
  const [showMusicSelector, setShowMusicSelector] = useState(false);
  const [musicHydrated, setMusicHydrated] = useState(false);
  const [usingAmbient, setUsingAmbient] = useState(false);
  const backToJourneyRef = useRef(null);

  const musicPlayer = useMemo(() => createMusicPlayer(MUSIC_TRACKS), []);

  useEffect(() => {
    const unsub = musicPlayer.subscribe(() => {
      setIsPlaying(musicPlayer.getIsPlaying());
      setUsingAmbient(musicPlayer.isUsingAmbient?.() ?? false);
    });
    return unsub;
  }, [musicPlayer]);

  const hydrateMusic = useCallback(() => {
    const chosen = readStorage(MUSIC_STORAGE_KEYS.chosen) === 'true';
    const skipped = readStorage(MUSIC_STORAGE_KEYS.skipped) === 'true';
    const enabled = readStorage(MUSIC_STORAGE_KEYS.enabled) === 'true';
    const trackId = readStorage(MUSIC_STORAGE_KEYS.track);
    const savedVolume = readStorage(MUSIC_STORAGE_KEYS.volume);
    const savedMuted = readStorage(MUSIC_STORAGE_KEYS.muted) === 'true';

    if (savedVolume) {
      const vol = parseFloat(savedVolume);
      setVolume(vol);
      musicPlayer.setMusicVolume(vol);
    }

    if (savedMuted) {
      setIsMuted(true);
      musicPlayer.toggleMute();
    }

    setMusicChosen(chosen);

    if (!chosen) {
      setShowMusicSelector(true);
    } else if (enabled && trackId) {
      // Restore UI state only — don't autoplay (browser blocks without gesture)
      setSelectedTrack(trackId);
      setMusicEnabled(true);
    } else if (skipped) {
      setMusicEnabled(false);
    }

    setMusicHydrated(true);
  }, [musicPlayer]);

  const selectTrack = useCallback(
    (trackId) => {
      setSelectedTrack(trackId);
      setMusicEnabled(true);
      setMusicChosen(true);
      setShowMusicSelector(false);

      musicPlayer.play(trackId);

      // Verify playback started shortly after user gesture
      setTimeout(() => {
        if (!musicPlayer.getIsPlaying()) {
          musicPlayer.play(trackId);
        }
        setUsingAmbient(musicPlayer.isUsingAmbient?.() ?? false);
      }, 500);

      writeStorage(MUSIC_STORAGE_KEYS.track, trackId);
      writeStorage(MUSIC_STORAGE_KEYS.enabled, 'true');
      writeStorage(MUSIC_STORAGE_KEYS.skipped, 'false');
      writeStorage(MUSIC_STORAGE_KEYS.chosen, 'true');
    },
    [musicPlayer]
  );

  const skipMusic = useCallback(() => {
    setMusicEnabled(false);
    setMusicChosen(true);
    setShowMusicSelector(false);
    musicPlayer.stop();

    writeStorage(MUSIC_STORAGE_KEYS.skipped, 'true');
    writeStorage(MUSIC_STORAGE_KEYS.enabled, 'false');
    writeStorage(MUSIC_STORAGE_KEYS.chosen, 'true');
  }, [musicPlayer]);

  const changeTrack = useCallback(
    (trackId) => {
      selectTrack(trackId);
    },
    [selectTrack]
  );

  const updateVolume = useCallback(
    (newVolume) => {
      setVolume(newVolume);
      musicPlayer.setMusicVolume(newVolume);
      writeStorage(MUSIC_STORAGE_KEYS.volume, String(newVolume));
    },
    [musicPlayer]
  );

  const toggleMute = useCallback(() => {
    // Speaker tap while stopped: start playback (common expectation)
    if (!isPlaying && selectedTrack) {
      if (isMuted) {
        musicPlayer.toggleMute();
        setIsMuted(false);
        writeStorage(MUSIC_STORAGE_KEYS.muted, 'false');
      }
      musicPlayer.play(selectedTrack);
      return false;
    }

    const muted = musicPlayer.toggleMute();
    setIsMuted(muted);
    writeStorage(MUSIC_STORAGE_KEYS.muted, String(muted));
    return muted;
  }, [musicPlayer, isPlaying, isMuted, selectedTrack]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      musicPlayer.pause();
    } else if (selectedTrack) {
      // play() handles both cold start (e.g. after hydrate without autoplay) and resume
      musicPlayer.play(selectedTrack);
    }
  }, [musicPlayer, isPlaying, selectedTrack]);

  const openMusicSelector = useCallback(() => {
    setShowMusicSelector(true);
  }, []);

  const registerBackToJourney = useCallback((handler) => {
    backToJourneyRef.current = handler;
    return () => {
      if (backToJourneyRef.current === handler) {
        backToJourneyRef.current = null;
      }
    };
  }, []);

  const goBackToJourney = useCallback(() => {
    backToJourneyRef.current?.();
  }, []);

  const value = {
    isLoading,
    setIsLoading,
    currentJourney,
    setCurrentJourney,
    musicEnabled,
    setMusicEnabled,
    selectedTrack,
    setSelectedTrack,
    volume,
    setVolume: updateVolume,
    isMuted,
    setIsMuted,
    isPlaying,
    musicChosen,
    showMusicSelector,
    setShowMusicSelector,
    musicHydrated,
    hydrateMusic,
    selectTrack,
    skipMusic,
    changeTrack,
    toggleMute,
    togglePlay,
    openMusicSelector,
    musicPlayer,
    usingAmbient,
    registerBackToJourney,
    goBackToJourney,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
