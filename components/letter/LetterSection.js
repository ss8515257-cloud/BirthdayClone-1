'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Section, SectionHeader, Container } from '@/components/layout';
import { LETTER_META } from '@/constants/content';
import { SOUND_EFFECTS } from '@/constants';
import { useHaptic } from '@/hooks';
import { fireRosePetals } from '@/lib/confetti';
import { playSound } from '@/lib/audio';
import Envelope from './Envelope';
import LetterPaper from './LetterPaper';

export default function LetterSection() {
  const [open, setOpen] = useState(false);
  const { vibrate } = useHaptic();

  const handleOpen = () => {
    setOpen(true);
    vibrate(30);
    try {
      playSound(SOUND_EFFECTS.envelopeOpen, { volume: 0.3 });
    } catch {}
    try {
      fireRosePetals();
    } catch {}
  };

  return (
    <Section id="handwritten-letter" ariaLabel="A Handwritten Letter">
      <Container size="narrow">
        <SectionHeader
          title={LETTER_META.greeting}
          subtitle="Words from the heart"
          emoji="💌"
        />

        <div className="relative min-h-[20rem] sm:min-h-[28rem]">
          <AnimatePresence mode="wait">
            {!open ? (
              <motion.div
                key="envelope"
                exit={{ opacity: 0, scale: 0.85, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Envelope onOpen={handleOpen} />
              </motion.div>
            ) : (
              <motion.div key="letter">
                <LetterPaper />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  );
}
