'use client';

import { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { useReducedMotion, useIsMobile } from '@/hooks';
import { cn } from '@/utils';

export default function ThreeCanvas({
  children,
  className,
  camera = { position: [0, 0, 5], fov: 60 },
  style,
}) {
  const [Canvas, setCanvas] = useState(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [dpr, setDpr] = useState(1);

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    let mounted = true;

    import('@react-three/fiber').then((mod) => {
      if (mounted) {
        setCanvas(() => mod.Canvas);
        const isMobile = window.innerWidth < 768;
        setDpr(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 2));
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  const setRefs = useCallback(
    (node) => {
      inViewRef(node);
    },
    [inViewRef]
  );

  if (!Canvas) {
    return (
      <div
        ref={setRefs}
        className={cn(
          'relative flex h-full w-full items-center justify-center',
          className
        )}
        style={style}
        aria-hidden="true"
      >
        <div className="h-8 w-8 animate-pulse rounded-full bg-lavender/30" />
      </div>
    );
  }

  return (
    <div
      ref={setRefs}
      className={cn('relative h-full w-full', className)}
      style={style}
    >
      <Canvas
        camera={camera}
        dpr={prefersReducedMotion ? 1 : dpr}
        frameloop={inView ? 'always' : 'demand'}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        style={{ background: 'transparent' }}
      >
        {children}
      </Canvas>
    </div>
  );
}
