'use client';

import { Section, SectionHeader, Container } from '@/components/layout';
import ReasonsCarousel from './ReasonsCarousel';

export default function ReasonsSection() {
  return (
    <Section id="reasons" ariaLabel="100 Reasons You Are Amazing">
      <Container size="default">
        <SectionHeader
          title="100 Reasons You Are Amazing"
          subtitle="Because you are extraordinary"
          emoji="💝"
        />
        <ReasonsCarousel />
      </Container>
    </Section>
  );
}
