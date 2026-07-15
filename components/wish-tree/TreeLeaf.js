'use client';

import { motion } from 'framer-motion';
import { useReducedMotion, useIsMobile } from '@/hooks';
import { cn } from '@/utils';

const LEAF_PATH =
  'M0,0 C8,-12 20,-8 16,4 C12,16 0,20 -4,8 C-8,-4 0,0 Z';

export default function TreeLeaf({ leaf, index, picked, onPick }) {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const displayScale = leaf.scale * (isMobile ? 1.35 : 1.15);
  const hitRadius = isMobile ? 24 : 18;

  const handlePick = () => onPick(index);

  return (
    <g transform={`translate(${leaf.x}, ${leaf.y})`}>
      <motion.g
        style={{ cursor: 'pointer', transformOrigin: '6px 6px' }}
        initial={{ rotate: leaf.rotate, scale: displayScale }}
        animate={
          picked
            ? { rotate: leaf.rotate, scale: displayScale * 1.12 }
            : prefersReducedMotion
              ? { rotate: leaf.rotate, scale: displayScale }
              : {
                  rotate: [leaf.rotate - 3, leaf.rotate + 3, leaf.rotate - 3],
                  scale: displayScale,
                }
        }
        transition={
          picked
            ? { duration: 0.4 }
            : { duration: 3 + (index % 4), repeat: Infinity, ease: 'easeInOut' }
        }
        whileHover={{ scale: displayScale * 1.18 }}
        whileTap={{ scale: displayScale * 0.92 }}
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

        {/* Larger invisible tap target */}
        <circle
          cx={6}
          cy={6}
          r={hitRadius}
          fill="transparent"
          onClick={handlePick}
          role="button"
          tabIndex={0}
          aria-label="Tap to receive a wish"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handlePick();
            }
          }}
          className={cn('outline-none focus-visible:fill-white/10')}
        />

        <path
          d={LEAF_PATH}
          fill={picked ? 'url(#leafGold)' : 'url(#leafGreen)'}
          stroke={picked ? '#F7E7CE' : '#8FB996'}
          strokeWidth={1.2}
          pointerEvents="none"
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
    </g>
  );
}
