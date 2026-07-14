export const EXPERIENCE_SECTIONS = [
  {
    id: 'hero',
    label: 'Hero',
    emoji: '🎂',
    journey: ['memories', 'wishes', 'surprise'],
  },
  {
    id: 'starry-night',
    label: 'Starry Night',
    emoji: '⭐',
    journey: ['memories', 'surprise'],
  },
  {
    id: 'memory-book',
    label: 'Memory Book',
    emoji: '📖',
    journey: ['memories'],
  },
  {
    id: 'photo-gallery',
    label: 'Gallery',
    emoji: '📸',
    journey: ['memories'],
  },
  {
    id: 'handwritten-letter',
    label: 'Letter',
    emoji: '💌',
    journey: ['memories', 'wishes'],
  },
  {
    id: 'reasons',
    label: '100 Reasons',
    emoji: '💝',
    journey: ['memories', 'wishes'],
  },
  {
    id: 'birthday-wishes',
    label: 'Wishes',
    emoji: '🌸',
    journey: ['wishes'],
  },
  {
    id: 'wish-tree',
    label: 'Wish Tree',
    emoji: '🌳',
    journey: ['wishes'],
  },
  {
    id: 'love-meters',
    label: 'Love Meters',
    emoji: '💗',
    journey: ['wishes', 'surprise'],
  },
  {
    id: 'make-a-wish',
    label: 'Make a Wish',
    emoji: '✨',
    journey: ['wishes', 'surprise'],
  },
  {
    id: 'lanterns',
    label: 'Lanterns',
    emoji: '🏮',
    journey: ['surprise'],
  },
  {
    id: 'hot-air-balloon',
    label: 'Balloon',
    emoji: '🎈',
    journey: ['surprise'],
  },
  {
    id: 'celebration',
    label: 'Celebration',
    emoji: '🎁',
    journey: ['surprise'],
  },
  {
    id: 'sunrise',
    label: 'Sunrise',
    emoji: '🌅',
    journey: ['memories', 'wishes', 'surprise'],
  },
  {
    id: 'ending',
    label: 'The End',
    emoji: '❤️',
    journey: ['memories', 'wishes', 'surprise'],
  },
];

export const STAGES = {
  LOADING: 'loading',
  INTRO: 'intro',
  BROWSER: 'browser',
  JOURNEY: 'journey',
  MAIN: 'main',
};

export function getSectionsForJourney(journey) {
  if (!journey) return EXPERIENCE_SECTIONS;
  return EXPERIENCE_SECTIONS.filter((section) =>
    section.journey.includes(journey)
  );
}
