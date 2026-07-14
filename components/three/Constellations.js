'use client';

import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  HEART_CONSTELLATION,
  LETTER_G_CONSTELLATION,
  HAPPY_BIRTHDAY_STARS,
  SCENE_COLORS,
} from '@/constants/three';

function ConstellationStar({ position, size = 0.06, color = SCENE_COLORS.starBright }) {
  const ref = useRef();
  const basePos = useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame(({ clock }) => {
    if (ref.current) {
      const pulse = 1 + Math.sin(clock.getElapsedTime() * 2 + basePos.x) * 0.3;
      ref.current.scale.setScalar(pulse);
      ref.current.material.opacity = 0.7 + Math.sin(clock.getElapsedTime() * 3) * 0.3;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.9} />
    </mesh>
  );
}

function ConstellationLines({ points, color = SCENE_COLORS.line, closed = false }) {
  const linePoints = useMemo(() => {
    const vectors = points.map((p) => new THREE.Vector3(p.x * 3, p.y * 3, -1));
    if (closed && vectors.length > 0) {
      vectors.push(vectors[0].clone());
    }
    return vectors;
  }, [points, closed]);

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(linePoints);
  }, [linePoints]);

  const materialRef = useRef();

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.opacity = 0.3 + Math.sin(clock.getElapsedTime()) * 0.15;
    }
  });

  return (
    <line geometry={geometry}>
      <lineBasicMaterial
        ref={materialRef}
        color={color}
        transparent
        opacity={0.4}
        linewidth={1}
      />
    </line>
  );
}

function InteractiveStar({ position, onSparkle }) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    onSparkle?.(e.point);
  };

  return (
    <mesh
      ref={ref}
      position={position}
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      <sphereGeometry args={[hovered ? 0.08 : 0.05, 16, 16]} />
      <meshBasicMaterial
        color={hovered ? SCENE_COLORS.starPink : SCENE_COLORS.starBright}
        transparent
        opacity={hovered ? 1 : 0.8}
      />
    </mesh>
  );
}

function SparkleBurst({ position, onDone }) {
  const ref = useRef();
  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 12; i++) {
      arr.push({
        dir: new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2
        ).normalize(),
        speed: 0.02 + Math.random() * 0.03,
      });
    }
    return arr;
  }, []);

  const ages = useRef(particles.map(() => 0));

  useFrame(() => {
    if (!ref.current) return;
    let allDone = true;
    ref.current.children.forEach((child, i) => {
      ages.current[i] += 1;
      if (ages.current[i] < 40) {
        allDone = false;
        child.position.add(particles[i].dir.clone().multiplyScalar(particles[i].speed));
        child.material.opacity = 1 - ages.current[i] / 40;
      }
    });
    if (allDone) onDone?.();
  });

  return (
    <group ref={ref} position={position}>
      {particles.map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial
            color={SCENE_COLORS.starPink}
            transparent
            opacity={1}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function Constellations({ onStarTouch }) {
  const [sparkles, setSparkles] = useState([]);

  const heartStars = useMemo(
    () => HEART_CONSTELLATION.map((p) => [p.x * 3, p.y * 3, -1]),
    []
  );

  const gStars = useMemo(
    () => LETTER_G_CONSTELLATION.map((p) => [p.x * 3, p.y * 3, -0.5]),
    []
  );

  const birthdayStars = useMemo(
    () => HAPPY_BIRTHDAY_STARS.map((p) => [p.x * 3, p.y * 3, -0.8]),
    []
  );

  const randomStars = useMemo(() => {
    const stars = [];
    for (let i = 0; i < 40; i++) {
      stars.push([
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4 - 1,
      ]);
    }
    return stars;
  }, []);

  const handleSparkle = (point) => {
    const id = Date.now();
    setSparkles((prev) => [...prev, { id, position: [point.x, point.y, point.z] }]);
    onStarTouch?.();
  };

  const removeSparkle = (id) => {
    setSparkles((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <group>
      {/* Heart constellation */}
      <ConstellationLines points={HEART_CONSTELLATION} closed />
      {heartStars.map((pos, i) => (
        <ConstellationStar key={`heart-${i}`} position={pos} color={SCENE_COLORS.starPink} />
      ))}

      {/* Letter G constellation */}
      <ConstellationLines points={LETTER_G_CONSTELLATION} />
      {gStars.map((pos, i) => (
        <ConstellationStar key={`g-${i}`} position={pos} size={0.05} />
      ))}

      {/* Happy Birthday arc stars */}
      {birthdayStars.map((pos, i) => (
        <ConstellationStar
          key={`bday-${i}`}
          position={pos}
          size={0.04}
          color={SCENE_COLORS.starDim}
        />
      ))}

      {/* Interactive random stars */}
      {randomStars.map((pos, i) => (
        <InteractiveStar key={`rand-${i}`} position={pos} onSparkle={handleSparkle} />
      ))}

      {/* Sparkle bursts */}
      {sparkles.map((s) => (
        <SparkleBurst
          key={s.id}
          position={s.position}
          onDone={() => removeSparkle(s.id)}
        />
      ))}
    </group>
  );
}
