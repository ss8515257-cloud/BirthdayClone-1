'use client';

import { cn } from '@/utils';

export default function Container({
  children,
  className,
  size = 'default',
  as: Component = 'div',
}) {
  const sizes = {
    narrow: 'max-w-3xl',
    default: 'max-w-6xl',
    wide: 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <Component
      className={cn('mx-auto w-full px-4 sm:px-6 md:px-8', sizes[size], className)}
    >
      {children}
    </Component>
  );
}
