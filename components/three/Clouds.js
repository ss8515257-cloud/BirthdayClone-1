'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SCENE_COLORS } from '@/constants/three';

function Cloud({ position, scale = 1, speed = 0.1 }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.x =
        position[0] + Math.sin(clock.getElapsedTime() * speed) * 0.5;
    }
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial
          color={SCENE_COLORS.cloud}
          transparent
          opacity={0.25}
          roughness={1}
        />
      </mesh>
      <mesh position={[0.5, 0.1, 0]}>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshStandardMaterial
          color={SCENE_COLORS.cloud}
          transparent
          opacity={0.2}
          roughness={1}
        />
      </mesh>
      <mesh position={[-0.45, 0.05, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial
          color={SCENE_COLORS.cloud}
          transparent
          opacity={0.2}
          roughness={1}
        />
      </mesh>
      <mesh position={[0.15, 0.25, 0]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial
          color={SCENE_COLORS.cloud}
          transparent
          opacity={0.18}
          roughness={1}
        />
      </mesh>
    </group>
  );
}

export default function Clouds() {
  const clouds = useMemo(
    () => [
      { position: [-5, 1, -8], scale: 1.5, speed: 0.08 },
      { position: [2, 2, -10], scale: 1.2, speed: 0.06 },
      { position: [6, 0.5, -7], scale: 1.8, speed: 0.1 },
      { position: [-2, -1, -9], scale: 1.0, speed: 0.07 },
    ],
    []
  );

  return (
    <group>
      {clouds.map((cloud, i) => (
        <Cloud key={i} {...cloud} />
      ))}
    </group>
  );
}
