'use client';

import { Suspense } from 'react';
import ThreeCanvas from './ThreeCanvas';
import StarField from './StarField';
import Clouds from './Clouds';
import HotAirBalloon from './HotAirBalloon';
import CameraParallax from './CameraParallax';

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 8, 5]} intensity={0.5} color="#F7E7CE" />
      <hemisphereLight args={['#C8B6E2', '#0F0C29', 0.4]} />
      <StarField count={1000} />
      <Clouds />
      <HotAirBalloon />
      <CameraParallax strength={0.2} />
      <fog attach="fog" args={['#302B63', 12, 35]} />
    </>
  );
}

export default function HotAirBalloonScene({ className }) {
  return (
    <ThreeCanvas
      className={className}
      camera={{ position: [0, 1, 8], fov: 50 }}
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </ThreeCanvas>
  );
}
