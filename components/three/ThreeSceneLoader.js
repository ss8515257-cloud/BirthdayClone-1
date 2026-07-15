'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/utils';

/**
 * Loads a Three.js scene only after client mount.
 * Prevents R3F from evaluating during SSR / Turbopack pre-bundling.
 */
export default function ThreeSceneLoader({
  loader,
  className,
  fallback,
  ...sceneProps
}) {
  const [Scene, setScene] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    loader()
      .then((mod) => {
        if (mounted) setScene(() => mod.default);
      })
      .catch((err) => {
        if (mounted) setError(err);
      });

    return () => {
      mounted = false;
    };
  }, [loader]);

  if (error) {
    return (
      <div
        className={cn(
          'flex h-full w-full items-center justify-center text-sm text-cream-white/70',
          className
        )}
      >
        Unable to load 3D scene
      </div>
    );
  }

  if (!Scene) {
    return (
      fallback || (
        <div
          className={cn(
            'flex h-full w-full items-center justify-center',
            className
          )}
          aria-hidden="true"
        >
          <div className="h-10 w-10 animate-pulse rounded-full bg-lavender/20" />
        </div>
      )
    );
  }

  return <Scene className={className} {...sceneProps} />;
}
