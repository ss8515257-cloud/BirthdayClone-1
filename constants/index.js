export const SITE_CONFIG = {
  name: 'Gurleen',
  title: 'Happy Birthday Gurleen',
  description:
    'A magical cinematic birthday experience dedicated to someone truly special — Gurleen.',
  url: 'https://gurleen.vercel.app',
  ogImage: '/assets/og-image.jpg',
  author: 'Made with ❤️',
};

export const COLORS = {
  softPink: '#F8E8EE',
  rosePink: '#E8A0BF',
  lavender: '#C8B6E2',
  creamWhite: '#FFF8F0',
  lightPurple: '#D4BBFC',
  peach: '#FFDAB9',
  roseGold: '#B76E79',
  champagneGold: '#F7E7CE',
  nightSky: '#0F0C29',
  deepPurple: '#302B63',
  twilight: '#24243E',
};

export const FONTS = {
  playfair: 'Playfair Display',
  poppins: 'Poppins',
  dancing: 'Dancing Script',
};

export const JOURNEY_PATHS = {
  MEMORIES: 'memories',
  WISHES: 'wishes',
  SURPRISE: 'surprise',
};

export { MUSIC_TRACKS, MUSIC_STORAGE_KEYS } from './music';

export const SOUND_EFFECTS = {
  buttonClick: '/assets/sounds/button-click.mp3',
  bell: '/assets/sounds/bell.mp3',
  paperTurn: '/assets/sounds/paper-turn.mp3',
  envelopeOpen: '/assets/sounds/envelope-open.mp3',
  giftOpen: '/assets/sounds/gift-open.mp3',
  fireworks: '/assets/sounds/fireworks.mp3',
  sparkle: '/assets/sounds/sparkle.mp3',
  wind: '/assets/sounds/wind.mp3',
  birds: '/assets/sounds/birds.mp3',
  lantern: '/assets/sounds/lantern.mp3',
  rosePetals: '/assets/sounds/rose-petals.mp3',
};

export const LOADING_MESSAGES = [
  'Preparing Something Special...',
  'Loading your surprise...',
  'Sprinkling magic dust...',
  'Gathering stars...',
];

export const INTRO_TEXT = {
  subtitle: '✨ For Someone Truly Special ✨',
  name: '❤️ Gurleen ❤️',
};

export const HERO_TEXT = {
  title: 'Happy Birthday',
  subtitle: 'My Beautiful Gurleen ❤️',
  cta: 'Open Your Surprise',
};

export const FINAL_MESSAGE = {
  title: 'Happy Birthday',
  subtitle: 'To the most beautiful soul',
  lines: [
    'May your life always be filled with happiness,',
    'love,',
    'peace,',
    'good health,',
    'success,',
    'and unforgettable memories.',
  ],
  closing:
    'Keep smiling because the world becomes brighter with your smile.',
  signature: '❤️',
  endTitle: 'The End',
  endCredit: 'Made with ❤️',
  forName: 'For Gurleen, with endless love',
  forever: 'Forever & Always',
};

export const ENDING_PARTICLES = [
  { left: '8%', delay: 0, duration: 8 },
  { left: '22%', delay: 1.2, duration: 10 },
  { left: '38%', delay: 0.5, duration: 9 },
  { left: '55%', delay: 2, duration: 11 },
  { left: '72%', delay: 0.8, duration: 8.5 },
  { left: '88%', delay: 1.5, duration: 9.5 },
  { left: '15%', delay: 2.5, duration: 10 },
  { left: '45%', delay: 3, duration: 8 },
  { left: '65%', delay: 1.8, duration: 11 },
  { left: '92%', delay: 0.3, duration: 9 },
];

export const LOVE_METERS = [
  {
    id: 'smile',
    label: 'Smile',
    emoji: '😊',
    color: '#E8A0BF',
    value: 100,
    overflow: true,
    caption: 'Lights up every room',
  },
  {
    id: 'kindness',
    label: 'Kindness',
    emoji: '💝',
    color: '#C8B6E2',
    value: 100,
    overflow: true,
    caption: 'Overflowing endlessly',
  },
  {
    id: 'beauty',
    label: 'Beauty',
    emoji: '✨',
    color: '#F7E7CE',
    value: 100,
    overflow: true,
    caption: 'Inside and out',
  },
  {
    id: 'sweetness',
    label: 'Sweetness',
    emoji: '🍯',
    color: '#FFDAB9',
    value: 100,
    overflow: true,
    caption: 'Sweeter than honey',
  },
  {
    id: 'positive-energy',
    label: 'Positive Energy',
    emoji: '⚡',
    color: '#D4BBFC',
    value: 100,
    overflow: true,
    caption: 'Contagiously radiant',
  },
];

export const LOVE_METERS_META = {
  hint: 'Every meter is off the charts',
  overflowLabel: '∞',
  footer: 'Science confirms: you are extraordinary',
};

export const CELEBRATION_GIFT = {
  tapHint: 'Tap the gift to open your surprise',
  openingHint: 'Something magical is happening...',
  title: 'Happy Birthday, Gurleen!',
  message:
    'You are the most wonderful gift this world could ever receive. May your day overflow with love, laughter, and magic beyond measure.',
  signature: 'With all my love ❤️',
  celebrateAgain: 'Celebrate again!',
};

export const SUNRISE_META = {
  scrollHint: 'Scroll to welcome the sunrise',
  phases: [
    { threshold: 0, text: 'The night was magical...' },
    { threshold: 0.35, text: 'But every night gives way to dawn...' },
    { threshold: 0.7, text: 'Good morning, beautiful Gurleen' },
  ],
};

export const SUNRISE_STARS = [
  { left: '12%', top: '18%', size: 2 },
  { left: '28%', top: '10%', size: 1.5 },
  { left: '45%', top: '14%', size: 2 },
  { left: '62%', top: '8%', size: 1 },
  { left: '78%', top: '16%', size: 2 },
  { left: '88%', top: '22%', size: 1.5 },
  { left: '18%', top: '28%', size: 1 },
  { left: '55%', top: '24%', size: 1.5 },
  { left: '72%', top: '30%', size: 1 },
  { left: '35%', top: '6%', size: 2 },
];

export const MAKE_A_WISH_TEXT = {
  closeEyes: 'Close your eyes...',
  makeWish: 'Make a wish...',
  tapStar: 'Tap the star',
  dreamComesTrue: '✨ May all your dreams come true ✨',
};

export * from './content';
