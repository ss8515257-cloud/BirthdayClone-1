'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils';
import { useReducedMotion } from '@/hooks';

export default function SectionNav({ sections, activeSection }) {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  if (!sections?.length) return null;

  const activeLabel = sections.find((s) => s.id === activeSection);

  return (
    <>
      {/* Desktop — right-side dots */}
      <motion.nav
        className={cn(
          'fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 md:flex',
          'safe-right'
        )}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        aria-label="Section navigation"
      >
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={cn(
                'group relative flex h-3 w-3 items-center justify-center rounded-full transition-all duration-300',
                isActive
                  ? 'scale-125 bg-rose-pink shadow-glow'
                  : 'bg-white/20 hover:bg-white/40'
              )}
              aria-label={`Go to ${section.label}`}
              aria-current={isActive ? 'true' : undefined}
            >
              <span
                className={cn(
                  'pointer-events-none absolute right-5 whitespace-nowrap rounded-lg bg-night-sky/90 px-2 py-1 text-xs text-cream-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100',
                  isActive && 'opacity-100'
                )}
              >
                {section.emoji} {section.label}
              </span>
            </button>
          );
        })}
      </motion.nav>

      {/* Mobile — bottom pill nav */}
      <motion.nav
        className={cn(
          'mobile-above-music fixed left-1/2 z-40 flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-1 rounded-full border border-white/10 bg-night-sky/90 px-2.5 py-1.5 shadow-glass backdrop-blur-md md:hidden',
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        aria-label="Section navigation"
      >
        {activeLabel && (
          <span className="shrink-0 px-1 text-xs text-cream-white/85">
            {activeLabel.emoji}
          </span>
        )}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  'touch-target flex shrink-0 items-center justify-center rounded-full transition-all duration-300',
                  isActive
                    ? 'h-7 w-7 bg-rose-pink shadow-glow'
                    : 'h-2.5 w-2.5 bg-white/25 active:bg-white/40'
                )}
                aria-label={`Go to ${section.label}`}
                aria-current={isActive ? 'true' : undefined}
              >
                {isActive && (
                  <span className="text-[10px]" aria-hidden="true">
                    {section.emoji}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
}
