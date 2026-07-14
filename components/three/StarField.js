'use client';

import { Stars } from '@react-three/drei';

export default function StarField({ count = 3000 }) {
  return (
    <Stars
      radius={80}
      depth={60}
      count={count}
      factor={3}
      saturation={0.5}
      fade
      speed={0.5}
    />
  );
}
