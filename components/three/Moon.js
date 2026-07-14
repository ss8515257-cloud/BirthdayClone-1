'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { SCENE_COLORS } from '@/constants/three';

export default function Moon({ position = [4, 2.5, -6] }) {
  const glowRef = useRef();
  const moonRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(t * 0.8) * 0.08);
      glowRef.current.material.opacity = 0.15 + Math.sin(t * 0.8) * 0.05;
    }
    if (moonRef.current) {
      moonRef.current.rotation.y = Math.sin(t * 0.1) * 0.1;
    }
  });

  return (
    <group position={position}>
      <Sphere ref={glowRef} args={[1.8, 32, 32]}>
        <meshBasicMaterial
          color={SCENE_COLORS.moonGlow}
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </Sphere>
      <Sphere ref={moonRef} args={[1.2, 32, 32]}>
        <meshStandardMaterial
          color={SCENE_COLORS.moon}
          emissive={SCENE_COLORS.moonGlow}
          emissiveIntensity={0.4}
          roughness={0.8}
        />
      </Sphere>
      {/* Crater details */}
      <Sphere args={[0.15, 16, 16]} position={[-0.3, 0.2, 1.1]}>
        <meshStandardMaterial color="#E8E0D0" roughness={0.9} />
      </Sphere>
      <Sphere args={[0.1, 16, 16]} position={[0.4, -0.1, 1.1]}>
        <meshStandardMaterial color="#E8E0D0" roughness={0.9} />
      </Sphere>
      <Sphere args={[0.08, 16, 16]} position={[0.1, 0.35, 1.1]}>
        <meshStandardMaterial color="#E8E0D0" roughness={0.9} />
      </Sphere>
      <pointLight
        color={SCENE_COLORS.moonGlow}
        intensity={2}
        distance={20}
        position={[0, 0, 1]}
      />
    </group>
  );
}
