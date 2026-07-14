'use client';

import { HERO_BALLOONS } from '@/constants/hero';
import HeroBalloon from './HeroBalloon';

export default function HeroBalloons() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {HERO_BALLOONS.map((balloon) => (
        <HeroBalloon key={balloon.id} {...balloon} />
      ))}
    </div>
  );
}
