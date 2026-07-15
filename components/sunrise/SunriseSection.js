'use client';

import { useRef, useEffect } from 'react';
import { useScroll, motion } from 'framer-motion';
import { Section } from '@/components/layout';
import { SUNRISE_META } from '@/constants';
import { useReducedMotion } from '@/hooks';
import SunriseScene from './SunriseScene';

export default function SunriseSection() {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const overlay = document.getElementById('sunrise-overlay');
    if (!overlay || prefersReducedMotion) return;

    const update = (v) => {
      const warmth = Math.max(0, Math.min(1, v));
      overlay.style.opacity = String(warmth * 0.55);
      overlay.style.background = `linear-gradient(180deg,
        rgba(255,107,107,${warmth * 0.25}) 0%,
        rgba(255,230,109,${warmth * 0.3}) 45%,
        rgba(248,232,238,${warmth * 0.35}) 100%)`;
    };

    update(scrollYProgress.get());
    const unsubscribe = scrollYProgress.on('change', update);

    return () => {
      unsubscribe();
      overlay.style.opacity = '0';
      overlay.style.background = '';
    };
  }, [scrollYProgress, prefersReducedMotion]);

  return (
    <Section
      id="sunrise"
      ariaLabel="Night to Sunrise"
      fullHeight={false}
      noPadding
      className="relative"
    >
      <div ref={containerRef} className="relative h-[140vh] sm:h-[180vh] md:h-[220vh]">
        <div className="sticky top-0 h-screen min-h-screen-safe">
          <SunriseScene progress={scrollYProgress} />

          {!prefersReducedMotion && (
            <motion.div
              className="absolute bottom-[calc(env(safe-area-inset-bottom,0px)+5rem)] left-1/2 z-20 -translate-x-1/2 text-center sm:bottom-8"
              initial={{ opacity: 1 }}
              animate={{ opacity: [1, 0.4, 1], y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <p className="font-poppins text-xs uppercase tracking-widest text-cream-white/70">
                {SUNRISE_META.scrollHint}
              </p>
              <span className="mt-1 block text-lg text-cream-white/60" aria-hidden="true">
                ↓
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </Section>
  );
}
