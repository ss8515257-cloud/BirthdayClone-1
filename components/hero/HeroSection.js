'use client';

import { motion } from 'framer-motion';
import { HERO_TEXT } from '@/constants';
import { Section, Container } from '@/components/layout';
import { useReducedMotion } from '@/hooks';
import HeroBackground from './HeroBackground';
import HeroBalloons from './HeroBalloons';
import HeroCake from './HeroCake';
import HeroFloatingElements from './HeroFloatingElements';
import HeroCTA from './HeroCTA';

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  const scrollToNext = () => {
    const next =
      document.getElementById('starry-night') ||
      document.getElementById('birthday-wishes') ||
      document.getElementById('celebration');
    next?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <Section
      id="hero"
      ariaLabel="Hero section"
      className="flex flex-col items-center justify-center overflow-hidden text-center"
    >
      <HeroBackground />
      <HeroBalloons />
      <HeroFloatingElements />

      <Container className="relative z-10 flex flex-col items-center">
        {/* Subtitle */}
        <motion.p
          className="heading-script mb-3 text-cream-white/90 sm:mb-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          {HERO_TEXT.title}
        </motion.p>

        {/* Decorative line */}
        <motion.div
          className="mb-4 h-px w-24 bg-gradient-to-r from-transparent via-rose-pink to-transparent sm:mb-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          aria-hidden="true"
        />

        {/* Main heading */}
        <motion.h1
          className="heading-display mb-2 text-balance text-gradient-luxury"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, type: 'spring', stiffness: 100 }}
        >
          {HERO_TEXT.subtitle}
        </motion.h1>

        {/* Sparkle divider */}
        <motion.p
        className="mb-6 text-sm tracking-[0.2em] text-cream-white/60 sm:mb-10 sm:tracking-[0.3em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          aria-hidden="true"
        >
          ✦ ✦ ✦
        </motion.p>

        {/* Animated cake */}
        <motion.div
          className="relative mb-6 sm:mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <HeroCake />
        </motion.div>

        {/* CTA */}
        <HeroCTA onClick={scrollToNext} />
      </Container>
    </Section>
  );
}
