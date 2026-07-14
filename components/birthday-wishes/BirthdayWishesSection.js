'use client';

import { Section, SectionHeader, Container } from '@/components/layout';
import WishGarden from './WishGarden';

export default function BirthdayWishesSection() {
  return (
    <Section id="birthday-wishes" ariaLabel="Birthday Wishes">
      <Container size="wide">
        <SectionHeader
          title="Birthday Wishes"
          subtitle="A garden of love"
          emoji="🌸"
        />
        <WishGarden />
      </Container>
    </Section>
  );
}
