'use client';

import { useState } from 'react';
import { Section, SectionHeader, Container } from '@/components/layout';
import { GALLERY_PHOTOS, SOUND_EFFECTS } from '@/constants';
import { useHaptic } from '@/hooks';
import { playSound } from '@/lib/audio';
import Polaroid from './Polaroid';
import Lightbox from './Lightbox';

export default function GallerySection() {
  const [activeIndex, setActiveIndex] = useState(null);
  const { vibrate } = useHaptic();

  const open = (i) => {
    setActiveIndex(i);
    vibrate(15);
    try {
      playSound(SOUND_EFFECTS.sparkle, { volume: 0.25 });
    } catch {}
  };

  return (
    <Section id="photo-gallery" ariaLabel="Photo Gallery">
      <Container size="wide">
        <SectionHeader
          title="Moments Captured"
          subtitle="A wall of memories"
          emoji="📸"
        />

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {GALLERY_PHOTOS.map((photo, i) => (
            <Polaroid
              key={photo.id}
              photo={photo}
              index={i}
              onClick={() => open(i)}
            />
          ))}
        </div>

        <p className="mt-10 text-center text-hint text-lg">
          Tap a photo to relive the moment
        </p>
      </Container>

      <Lightbox
        photos={GALLERY_PHOTOS}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </Section>
  );
}
