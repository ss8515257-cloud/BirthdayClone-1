'use client';

import { Suspense } from 'react';
import ThreeCanvas from './ThreeCanvas';
import StarField from './StarField';
import Constellations from './Constellations';
import Moon from './Moon';
import Clouds from './Clouds';
import Fireflies from './Fireflies';
import CameraParallax from './CameraParallax';

function SceneContent({ onStarTouch }) {
  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} color="#C8B6E2" />
      <StarField count={2500} />
      <Constellations onStarTouch={onStarTouch} />
      <Moon />
      <Clouds />
      <Fireflies />
      <CameraParallax strength={0.5} />
      <fog attach="fog" args={['#3B0764', 8, 25]} />
    </>
  );
}

export default function StarryNightScene({ onStarTouch, className }) {
  return (
    <ThreeCanvas
      className={className}
      camera={{ position: [0, 0, 6], fov: 55 }}
    >
      <Suspense fallback={null}>
        <SceneContent onStarTouch={onStarTouch} />
      </Suspense>
    </ThreeCanvas>
  );
}
