'use client';

import { Section } from '@/components/layout';
import CinematicEnding from './CinematicEnding';

export default function FinalEnding() {
  return (
    <Section
      id="ending"
      ariaLabel="Final message"
      className="!p-0"
      noPadding
    >
      <CinematicEnding />
    </Section>
  );
}
