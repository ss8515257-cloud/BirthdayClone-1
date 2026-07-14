'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  TREE_WISHES,
  TREE_LEAF_POSITIONS,
  WISH_TREE_META,
} from '@/constants/content';
import { SOUND_EFFECTS } from '@/constants';
import { useHaptic } from '@/hooks';
import { playSound } from '@/lib/audio';
import { fireGoldenParticles } from '@/lib/confetti';
import TreeLeaf from './TreeLeaf';

export default function WishTree() {
  const [pickedLeaves, setPickedLeaves] = useState(new Set());
  const [activeWish, setActiveWish] = useState(null);
  const [activeLeafIndex, setActiveLeafIndex] = useState(null);
  const { vibrate } = useHaptic();

  const handlePick = (leafIndex) => {
    const leaf = TREE_LEAF_POSITIONS[leafIndex];
    const wish = TREE_WISHES[leaf.wishIndex % TREE_WISHES.length];

    setPickedLeaves((prev) => new Set([...prev, leafIndex]));
    setActiveWish(wish);
    setActiveLeafIndex(leafIndex);
    vibrate(20);

    try {
      playSound(SOUND_EFFECTS.sparkle, { volume: 0.25 });
    } catch {}

    try {
      fireGoldenParticles();
    } catch {}
  };

  return (
    <div className="mx-auto w-full max-w-lg">
      {/* Tree SVG */}
      <div className="relative">
        {/* Ground glow */}
        <div
          className="pointer-events-none absolute bottom-8 left-1/2 h-16 w-64 -translate-x-1/2 rounded-full bg-lavender/20 blur-2xl"
          aria-hidden="true"
        />

        <svg
          viewBox="0 0 400 520"
          className="mx-auto w-full max-w-md drop-shadow-lg"
          role="img"
          aria-label="Magical wish tree with glowing leaves"
        >
          <defs>
            <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#5C4033" />
              <stop offset="50%" stopColor="#8B6914" />
              <stop offset="100%" stopColor="#5C4033" />
            </linearGradient>
            <linearGradient id="leafGreen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A8D5BA" />
              <stop offset="50%" stopColor="#6B9E78" />
              <stop offset="100%" stopColor="#4A7C59" />
            </linearGradient>
            <linearGradient id="leafGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F7E7CE" />
              <stop offset="50%" stopColor="#E8A0BF" />
              <stop offset="100%" stopColor="#C8B6E2" />
            </linearGradient>
            <radialGradient id="canopyGlow" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="rgba(200,182,226,0.25)" />
              <stop offset="100%" stopColor="rgba(200,182,226,0)" />
            </radialGradient>
            <filter id="treeGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Canopy ambient glow */}
          <ellipse
            cx="200"
            cy="170"
            rx="160"
            ry="130"
            fill="url(#canopyGlow)"
          />

          {/* Branches */}
          <g stroke="url(#trunkGrad)" strokeWidth="6" fill="none" strokeLinecap="round">
            <path d="M200 280 C200 220 200 180 200 140" />
            <path d="M200 240 C160 210 130 180 110 150" />
            <path d="M200 240 C240 210 270 180 290 150" />
            <path d="M200 260 C170 250 140 245 100 235" />
            <path d="M200 260 C230 250 260 245 300 235" />
            <path d="M200 220 C175 195 155 170 140 145" />
            <path d="M200 220 C225 195 245 170 260 145" />
          </g>

          {/* Trunk */}
          <rect
            x="182"
            y="270"
            width="36"
            height="210"
            rx="6"
            fill="url(#trunkGrad)"
          />
          <rect
            x="186"
            y="275"
            width="8"
            height="200"
            rx="3"
            fill="rgba(255,255,255,0.08)"
          />

          {/* Grass mound */}
          <ellipse cx="200" cy="478" rx="90" ry="14" fill="#4A7C59" opacity="0.5" />

          {/* Interactive leaves */}
          <g filter="url(#treeGlow)">
            {TREE_LEAF_POSITIONS.map((leaf, i) => (
              <TreeLeaf
                key={i}
                leaf={leaf}
                index={i}
                picked={pickedLeaves.has(i)}
                onPick={handlePick}
              />
            ))}
          </g>

          {/* Fireflies */}
          {[...Array(8)].map((_, i) => (
            <motion.circle
              key={`fly-${i}`}
              cx={80 + i * 35}
              cy={120 + (i % 3) * 40}
              r={2}
              fill="#F7E7CE"
              animate={{
                opacity: [0.2, 0.9, 0.2],
                cy: [120 + (i % 3) * 40, 110 + (i % 3) * 40, 120 + (i % 3) * 40],
              }}
              transition={{
                duration: 3 + i * 0.4,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </svg>
      </div>

      {/* Wish reveal */}
      <div className="mt-6 min-h-[120px]">
        <AnimatePresence mode="wait">
          {activeWish ? (
            <motion.div
              key={activeLeafIndex}
              className="mx-auto max-w-md rounded-2xl border border-white/20 bg-gradient-to-br from-lavender/25 via-rose-pink/15 to-champagne-gold/20 p-6 text-center shadow-glass backdrop-blur-md"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-2 font-poppins text-xs uppercase tracking-widest text-champagne-gold/70">
                {WISH_TREE_META.revealedLabel}
              </p>
              <p className="font-dancing text-xl leading-relaxed text-cream-white sm:text-2xl">
                &ldquo;{activeWish}&rdquo;
              </p>
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              className="text-center font-dancing text-lg text-rose-pink/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {WISH_TREE_META.tapHint}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {pickedLeaves.size > 0 && (
        <p className="mt-4 text-center font-poppins text-sm text-cream-white/40">
          {pickedLeaves.size} / {TREE_LEAF_POSITIONS.length}{' '}
          {WISH_TREE_META.pickedLabel}
        </p>
      )}
    </div>
  );
}
