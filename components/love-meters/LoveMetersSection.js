'use client';

import { Section, SectionHeader, Container } from '@/components/layout';
import LoveMetersList from './LoveMetersList';

export default function LoveMetersSection() {
  return (
    <Section id="love-meters" ariaLabel="Love Meters">
      <Container size="default">
        <SectionHeader
          title="Love Meters"
          subtitle="Off the charts"
          emoji="💗"
        />
        <LoveMetersList />
      </Container>
    </Section>
  );
}
