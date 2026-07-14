'use client';

import { Section, SectionHeader, Container } from '@/components/layout';
import MemoryBook from './MemoryBook';

export default function MemoryBookSection() {
  return (
    <Section id="memory-book" ariaLabel="Memory Book">
      <Container>
        <SectionHeader
          title="Memory Book"
          subtitle="Pages of precious moments"
          emoji="📖"
        />

        <MemoryBook />
      </Container>
    </Section>
  );
}
