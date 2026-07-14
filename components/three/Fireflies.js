'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SCENE_COLORS } from '@/constants/three';

const FIREFLY_COUNT = 30;

export default function Fireflies() {
  const ref = useRef();
  const data = useMemo(() => {
    const positions = new Float32Array(FIREFLY_COUNT * 3);
    const speeds = [];
    const offsets = [];

    for (let i = 0; i < FIREFLY_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
      speeds.push(0.3 + Math.random() * 0.7);
      offsets.push(Math.random() * Math.PI * 2);
    }

    return { positions, speeds, offsets };
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const pos = ref.current.geometry.attributes.position.array;

    for (let i = 0; i < FIREFLY_COUNT; i++) {
      const i3 = i * 3;
      pos[i3] += Math.sin(t * data.speeds[i] + data.offsets[i]) * 0.002;
      pos[i3 + 1] += Math.cos(t * data.speeds[i] * 0.8 + data.offsets[i]) * 0.002;
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.material.opacity = 0.5 + Math.sin(t * 2) * 0.2;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={FIREFLY_COUNT}
          array={data.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={SCENE_COLORS.firefly}
        size={0.06}
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}
