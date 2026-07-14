'use client';

import { cn } from '@/utils';

export default function StageLayout({ children, className }) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-40 flex min-h-screen-safe flex-col overflow-hidden',
        className
      )}
      role="presentation"
    >
      {children}
    </div>
  );
}
