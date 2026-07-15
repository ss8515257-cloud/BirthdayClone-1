'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FINAL_MESSAGE, SITE_CONFIG } from '@/constants';
import { useReducedMotion } from '@/hooks';
import { fireGoldenParticles } from '@/lib/confetti';
import EndingParticles from './EndingParticles';

const lineVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      delay: i * 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function CinematicEnding() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const prefersReducedMotion = useReducedMotion();
  const revealed = inView || prefersReducedMotion;

  useEffect(() => {
    if (!inView || prefersReducedMotion) return;
    const timer = setTimeout(() => {
      try {
        fireGoldenParticles();
      } catch {}
    }, 1200);
    return () => clearTimeout(timer);
  }, [inView, prefersReducedMotion]);

  return (
    <div ref={ref} className="relative flex min-h-screen-safe flex-col items-center justify-center overflow-hidden px-4 py-16 sm:py-20">
      {/* Cinematic vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(59,7,100,0.85) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Letterbox bars */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[5vh] bg-night-sky/80 sm:h-[8vh]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[5vh] bg-night-sky/80 sm:h-[8vh]" aria-hidden="true" />

      {/* Film grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      <EndingParticles />

      {/* Spotlight */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(247,231,206,0.15) 0%, transparent 70%)',
        }}
        animate={
          prefersReducedMotion
            ? {}
            : { scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }
        }
        transition={{ duration: 5, repeat: Infinity }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-2xl px-4 text-center sm:px-6">
        {/* Opening flourish */}
        <motion.div
          className="mb-6 flex justify-center gap-3"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={revealed ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
          aria-hidden="true"
        >
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-champagne-gold/60" />
          <span className="text-cream-white/50">✦</span>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-champagne-gold/60" />
        </motion.div>

        {/* Name reveal */}
        <motion.p
          className="mb-3 font-poppins text-xs uppercase tracking-[0.35em] text-cream-white/70"
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={
            revealed
              ? { opacity: 1, letterSpacing: '0.35em' }
              : {}
          }
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          {FINAL_MESSAGE.forName}
        </motion.p>

        <motion.h2
          className="heading-display mb-4 text-gradient-gold"
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={revealed ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{
            duration: 1.2,
            delay: 0.4,
            type: 'spring',
            stiffness: 80,
          }}
        >
          {SITE_CONFIG.name}
        </motion.h2>

        <motion.p
          className="heading-script mb-2 text-2xl text-cream-white/90 sm:text-3xl md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {FINAL_MESSAGE.title}
        </motion.p>

        <motion.p
          className="mb-8 font-dancing text-lg text-cream-white/95 sm:mb-12 sm:text-xl"
          initial={{ opacity: 0 }}
          animate={revealed ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          {FINAL_MESSAGE.subtitle}
        </motion.p>

        {/* Blessing lines — staggered cinematic reveal */}
        <div className="mb-10 space-y-3">
          {FINAL_MESSAGE.lines.map((line, i) => (
            <motion.p
              key={i}
              custom={i}
              variants={lineVariants}
              initial="hidden"
              animate={revealed ? 'visible' : 'hidden'}
              className="font-dancing text-lg text-cream-white/95 sm:text-xl md:text-2xl"
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Closing quote */}
        <motion.blockquote
          className="relative mx-auto max-w-lg border-l-2 border-rose-pink/40 py-2 pl-6 text-left"
          initial={{ opacity: 0, x: -20 }}
          animate={revealed ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 2.8 }}
        >
          <p className="font-dancing text-xl italic leading-relaxed text-cream-white/95 sm:text-2xl">
            &ldquo;{FINAL_MESSAGE.closing}&rdquo;
          </p>
        </motion.blockquote>

        {/* Signature heart */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, scale: 0 }}
          animate={revealed ? { opacity: 1, scale: 1 } : {}}
          transition={{ type: 'spring', stiffness: 200, delay: 3.2 }}
        >
          <motion.span
            className="inline-block text-6xl"
            animate={
              prefersReducedMotion
                ? {}
                : { scale: [1, 1.15, 1] }
            }
            transition={{ duration: 1.5, repeat: Infinity, delay: 4 }}
            aria-hidden="true"
          >
            {FINAL_MESSAGE.signature}
          </motion.span>
          <p className="mt-3 font-dancing text-lg text-cream-white/80">
            {FINAL_MESSAGE.forever}
          </p>
        </motion.div>

        {/* The End — film credits */}
        <motion.div
          className="mt-24 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 3.8 }}
        >
          <div className="flex items-center justify-center gap-4" aria-hidden="true">
            <span className="h-px w-12 bg-cream-white/20" />
            <span className="text-cream-white/40">✦</span>
            <span className="h-px w-12 bg-cream-white/20" />
          </div>

          <motion.p
            className="font-playfair text-3xl tracking-widest text-cream-white/90 sm:text-4xl"
            animate={
              prefersReducedMotion
                ? {}
                : { opacity: [0.4, 0.8, 0.4] }
            }
            transition={{ duration: 4, repeat: Infinity, delay: 4.5 }}
          >
            {FINAL_MESSAGE.endTitle}
          </motion.p>

          <p className="font-poppins text-sm tracking-wide text-cream-white/55">
            {FINAL_MESSAGE.endCredit}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
