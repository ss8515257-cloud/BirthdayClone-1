'use client';

import { HERO_GIFTS, HERO_BUTTERFLIES } from '@/constants/hero';
import HeroGift from './HeroGift';
import HeroButterfly from './HeroButterfly';

export default function HeroFloatingElements() {
  return (
    <div className="absolute inset-0">
      {HERO_GIFTS.map((gift, i) => (
        <HeroGift key={i} {...gift} />
      ))}
      {HERO_BUTTERFLIES.map((butterfly, i) => (
        <HeroButterfly key={i} {...butterfly} />
      ))}
    </div>
  );
}
