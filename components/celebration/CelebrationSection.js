'use client';

import { Section, SectionHeader, Container } from '@/components/layout';
import CelebrationGift from './CelebrationGift';

export default function CelebrationSection() {
  return (
    <Section id="celebration" ariaLabel="Your Surprise Gift">
      <Container size="default">
        <SectionHeader
          title="Your Surprise"
          subtitle="Tap to celebrate"
          emoji="🎁"
        />
        <CelebrationGift />
      </Container>
    </Section>
  );
}
