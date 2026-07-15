'use client';

import { HERO_GIFTS, HERO_BUTTERFLIES } from '@/constants/hero';
import { useIsMobile } from '@/hooks';
import HeroGift from './HeroGift';
import HeroButterfly from './HeroButterfly';

export default function HeroFloatingElements() {
  const isMobile = useIsMobile();

  const gifts = isMobile
    ? HERO_GIFTS.filter((g) => !g.left.startsWith('8')).map((g) => ({
        ...g,
        size: Math.round(g.size * 0.8),
      }))
    : HERO_GIFTS;

  const butterflies = isMobile
    ? HERO_BUTTERFLIES.filter((b) => parseFloat(b.left) < 80)
    : HERO_BUTTERFLIES;

  return (
    <div className="absolute inset-0 origin-center scale-[0.85] sm:scale-100">
      {gifts.map((gift, i) => (
        <HeroGift key={i} {...gift} />
      ))}
      {butterflies.map((butterfly, i) => (
        <HeroButterfly key={i} {...butterfly} />
      ))}
    </div>
  );
}
