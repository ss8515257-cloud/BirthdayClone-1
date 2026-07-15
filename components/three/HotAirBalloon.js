'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import { SCENE_COLORS } from '@/constants/three';

function BalloonEnvelope() {
  return (
    <group>
      {/* Main balloon */}
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial
          color={SCENE_COLORS.balloon}
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>
      {/* Accent panels */}
      <mesh position={[0.6, 0.3, 0]} rotation={[0, 0, 0.3]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial
          color={SCENE_COLORS.balloonAccent}
          transparent
          opacity={0.7}
        />
      </mesh>
      <mesh position={[-0.5, -0.2, 0.3]} rotation={[0.2, 0, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial
          color="#FFDAB9"
          transparent
          opacity={0.6}
        />
      </mesh>
      {/* Basket ropes */}
      {[-0.3, 0.3].map((x, i) => (
        <mesh key={i} position={[x, -1.3, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.8, 4]} />
          <meshStandardMaterial color="#B76E79" />
        </mesh>
      ))}
      {/* Basket */}
      <mesh position={[0, -1.7, 0]}>
        <boxGeometry args={[0.6, 0.3, 0.4]} />
        <meshStandardMaterial color="#B76E79" roughness={0.9} />
      </mesh>
    </group>
  );
}

function Banner() {
  return (
    <group position={[0, -2.5, 0.5]}>
      {/* Banner poles */}
      <mesh position={[-1.8, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 4]} />
        <meshStandardMaterial color="#B76E79" />
      </mesh>
      <mesh position={[1.8, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 4]} />
        <meshStandardMaterial color="#B76E79" />
      </mesh>
      {/* Banner cloth */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.6, 0.5, 0.02]} />
        <meshStandardMaterial
          color="#FFF8F0"
          emissive="#F7E7CE"
          emissiveIntensity={0.2}
        />
      </mesh>
      <Text
        position={[0, 0, 0.02]}
        fontSize={0.18}
        color="#B76E79"
        anchorX="center"
        anchorY="middle"
        maxWidth={3.4}
      >
        Happy Birthday Gurleen ❤️
      </Text>
    </group>
  );
}

function Bird({ position, speed }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      ref.current.position.x = position[0] + t * speed;
      ref.current.position.y =
        position[1] + Math.sin(t * 3) * 0.1;
      if (ref.current.position.x > 12) {
        ref.current.position.x = -12;
      }
    }
  });

  return (
    <group ref={ref} position={position}>
      <mesh rotation={[0, 0, 0.5]}>
        <coneGeometry args={[0.04, 0.1, 3]} />
        <meshBasicMaterial color="#7E22CE" />
      </mesh>
      <mesh rotation={[0, 0, -0.5]} position={[0.06, 0.02, 0]}>
        <coneGeometry args={[0.04, 0.1, 3]} />
        <meshBasicMaterial color="#7E22CE" />
      </mesh>
    </group>
  );
}

export default function HotAirBalloon() {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      groupRef.current.position.x = Math.sin(t * 0.15) * 3 - 1;
      groupRef.current.position.y = Math.sin(t * 0.2) * 0.3 + 0.5;
    }
  });

  return (
    <group>
      <Float speed={1} rotationIntensity={0.05} floatIntensity={0.2}>
        <group ref={groupRef} position={[-1, 0.5, -2]}>
          <BalloonEnvelope />
          <Banner />
        </group>
      </Float>

      <Bird position={[-8, 2, -5]} speed={0.8} />
      <Bird position={[-10, 3, -6]} speed={0.6} />
      <Bird position={[6, 1.5, -4]} speed={0.7} />
    </group>
  );
}
