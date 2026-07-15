import { Howl } from 'howler';
import { AmbientMusicEngine } from './ambientMusic';

const soundCache = new Map();
const CROSSFADE_MS = 1500;

let sharedAmbient = null;

function getAmbientEngine() {
  if (!sharedAmbient) {
    sharedAmbient = new AmbientMusicEngine();
  }
  return sharedAmbient;
}

export function playSound(src, options = {}) {
  const { volume = 0.3, loop = false } = options;
  if (!src) return null;

  let sound = soundCache.get(src);
  if (!sound) {
    sound = new Howl({ src: [src], volume, loop, html5: true });
    soundCache.set(src, sound);
  }

  sound.volume(volume);
  sound.play();
  return sound;
}

export function stopSound(src) {
  const sound = soundCache.get(src);
  if (sound) sound.stop();
}

export function setVolume(src, volume) {
  const sound = soundCache.get(src);
  if (sound) sound.volume(volume);
}

export function createMusicPlayer(tracks) {
  let currentHowl = null;
  let currentTrack = null;
  let volume = 0.5;
  let isMuted = false;
  let isPlaying = false;
  let useAmbient = false;
  let listeners = [];

  const ambient = getAmbientEngine();

  const notify = () => {
    listeners.forEach((fn) => fn());
  };

  const getTargetVolume = () => (isMuted ? 0 : volume);

  const cleanupHowl = (howl) => {
    if (!howl) return;
    try {
      howl.stop();
      howl.unload();
    } catch {
      // Howl may already be unloaded
    }
  };

  const setPlayingState = (playing) => {
    isPlaying = playing;
    notify();
  };

  const playAmbient = async (track) => {
    useAmbient = true;
    cleanupHowl(currentHowl);
    currentHowl = null;
    currentTrack = track;
    ambient.setVolume(volume);
    ambient.setMuted(isMuted);
    const ok = await ambient.play(track.id);
    setPlayingState(ok);
    return ok;
  };

  const crossfadeToHowl = (track) => {
    useAmbient = false;
    ambient.stop(false);

    let started = false;

    const newHowl = new Howl({
      src: [track.src],
      loop: true,
      html5: true,
      volume: 0,
      preload: true,
      onload: () => {
        if (started) return;
        started = true;
        newHowl.play();
        newHowl.fade(0, getTargetVolume(), CROSSFADE_MS);
        setPlayingState(true);
      },
      onplay: () => setPlayingState(true),
      onpause: () => setPlayingState(false),
      onstop: () => setPlayingState(false),
      onloaderror: async () => {
        if (started) return;
        started = true;
        cleanupHowl(newHowl);
        await playAmbient(track);
      },
      onplayerror: async () => {
        if (useAmbient) return;
        cleanupHowl(newHowl);
        currentHowl = null;
        await playAmbient(track);
      },
    });

    if (currentHowl) {
      const old = currentHowl;
      const oldVol = old.volume();
      old.fade(oldVol, 0, CROSSFADE_MS);
      setTimeout(() => cleanupHowl(old), CROSSFADE_MS + 100);
    }

    currentHowl = newHowl;
    currentTrack = track;
    notify();

    // If already cached/loaded, onload may not fire — try play after short delay
    setTimeout(() => {
      if (started) return;
      if (newHowl.state() === 'loaded') {
        started = true;
        newHowl.play();
        newHowl.fade(0, getTargetVolume(), CROSSFADE_MS);
        setPlayingState(true);
      }
    }, 300);

    // Ultimate fallback if file missing
    setTimeout(async () => {
      if (started || useAmbient) return;
      if (!newHowl.playing()) {
        started = true;
        cleanupHowl(newHowl);
        currentHowl = null;
        await playAmbient(track);
      }
    }, 1200);
  };

  function play(trackId) {
    const track = tracks.find((t) => t.id === trackId);
    if (!track) return;

    if (currentTrack?.id === trackId && (currentHowl || useAmbient)) {
      if (!isPlaying) {
        if (useAmbient) {
          ambient.resume().then((ok) => setPlayingState(ok));
        } else if (currentHowl) {
          currentHowl.play();
          currentHowl.fade(currentHowl.volume(), getTargetVolume(), 500);
          setPlayingState(true);
        }
      } else if (currentHowl && !currentHowl.playing()) {
        currentHowl.play();
        currentHowl.fade(currentHowl.volume(), getTargetVolume(), 500);
        setPlayingState(true);
      } else if (useAmbient && !ambient.getIsPlaying()) {
        ambient.resume().then((ok) => setPlayingState(ok));
      }
      return;
    }

    crossfadeToHowl(track);
  }

  function pause() {
    if (useAmbient) {
      ambient.pause();
      setPlayingState(false);
      return;
    }
    if (!currentHowl || !isPlaying) return;
    const currentVol = currentHowl.volume();
    currentHowl.fade(currentVol, 0, 500);
    setTimeout(() => {
      currentHowl?.pause();
      setPlayingState(false);
    }, 500);
  }

  function resume() {
    if (useAmbient) {
      ambient.resume().then((ok) => setPlayingState(ok));
      return;
    }
    if (!currentHowl || isPlaying) return;
    currentHowl.play();
    currentHowl.fade(0, getTargetVolume(), 500);
    setPlayingState(true);
  }

  function togglePlay() {
    if (isPlaying) pause();
    else resume();
  }

  function setMusicVolume(newVolume) {
    volume = Math.max(0, Math.min(1, newVolume));
    if (useAmbient) {
      ambient.setVolume(volume);
    } else if (currentHowl && !isMuted) {
      currentHowl.volume(volume);
    }
    notify();
  }

  function toggleMute() {
    isMuted = !isMuted;
    if (useAmbient) {
      ambient.setMuted(isMuted);
    } else if (currentHowl) {
      currentHowl.volume(isMuted ? 0 : volume);
    }
    notify();
    return isMuted;
  }

  function stop() {
    ambient.stop();
    useAmbient = false;
    if (!currentHowl) {
      currentTrack = null;
      setPlayingState(false);
      return;
    }
    const currentVol = currentHowl.volume();
    currentHowl.fade(currentVol, 0, 1000);
    setTimeout(() => {
      cleanupHowl(currentHowl);
      currentHowl = null;
      currentTrack = null;
      setPlayingState(false);
    }, 1000);
  }

  function subscribe(fn) {
    listeners.push(fn);
    return () => {
      listeners = listeners.filter((l) => l !== fn);
    };
  }

  function isUsingAmbient() {
    return useAmbient;
  }

  return {
    play,
    pause,
    resume,
    togglePlay,
    setMusicVolume,
    toggleMute,
    stop,
    subscribe,
    isUsingAmbient,
    getCurrentTrack: () => currentTrack,
    getIsPlaying: () => isPlaying,
    getVolume: () => volume,
    getIsMuted: () => isMuted,
  };
}
