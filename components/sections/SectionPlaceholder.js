'use client';

import { Section, SectionHeader, Container } from '@/components/layout';

export default function SectionPlaceholder({
  id,
  title,
  subtitle,
  emoji,
  description,
}) {
  return (
    <Section id={id} ariaLabel={title} fullHeight>
      <Container>
        <SectionHeader title={title} subtitle={subtitle} emoji={emoji} />
        <div className="glass-card mx-auto max-w-2xl p-8 text-center">
          <p className="text-cream-white/60">{description}</p>
          <div className="mt-6 flex justify-center gap-2">
            {[...Array(3)].map((_, i) => (
              <span
                key={i}
                className="h-2 w-2 animate-pulse rounded-full bg-rose-pink/50"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
