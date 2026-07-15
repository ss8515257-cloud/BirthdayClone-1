'use client';

import { useMemo } from 'react';
import { getSectionsForJourney } from '@/constants/sections';
import { useApp } from '@/lib/context';
import { useActiveSection } from '@/hooks';
import {
  ScrollProgress,
  SectionNav,
  SiteHeader,
} from '@/components/layout';
import MagicalBackground from '@/components/background/MagicalBackground';
import MusicPlayer from '@/components/music/MusicPlayer';
import HeroSection from '@/components/hero/HeroSection';
import FinalEnding from '@/components/ending/FinalEnding';
import StarryNightSection from '@/components/starry-night/StarryNightSection';
import MemoryBookSection from '@/components/memory-book/MemoryBookSection';
import LanternsSection from '@/components/lanterns/LanternsSection';
import HotAirBalloonSection from '@/components/hot-air-balloon/HotAirBalloonSection';
import GallerySection from '@/components/gallery/GallerySection';
import LetterSection from '@/components/letter/LetterSection';
import ReasonsSection from '@/components/reasons/ReasonsSection';
import MakeAWishSection from '@/components/make-a-wish/MakeAWishSection';
import BirthdayWishesSection from '@/components/birthday-wishes/BirthdayWishesSection';
import WishTreeSection from '@/components/wish-tree/WishTreeSection';
import LoveMetersSection from '@/components/love-meters/LoveMetersSection';
import CelebrationSection from '@/components/celebration/CelebrationSection';
import SunriseSection from '@/components/sunrise/SunriseSection';
import SectionPlaceholder from '@/components/sections/SectionPlaceholder';

const SECTION_CONTENT = {
  'starry-night': {
    title: 'Starry Night',
    subtitle: 'Touch the stars above',
    emoji: '⭐',
    description:
      'An interactive constellation experience forming your name across the sky.',
  },
  'memory-book': {
    title: 'Memory Book',
    subtitle: 'Pages of precious moments',
    emoji: '📖',
    description:
      'A magical storybook with turning pages filled with beautiful memories.',
  },
  'photo-gallery': {
    title: 'Photo Gallery',
    subtitle: 'Captured in time',
    emoji: '📸',
    description:
      'Polaroid-style photos swinging gently with your favorite moments.',
  },
  'handwritten-letter': {
    title: 'A Letter For You',
    subtitle: 'From the heart',
    emoji: '💌',
    description:
      'An envelope with a wax seal, opening to reveal a heartfelt message.',
  },
  reasons: {
    title: '100 Reasons You Are Amazing',
    subtitle: 'Because you are extraordinary',
    emoji: '💝',
    description:
      'A carousel of beautiful compliments celebrating everything wonderful about you.',
  },
  'birthday-wishes': {
    title: 'Birthday Wishes',
    subtitle: 'A garden of love',
    emoji: '🌸',
    description:
      'One hundred heartfelt wishes floating gently around you.',
  },
  'wish-tree': {
    title: 'Magical Wish Tree',
    subtitle: 'Tap a leaf, receive a wish',
    emoji: '🌳',
    description:
      'A glowing tree with shimmering leaves hiding birthday wishes.',
  },
  'love-meters': {
    title: 'Love Meters',
    subtitle: 'Off the charts',
    emoji: '💗',
    description:
      'Animated meters measuring your smile, kindness, beauty, and more.',
  },
  'make-a-wish': {
    title: 'Make a Wish',
    subtitle: 'Close your eyes...',
    emoji: '✨',
    description:
      'Tap the glowing star and watch your wish fly into the sky.',
  },
  lanterns: {
    title: 'Floating Lanterns',
    subtitle: 'Carrying wishes to the sky',
    emoji: '🏮',
    description: 'Tap a lantern to reveal a hidden birthday message.',
  },
  'hot-air-balloon': {
    title: 'Hot Air Balloon',
    subtitle: 'Soaring with love',
    emoji: '🎈',
    description:
      'A beautiful balloon crossing the sky with a birthday banner.',
  },
  celebration: {
    title: 'Your Surprise',
    subtitle: 'Tap to celebrate',
    emoji: '🎁',
    description:
      'A magical gift waiting to explode with confetti and fireworks.',
  },
  sunrise: {
    title: 'A New Dawn',
    subtitle: 'Night becomes day',
    emoji: '🌅',
    description:
      'As you scroll, night transforms into a warm golden sunrise.',
  },
};

function renderSection(sectionId) {
  switch (sectionId) {
    case 'hero':
      return <HeroSection key={sectionId} />;
    case 'starry-night':
      return <StarryNightSection key={sectionId} />;
    case 'memory-book':
      return <MemoryBookSection key={sectionId} />;
    case 'photo-gallery':
      return <GallerySection key={sectionId} />;
    case 'handwritten-letter':
      return <LetterSection key={sectionId} />;
    case 'reasons':
      return <ReasonsSection key={sectionId} />;
    case 'birthday-wishes':
      return <BirthdayWishesSection key={sectionId} />;
    case 'wish-tree':
      return <WishTreeSection key={sectionId} />;
    case 'love-meters':
      return <LoveMetersSection key={sectionId} />;
    case 'celebration':
      return <CelebrationSection key={sectionId} />;
    case 'sunrise':
      return <SunriseSection key={sectionId} />;
    case 'make-a-wish':
      return <MakeAWishSection key={sectionId} />;
    case 'lanterns':
      return <LanternsSection key={sectionId} />;
    case 'hot-air-balloon':
      return <HotAirBalloonSection key={sectionId} />;
    case 'ending':
      return <FinalEnding key={sectionId} />;
    default: {
      const content = SECTION_CONTENT[sectionId];
      if (!content) return null;
      return <SectionPlaceholder key={sectionId} id={sectionId} {...content} />;
    }
  }
}

export default function ExperienceLayout() {
  const { currentJourney } = useApp();

  const sections = useMemo(
    () => getSectionsForJourney(currentJourney),
    [currentJourney]
  );

  const sectionIds = useMemo(() => sections.map((s) => s.id), [sections]);
  const activeSection = useActiveSection(sectionIds);

  return (
    <div className="relative">
      <ScrollProgress />
      <SiteHeader showBack />
      <SectionNav sections={sections} activeSection={activeSection} />

      <MagicalBackground />
      <MusicPlayer />

      <div className="relative z-10 pb-music-safe md:pb-0">
        {sections.map((section) => renderSection(section.id))}
      </div>

      <div
        className="pointer-events-none fixed inset-0 z-[5]"
        aria-hidden="true"
        id="sunrise-overlay"
      />
    </div>
  );
}
