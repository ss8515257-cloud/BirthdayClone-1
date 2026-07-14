'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { SCENE_COLORS } from '@/constants/three';

export default function Lantern({
  position,
  speed = 0.3,
  message,
  onReveal,
  index,
}) {
  const groupRef = useRef();
  const [revealed, setRevealed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const startY = position[1];

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.position.y =
      startY + ((t * speed + index) % 8) - 2;
    groupRef.current.position.x =
      position[0] + Math.sin(t * 0.5 + index) * 0.3;
  });

  const handleClick = (e) => {
    e.stopPropagation();
    if (!revealed) {
      setRevealed(true);
      onReveal?.(message);
    }
  };

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group
        ref={groupRef}
        position={position}
        onClick={handleClick}
        onPointerOver={() => {
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        {/* Glow */}
        <mesh>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshBasicMaterial
            color={SCENE_COLORS.lanternGlow}
            transparent
            opacity={hovered ? 0.3 : 0.15}
          />
        </mesh>

        {/* Lantern body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.25, 0.4, 8]} />
          <meshStandardMaterial
            color={SCENE_COLORS.lantern}
            emissive={SCENE_COLORS.lanternGlow}
            emissiveIntensity={hovered ? 0.8 : 0.4}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Top cap */}
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.22, 0.2, 0.06, 8]} />
          <meshStandardMaterial color="#B76E79" />
        </mesh>

        {/* Bottom */}
        <mesh position={[0, -0.22, 0]}>
          <cylinderGeometry args={[0.15, 0.2, 0.04, 8]} />
          <meshStandardMaterial color="#B76E79" />
        </mesh>

        {/* Inner flame */}
        <pointLight
          color={SCENE_COLORS.lanternGlow}
          intensity={hovered ? 1.5 : 0.8}
          distance={3}
        />

        {/* Flame visual */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial
            color="#FFDAB9"
            transparent
            opacity={0.9}
          />
        </mesh>
      </group>
    </Float>
  );
}
