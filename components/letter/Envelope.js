'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks';
import { LETTER_META } from '@/constants/content';
import WaxSeal from './WaxSeal';

export default function Envelope({ onOpen }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="relative mx-auto w-full max-w-md"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <motion.div
        className="perspective-1000 relative aspect-[3/2] w-full"
        animate={
          prefersReducedMotion
            ? {}
            : { y: [0, -8, 0] }
        }
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Envelope body */}
        <div className="absolute inset-0 overflow-hidden rounded-lg bg-gradient-to-br from-champagne-gold via-peach to-champagne-gold shadow-premium">
          {/* Inner shadow */}
          <div className="absolute inset-0 bg-gradient-to-t from-rose-gold/20 to-transparent" />

          {/* Bottom flap lines */}
          <div className="absolute inset-0">
            <div className="absolute bottom-0 left-0 h-full w-full">
              <div
                className="absolute bottom-0 left-0 h-[70%] w-1/2 origin-bottom-left"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(183,110,121,0.15), transparent)',
                  clipPath: 'polygon(0 100%, 0 0, 100% 100%)',
                }}
              />
              <div
                className="absolute bottom-0 right-0 h-[70%] w-1/2 origin-bottom-right"
                style={{
                  background:
                    'linear-gradient(225deg, rgba(183,110,121,0.15), transparent)',
                  clipPath: 'polygon(100% 100%, 100% 0, 0 100%)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Top flap */}
        <div
          className="absolute left-0 right-0 top-0 h-1/2 origin-top"
          style={{
            background: 'linear-gradient(180deg, #F7E7CE, #FFDAB9)',
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            borderRadius: '8px 8px 0 0',
            boxShadow: '0 4px 8px rgba(183,110,121,0.15)',
          }}
          aria-hidden="true"
        />

        {/* Wax seal centered on flap tip */}
        <div className="absolute left-1/2 top-[42%] z-10 -translate-x-1/2">
          <WaxSeal onClick={onOpen} sealed />
        </div>
      </motion.div>

      <p className="mt-6 text-center font-dancing text-base text-cream-white/95 sm:mt-8 sm:text-lg">
        {LETTER_META.openHint}
      </p>
    </motion.div>
  );
}
