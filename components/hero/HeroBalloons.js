'use client';

import { HERO_BALLOONS } from '@/constants/hero';
import { useIsMobile } from '@/hooks';
import HeroBalloon from './HeroBalloon';

const MOBILE_HIDDEN_IDS = new Set([5, 6]);

export default function HeroBalloons() {
  const isMobile = useIsMobile();
  const balloons = isMobile
    ? HERO_BALLOONS.filter((b) => !MOBILE_HIDDEN_IDS.has(b.id)).map((b) => ({
        ...b,
        size: Math.round(b.size * 0.75),
      }))
    : HERO_BALLOONS;

  return (
    <div
      className="pointer-events-none absolute inset-0 origin-center scale-[0.85] sm:scale-100"
      aria-hidden="true"
    >
      {balloons.map((balloon) => (
        <HeroBalloon key={balloon.id} {...balloon} />
      ))}
    </div>
  );
}
