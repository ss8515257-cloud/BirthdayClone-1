'use client';

import { Section, SectionHeader, Container } from '@/components/layout';
import HotAirBalloonCanvas from './HotAirBalloonCanvas';

export default function HotAirBalloonSection() {
  return (
    <Section
      id="hot-air-balloon"
      ariaLabel="Hot Air Balloon"
      className="relative overflow-hidden !p-0"
      noPadding
    >
      <div className="absolute inset-0 bg-gradient-to-b from-deep-purple via-twilight to-night-sky" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Container className="pt-28 pb-4">
          <SectionHeader
            title="Soaring With Love"
            subtitle="A message across the sky"
            emoji="🎈"
          />
        </Container>

        <div className="relative mx-auto h-[55vh] w-full max-w-6xl sm:h-[65vh]">
          <HotAirBalloonCanvas className="h-full w-full" />
        </div>

        <Container className="pb-16 pt-6">
          <p className="text-center font-dancing text-xl text-champagne-gold/80">
            Happy Birthday Gurleen ❤️
          </p>
          <p className="mt-2 text-center text-sm text-cream-white/40">
            Watch the balloon drift across a sky full of dreams
          </p>
        </Container>
      </div>
    </Section>
  );
}
