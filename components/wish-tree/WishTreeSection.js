'use client';

import { Section, SectionHeader, Container } from '@/components/layout';
import WishTree from './WishTree';

export default function WishTreeSection() {
  return (
    <Section id="wish-tree" ariaLabel="Magical Wish Tree">
      <Container size="default">
        <SectionHeader
          title="Magical Wish Tree"
          subtitle="Tap a leaf, receive a wish"
          emoji="🌳"
        />
        <WishTree />
      </Container>
    </Section>
  );
}
