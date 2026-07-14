'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { STAGES } from '@/constants/sections';
import { useApp } from '@/lib/context';
import { StageLayout } from '@/components/layout';

const LoadingScreen = dynamic(
  () => import('@/components/loading/LoadingScreen'),
  { ssr: false }
);

const IntroExperience = dynamic(
  () => import('@/components/intro/IntroExperience'),
  { ssr: false }
);

const BrowserIntro = dynamic(
  () => import('@/components/intro/BrowserIntro'),
  { ssr: false }
);

const JourneyMenu = dynamic(
  () => import('@/components/journey/JourneyMenu'),
  { ssr: false }
);

const ExperienceLayout = dynamic(
  () => import('@/components/layout/ExperienceLayout'),
  { ssr: false }
);

export default function BirthdayExperience() {
  const { setIsLoading } = useApp();
  const [stage, setStage] = useState(STAGES.LOADING);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setStage(STAGES.INTRO);
  };

  const handleIntroComplete = () => setStage(STAGES.BROWSER);
  const handleBrowserComplete = () => setStage(STAGES.JOURNEY);
  const handleJourneySelect = () => setStage(STAGES.MAIN);

  return (
    <div className="relative min-h-screen-safe">
      {stage === STAGES.LOADING && (
        <StageLayout>
          <LoadingScreen onComplete={handleLoadingComplete} />
        </StageLayout>
      )}

      {stage === STAGES.INTRO && (
        <StageLayout>
          <IntroExperience onComplete={handleIntroComplete} />
        </StageLayout>
      )}

      {stage === STAGES.BROWSER && (
        <StageLayout>
          <BrowserIntro onComplete={handleBrowserComplete} />
        </StageLayout>
      )}

      {stage === STAGES.JOURNEY && (
        <StageLayout>
          <JourneyMenu onSelect={handleJourneySelect} />
        </StageLayout>
      )}

      {stage === STAGES.MAIN && <ExperienceLayout />}
    </div>
  );
}
