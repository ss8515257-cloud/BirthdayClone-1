'use client';

import GoldenCorners from './GoldenCorners';

export default function BookCover({ onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="book-paper group relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-r-lg border-l-4 border-rose-gold/40 text-night-sky shadow-premium transition-shadow hover:shadow-glow-gold"
      aria-label="Open memory book"
    >
      <GoldenCorners />

      {/* Embossed border */}
      <div className="absolute inset-3 rounded border border-champagne-gold/30" />
      <div className="absolute inset-5 rounded border border-champagne-gold/15" />

      {/* Decorative flourishes */}
      <div className="absolute left-6 top-1/2 h-32 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-champagne-gold/40 to-transparent" />
      <div className="absolute right-6 top-1/2 h-32 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-champagne-gold/40 to-transparent" />

      <div className="relative z-10 px-8 text-center">
        <p className="mb-2 font-dancing text-2xl text-rose-gold sm:text-3xl">
          Memories of
        </p>
        <h3 className="mb-4 font-playfair text-4xl font-bold text-gradient-gold sm:text-5xl">
          Gurleen
        </h3>
        <div className="mb-6 flex items-center justify-center gap-3 text-cream-white/50">
          <span className="h-px w-12 bg-champagne-gold/40" />
          <span>✦</span>
          <span className="h-px w-12 bg-champagne-gold/40" />
        </div>
        <p className="font-dancing text-lg text-rose-gold/70">
          A story written in moments of magic
        </p>
        <p className="mt-8 text-sm text-rose-gold/50 transition-colors group-hover:text-rose-gold">
          Tap to open ✨
        </p>
      </div>

      {/* Spine shadow */}
      <div className="absolute bottom-0 left-0 top-0 w-3 bg-gradient-to-r from-rose-gold/20 to-transparent" />
    </button>
  );
}
