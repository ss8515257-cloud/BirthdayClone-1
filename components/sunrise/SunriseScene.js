'use client';

import { useState, useEffect } from 'react';
import { useTransform, motion } from 'framer-motion';
import { SUNRISE_META, SUNRISE_STARS } from '@/constants';
import { useReducedMotion } from '@/hooks';

function SunriseText({ progress }) {
  const [text, setText] = useState(SUNRISE_META.phases[0].text);

  useEffect(() => {
    if (typeof progress === 'number') {
      const phase = [...SUNRISE_META.phases]
        .reverse()
        .find((p) => progress >= p.threshold);
      setText(phase?.text || SUNRISE_META.phases[0].text);
      return;
    }

    return progress.on('change', (v) => {
      const phase = [...SUNRISE_META.phases]
        .reverse()
        .find((p) => v >= p.threshold);
      setText(phase?.text || SUNRISE_META.phases[0].text);
    });
  }, [progress]);

  return (
    <div className="absolute inset-x-0 bottom-[12%] z-10 px-6 text-center">
      <motion.p
        key={text}
        className="font-dancing text-3xl text-cream-white drop-shadow-lg sm:text-4xl md:text-5xl"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {text}
      </motion.p>
    </div>
  );
}

export default function SunriseScene({ progress }) {
  const prefersReducedMotion = useReducedMotion();
  const staticProgress = prefersReducedMotion ? 1 : null;

  const nightOpacity = useTransform(progress, [0, 0.55], [1, 0]);
  const starOpacity = useTransform(progress, [0, 0.45], [1, 0]);
  const moonY = useTransform(progress, [0, 0.5], ['0%', '40%']);
  const moonOpacity = useTransform(progress, [0.2, 0.55], [1, 0]);
  const sunY = useTransform(progress, [0.25, 0.8], ['110%', '22%']);
  const sunOpacity = useTransform(progress, [0.2, 0.4], [0, 1]);
  const sunGlow = useTransform(progress, [0.4, 0.85], [0.3, 1]);
  const horizonGlow = useTransform(progress, [0.3, 0.75], [0, 1]);
  const skyWarmth = useTransform(progress, [0, 1], [0, 1]);
  const cloudWarmth = useTransform(progress, [0.4, 0.8], [0, 1]);
  const birdOpacity = useTransform(progress, [0.65, 0.85], [0, 1]);
  const birdX = useTransform(progress, [0.65, 1], ['-20%', '120%']);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-night"
        style={{ opacity: staticProgress !== null ? 0 : nightOpacity }}
      />

      <motion.div
        className="absolute inset-0 bg-gradient-sunrise"
        style={{ opacity: staticProgress ?? skyWarmth }}
      />

      <motion.div
        className="absolute inset-0"
        style={{ opacity: staticProgress !== null ? 0 : starOpacity }}
        aria-hidden="true"
      >
        {SUNRISE_STARS.map((star, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-champagne-gold"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animation: prefersReducedMotion
                ? 'none'
                : `twinkle ${3 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </motion.div>

      <motion.div
        className="absolute left-[18%] top-[20%] text-6xl sm:text-7xl"
        style={{
          y: staticProgress !== null ? '40%' : moonY,
          opacity: staticProgress !== null ? 0 : moonOpacity,
        }}
        aria-hidden="true"
      >
        🌙
      </motion.div>

      <motion.div
        className="absolute inset-x-0 top-[25%] flex justify-between px-[8%] text-4xl opacity-30 sm:text-5xl"
        style={{ opacity: staticProgress !== null ? 0.15 : nightOpacity }}
        aria-hidden="true"
      >
        <span>☁️</span>
        <span>☁️</span>
        <span>☁️</span>
      </motion.div>

      <motion.div
        className="absolute inset-x-0 bottom-[28%] h-40"
        style={{
          opacity: staticProgress ?? horizonGlow,
          background:
            'linear-gradient(to top, rgba(255,107,107,0.5), rgba(255,230,109,0.2), transparent)',
        }}
        aria-hidden="true"
      />

      <motion.div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          y: staticProgress !== null ? '22%' : sunY,
          opacity: staticProgress ?? sunOpacity,
        }}
        aria-hidden="true"
      >
        <motion.div
          className="relative h-28 w-28 rounded-full sm:h-36 sm:w-36"
          style={{
            background:
              'radial-gradient(circle, #FFE66D 0%, #FF6B6B 70%, transparent 100%)',
            boxShadow: '0 0 60px rgba(255,230,109,0.8)',
          }}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              opacity: staticProgress ?? sunGlow,
              boxShadow: '0 0 100px 40px rgba(255,200,100,0.4)',
            }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute inset-x-0 bottom-[32%] flex justify-between px-[10%] text-3xl sm:text-4xl"
        style={{ opacity: staticProgress ?? cloudWarmth }}
        aria-hidden="true"
      >
        <span className="opacity-60">🌤️</span>
        <span className="opacity-40">🌤️</span>
      </motion.div>

      <motion.div
        className="absolute top-[30%] text-2xl"
        style={{
          opacity: staticProgress ?? birdOpacity,
          x: staticProgress !== null ? '50%' : birdX,
        }}
        aria-hidden="true"
      >
        🕊️
      </motion.div>

      <div
        className="absolute inset-x-0 bottom-0 h-[30%]"
        style={{
          background:
            'linear-gradient(to top, rgba(15,12,41,0.9) 0%, rgba(48,43,99,0.4) 60%, transparent 100%)',
        }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[22%]"
        style={{
          opacity: staticProgress ?? skyWarmth,
          background:
            'linear-gradient(to top, rgba(183,110,121,0.3) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <SunriseText progress={staticProgress ?? progress} />
    </div>
  );
}
