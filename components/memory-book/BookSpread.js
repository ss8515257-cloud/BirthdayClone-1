'use client';

import { cn } from '@/utils';
import GoldenCorners from './GoldenCorners';

export default function BookSpread({ page, pageNumber, totalPages, side = 'full' }) {
  const showLeft = side === 'full' || side === 'left';
  const showRight = side === 'full' || side === 'right';

  return (
    <div className="flex h-full w-full">
      {/* Left page — photo */}
      {showLeft && (
        <div
          className={cn(
            'book-paper relative flex flex-col items-center justify-center border-r border-rose-gold/10 p-4 sm:p-6',
            side === 'full' ? 'w-1/2' : 'w-full'
          )}
        >
          <GoldenCorners />

          <div className="relative w-full max-w-[200px] sm:max-w-[240px]">
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
            'book-paper relative flex flex-col justify-center p-4 sm:p-8',
            side === 'full' ? 'w-1/2' : 'w-full'
          )}
        >
          <div className="bookmark-ribbon" aria-hidden="true" />
          <GoldenCorners />

          <div className="relative z-10">
            <span className="mb-4 block text-5xl sm:text-6xl" aria-hidden="true">
              {page.illustration}
            </span>

            <h4 className="mb-3 font-playfair text-xl font-bold text-rose-gold sm:text-2xl">
              {page.caption}
            </h4>

            <div className="mb-4 h-px w-16 bg-gradient-to-r from-champagne-gold to-transparent" />

            <p className="font-dancing text-base leading-relaxed text-night-sky/75 sm:text-lg">
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
