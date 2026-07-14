'use client';

import { motion } from 'framer-motion';
import { JOURNEY_PATHS } from '@/constants';
import { useApp } from '@/lib/context';
import { useMagnetic } from '@/hooks';

const JOURNEY_CARDS = [
  {
    id: JOURNEY_PATHS.MEMORIES,
    emoji: '❤️',
    title: 'Memories',
    description: 'Relive beautiful moments together',
    gradient: 'from-rose-pink/20 to-lavender/20',
  },
  {
    id: JOURNEY_PATHS.WISHES,
    emoji: '🌸',
    title: 'Birthday Wishes',
    description: 'A garden of heartfelt wishes',
    gradient: 'from-lavender/20 to-light-purple/20',
  },
  {
    id: JOURNEY_PATHS.SURPRISE,
    emoji: '🎁',
    title: 'Surprise',
    description: 'Something special awaits you',
    gradient: 'from-champagne-gold/20 to-peach/20',
  },
];

function JourneyCard({ card, onSelect, index }) {
  const { ref, handleMouseMove, handleMouseLeave } = useMagnetic(0.15);

  return (
    <motion.button
      ref={ref}
      onClick={() => onSelect(card.id)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass-card-hover group relative w-full max-w-sm cursor-pointer p-8 text-left transition-transform duration-300`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      whileHover={{ scale: 1.05, y: -10 }}
      whileTap={{ scale: 0.98 }}
      aria-label={`Choose ${card.title} journey`}
    >
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.gradient} opacity-0 transition-opacity group-hover:opacity-100`}
      />
      <div className="relative z-10">
        <span className="mb-4 block text-5xl">{card.emoji}</span>
        <h3 className="mb-2 font-playfair text-2xl font-bold text-cream-white">
          {card.title}
        </h3>
        <p className="text-sm text-cream-white/70">{card.description}</p>
      </div>
      <motion.div
        className="absolute -inset-1 -z-10 rounded-2xl bg-rose-pink/20 opacity-0 blur-xl transition-opacity group-hover:opacity-100"
      />
    </motion.button>
  );
}

export default function JourneyMenu({ onSelect }) {
  const { setCurrentJourney } = useApp();

  const handleSelect = (journeyId) => {
    setCurrentJourney(journeyId);
    onSelect?.(journeyId);
  };

  return (
    <motion.div
      className="flex h-full w-full flex-col items-center justify-center bg-gradient-night px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h2
        className="heading-script mb-4 text-center text-gradient-luxury"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Choose Your Journey
      </motion.h2>

      <motion.p
        className="mb-12 text-center text-cream-white/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Every path leads to something magical
      </motion.p>

      <div className="grid w-full max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {JOURNEY_CARDS.map((card, index) => (
          <JourneyCard
            key={card.id}
            card={card}
            index={index}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </motion.div>
  );
}
