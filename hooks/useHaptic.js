'use client';

import { useCallback } from 'react';

export function useHaptic() {
  const vibrate = useCallback((pattern = 10) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  }, []);

  return { vibrate };
}
