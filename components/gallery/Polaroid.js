'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/utils';

export default function Polaroid({ photo, index, onClick, className }) {
  const { caption, date, color, illustration, rotate = 0, src } = photo;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={cn(
        'group relative block w-full rounded-sm bg-cream-white p-1.5 pb-8 shadow-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-pink sm:p-3 sm:pb-14',
        className
      )}
      style={{ rotate: `${rotate}deg` }}
      initial={{ opacity: 0, y: 40, rotate: rotate * 2 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: 'easeOut' }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 20, y: -6 }}
      whileTap={{ scale: 0.98 }}
      aria-label={`View photo: ${caption}`}
    >
      {/* Photo area */}
      <div className="relative aspect-square w-full overflow-hidden rounded-sm">
        {src ? (
          <Image
            src={src}
            alt={caption}
            fill
            sizes="(max-width: 640px) 45vw, 240px"
            className="object-cover"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${color}, ${color}aa)`,
            }}
          >
            <span className="text-5xl opacity-90 transition-transform duration-500 group-hover:scale-110">
              {illustration}
            </span>
          </div>
        )}
        {/* Sheen */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* Caption */}
      <div className="absolute inset-x-0 bottom-2 px-3 text-center">
        <p className="font-dancing text-xs leading-tight text-night-sky/80 sm:text-lg">
          {caption}
        </p>
        {date && (
          <p className="mt-0.5 font-poppins text-[10px] uppercase tracking-widest text-rose-gold/70">
            {date}
          </p>
        )}
      </div>

      {/* Tape */}
      <span
        className="absolute -top-2 left-1/2 h-5 w-16 -translate-x-1/2 -rotate-2 bg-champagne-gold/50 shadow-sm"
        aria-hidden="true"
      />
    </motion.button>
  );
}
