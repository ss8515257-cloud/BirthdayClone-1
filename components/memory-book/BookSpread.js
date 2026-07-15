'use client';

import { cn } from '@/utils';
import GoldenCorners from './GoldenCorners';

export default function BookSpread({ page, pageNumber, totalPages, side = 'full' }) {
  const showLeft = side === 'full' || side === 'left';
  const showRight = side === 'full' || side === 'right';

  return (
    <div className="flex h-full w-full flex-col sm:flex-row">
      {/* Left page — photo */}
      {showLeft && (
        <div
          className={cn(
            'book-paper relative flex flex-col items-center justify-center border-rose-gold/10 p-3 sm:border-r sm:p-6',
            side === 'full' ? 'w-full sm:w-1/2' : 'w-full'
          )}
        >
          <GoldenCorners />

          <div className="relative w-full max-w-[160px] sm:max-w-[240px]">
            {/* Polaroid-style photo frame */}
            <div className="rounded-sm bg-white p-2 pb-8 shadow-lg">
              <div
                className="flex aspect-square items-center justify-center rounded-sm"
                style={{
                  background: `linear-gradient(135deg, ${page.photoColor}40, ${page.photoColor}80)`,
                }}
              >
                <div className="text-center">
                  <span className="text-4xl sm:text-5xl">{page.illustration}</span>
                  <p className="mt-2 font-dancing text-xs text-night-sky/40 sm:text-sm">
                    Your photo here
                  </p>
                </div>
              </div>
              <p className="mt-2 text-center font-dancing text-sm text-night-sky/60">
                {page.caption}
              </p>
            </div>
          </div>

          <p className="mt-4 text-xs text-night-sky/30">
            {pageNumber} / {totalPages}
          </p>
        </div>
      )}

      {/* Right page — memory text */}
      {showRight && (
        <div
          className={cn(
            'book-paper relative flex flex-col justify-center border-t border-rose-gold/10 p-3 sm:border-t-0 sm:p-8',
            side === 'full' ? 'w-full sm:w-1/2' : 'w-full'
          )}
        >
          <div className="bookmark-ribbon" aria-hidden="true" />
          <GoldenCorners />

          <div className="relative z-10">
            <span className="mb-4 block text-5xl sm:text-6xl" aria-hidden="true">
              {page.illustration}
            </span>

            <h4 className="mb-2 font-playfair text-lg font-bold text-rose-gold sm:mb-3 sm:text-2xl">
              {page.caption}
            </h4>

            <div className="mb-4 h-px w-16 bg-gradient-to-r from-champagne-gold to-transparent" />

            <p className="font-dancing text-sm leading-relaxed text-night-sky/75 sm:text-lg">
              {page.memory}
            </p>

            <p className="mt-6 text-xs text-night-sky/30">
              Chapter {pageNumber}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
