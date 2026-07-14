'use client';

import dynamic from 'next/dynamic';
import { AppShell } from '@/components/layout';
import { useLenis } from '@/hooks';

const BirthdayExperience = dynamic(
  () => import('@/components/BirthdayExperience'),
  { ssr: false }
);

export default function Home() {
  useLenis();

  return (
    <AppShell>
      <main id="main-content" className="relative min-h-screen-safe">
        <BirthdayExperience />
      </main>
    </AppShell>
  );
}
