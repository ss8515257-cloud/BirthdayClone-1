'use client';

import { useEffect, useState } from 'react';
import { AppProvider } from '@/lib/context';

export default function Providers({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <AppProvider>
      {mounted ? children : <div className="min-h-screen bg-night-sky" />}
    </AppProvider>
  );
}
