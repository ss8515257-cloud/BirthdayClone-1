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
            'book-paper relative flex shrink-0 flex-col items-center justify-center border-rose-gold/10 p-3 sm:border-r sm:p-6',
            side === 'full' ? 'w-full sm:w-1/2' : 'w-full'
          )}
        >
          <GoldenCorners />

          <div className="relative w-full max-w-[120px] sm:max-w-[240px]">
            {/* Polaroid-style photo frame */}
            <div className="rounded-sm bg-white p-1.5 pb-6 shadow-lg sm:p-2 sm:pb-8">
              <div
                className="flex aspect-square items-center justify-center rounded-sm"
                style={{
                  background: `linear-gradient(135deg, ${page.photoColor}40, ${page.photoColor}80)`,
                }}
              >
                <div className="text-center">
                  <span className="text-3xl sm:text-5xl">{page.illustration}</span>
                  <p className="mt-1 font-dancing text-[10px] text-night-sky/40 sm:mt-2 sm:text-sm">
                    Your photo here
                  </p>
                </div>
              </div>
              <p className="mt-1.5 text-center font-dancing text-xs text-night-sky/60 sm:mt-2 sm:text-sm">
                {page.caption}
              </p>
            </div>
          </div>

          <p className="mt-2 text-[10px] text-night-sky/30 sm:mt-4 sm:text-xs">
            {pageNumber} / {totalPages}
          </p>
        </div>
      )}

      {/* Right page — memory text */}
      {showRight && (
        <div
          className={cn(
            'book-paper relative flex flex-1 flex-col justify-center border-t border-rose-gold/10 p-3 sm:border-t-0 sm:p-8',
            side === 'full' ? 'w-full sm:w-1/2' : 'w-full'
          )}
        >
          <div className="bookmark-ribbon hidden sm:block" aria-hidden="true" />
          <GoldenCorners />

          <div className="relative z-10">
            <span className="mb-2 block text-3xl sm:mb-4 sm:text-6xl" aria-hidden="true">
              {page.illustration}
            </span>

            <h4 className="mb-1.5 font-playfair text-base font-bold text-rose-gold sm:mb-3 sm:text-2xl">
              {page.caption}
            </h4>

            <div className="mb-2 h-px w-12 bg-gradient-to-r from-champagne-gold to-transparent sm:mb-4 sm:w-16" />

            <p className="font-dancing text-xs leading-relaxed text-night-sky/75 sm:text-lg">
              {page.memory}
            </p>

            <p className="mt-3 text-[10px] text-night-sky/30 sm:mt-6 sm:text-xs">
              Chapter {pageNumber}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
