'use client';

import { cn } from '@/utils';

export default function GoldenCorners({ className }) {
  return (
    <>
      <span className={cn('golden-corner golden-corner-tl', className)} aria-hidden="true" />
      <span className={cn('golden-corner golden-corner-tr', className)} aria-hidden="true" />
      <span className={cn('golden-corner golden-corner-bl', className)} aria-hidden="true" />
      <span className={cn('golden-corner golden-corner-br', className)} aria-hidden="true" />
    </>
  );
}
