'use client';

import { motion } from 'framer-motion';
import { cn } from '@/utils';

export default function SectionHeader({
  title,
  subtitle,
  emoji,
  align = 'center',
  className,
}) {
  const alignments = {
    center: 'text-center items-center',
    left: 'text-left items-start',
  };

  return (
    <motion.header
      className={cn(
        'mb-8 flex flex-col gap-2 sm:mb-12 sm:gap-3',
        alignments[align],
        className
      )}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      {emoji && (
        <span className="text-4xl sm:text-5xl" aria-hidden="true">
          {emoji}
        </span>
      )}
      {subtitle && (
        <p className="font-dancing text-xl text-cream-white/90 sm:text-2xl">
          {subtitle}
        </p>
      )}
      {title && (
        <h2 className="heading-display text-balance text-gradient-luxury">
          {title}
        </h2>
      )}
    </motion.header>
  );
}
