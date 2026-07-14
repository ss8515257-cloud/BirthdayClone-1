'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useReducedMotion } from '@/hooks';

export default function CameraParallax({ strength = 0.3 }) {
  const prefersReducedMotion = useReducedMotion();
  const { camera, pointer } = useThree();
  const basePosition = useRef(null);

  useFrame(() => {
    if (!basePosition.current) {
      basePosition.current = {
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z,
      };
    }

    if (prefersReducedMotion) return;

    const targetX = basePosition.current.x + pointer.x * strength;
    const targetY = basePosition.current.y + pointer.y * strength;

    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return null;
}
