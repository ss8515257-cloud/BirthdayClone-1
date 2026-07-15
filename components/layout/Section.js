'use client';

import { motion } from 'framer-motion';
import { cn } from '@/utils';
import { useReducedMotion } from '@/hooks';

export default function Section({
  id,
  children,
  className,
  fullHeight = true,
  ariaLabel,
  noPadding = false,
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      aria-label={ariaLabel || id}
      className={cn(
        'relative w-full scroll-mt-16 sm:scroll-mt-20',
        fullHeight && 'min-h-screen-safe',
        !noPadding && 'section-padding',
        className
      )}
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.section>
  );
}
