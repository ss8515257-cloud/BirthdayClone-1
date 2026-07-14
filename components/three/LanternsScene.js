'use client';

import { Suspense } from 'react';
import { LANTERN_POSITIONS } from '@/constants/three';
import { LANTERN_MESSAGES } from '@/constants/content';
import ThreeCanvas from './ThreeCanvas';
import StarField from './StarField';
import Moon from './Moon';
import Clouds from './Clouds';
import Lantern from './Lantern';
import CameraParallax from './CameraParallax';

function SceneContent({ onLanternReveal }) {
  return (
    <>
      <ambientLight intensity={0.1} />
      <StarField count={1500} />
      <Moon position={[5, 3, -8]} />
      <Clouds />
      <CameraParallax strength={0.3} />
      <fog attach="fog" args={['#0F0C29', 10, 30]} />

      {LANTERN_POSITIONS.map((pos, i) => (
        <Lantern
          key={i}
          index={i}
          position={[pos.x, pos.y, pos.z]}
          speed={pos.speed}
          message={LANTERN_MESSAGES[i % LANTERN_MESSAGES.length]}
          onReveal={onLanternReveal}
        />
      ))}
    </>
  );
}

export default function LanternsScene({ onLanternReveal, className }) {
  return (
    <ThreeCanvas
      className={className}
      camera={{ position: [0, 0, 5], fov: 60 }}
    >
      <Suspense fallback={null}>
        <SceneContent onLanternReveal={onLanternReveal} />
      </Suspense>
    </ThreeCanvas>
  );
}
