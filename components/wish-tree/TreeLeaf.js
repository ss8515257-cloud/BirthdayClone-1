'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks';
import { cn } from '@/utils';

const LEAF_PATH =
  'M0,0 C8,-12 20,-8 16,4 C12,16 0,20 -4,8 C-8,-4 0,0 Z';

export default function TreeLeaf({ leaf, index, picked, onPick }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.g
      transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.rotate}) scale(${leaf.scale})`}
      style={{ cursor: 'pointer' }}
      animate={
        picked
          ? { scale: leaf.scale * 1.15 }
          : prefersReducedMotion
            ? {}
            : { rotate: [leaf.rotate - 3, leaf.rotate + 3, leaf.rotate - 3] }
      }
      transition={
        picked
          ? { duration: 0.4 }
          : { duration: 3 + (index % 4), repeat: Infinity, ease: 'easeInOut' }
      }
      whileHover={{ scale: leaf.scale * 1.2 }}
      whileTap={{ scale: leaf.scale * 0.9 }}
    >
      {/* Glow behind leaf */}
      <motion.ellipse
        cx={6}
        cy={6}
        rx={18}
        ry={14}
        fill={picked ? 'rgba(247,231,206,0.5)' : 'rgba(200,182,226,0.25)'}
        animate={
          picked || prefersReducedMotion
            ? {}
            : { opacity: [0.3, 0.7, 0.3] }
        }
        transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.1 }}
      />

      <motion.path
        d={LEAF_PATH}
        fill={picked ? 'url(#leafGold)' : 'url(#leafGreen)'}
        stroke={picked ? '#F7E7CE' : '#8FB996'}
        strokeWidth={1}
        onClick={() => onPick(index)}
        role="button"
        tabIndex={0}
        aria-label="Tap to receive a wish"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onPick(index);
          }
        }}
        className={cn('outline-none focus-visible:stroke-champagne-gold')}
        style={{ transform: 'scale(1.8)', transformOrigin: '6px 6px' }}
      />

      {/* Shimmer dot */}
      {!picked && !prefersReducedMotion && (
        <motion.circle
          cx={12}
          cy={2}
          r={1.5}
          fill="#F7E7CE"
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.15,
          }}
        />
      )}
    </motion.g>
  );
}
