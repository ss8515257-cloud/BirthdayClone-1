'use client';

import { motion } from 'framer-motion';
import { LOVE_METERS, LOVE_METERS_META } from '@/constants';
import LoveMeter from './LoveMeter';

export default function LoveMetersList() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="flex flex-col gap-4 sm:gap-5">
        {LOVE_METERS.map((meter, i) => (
          <LoveMeter key={meter.id} meter={meter} index={i} />
        ))}
      </div>

      <motion.p
        className="mt-10 text-center font-dancing text-xl text-cream-white/95 sm:text-2xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        {LOVE_METERS_META.footer}
      </motion.p>

      <p className="mt-3 text-center font-poppins text-xs uppercase tracking-widest text-cream-white/60">
        {LOVE_METERS_META.hint}
      </p>
    </div>
  );
}
