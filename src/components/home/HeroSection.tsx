'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import SectionDivider from '@/components/ui/SectionDivider';
import HeroParticles from './HeroParticles';

const wordAnimation = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const wordChild = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

export default function HeroSection() {
  const titleWords = 'Handcrafted Terrariums for Every Species'.split(' ');

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden text-white">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 animate-gradient-shift"
        style={{
          background: 'linear-gradient(135deg, #1a2f0d 0%, #064e3b 25%, #134e4a 50%, #1a2f0d 75%, #064e3b 100%)',
          backgroundSize: '400% 400%',
        }}
      />

      {/* Noise texture overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" aria-hidden="true">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {/* Vignette overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      {/* Floating particles */}
      <HeroParticles />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
        {/* Animated title */}
        <motion.h1
          className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
          variants={wordAnimation}
          initial="hidden"
          animate="visible"
        >
          {titleWords.map((word, i) => (
            <motion.span key={i} variants={wordChild} className="inline-block mr-[0.3em] text-gradient">
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg text-green-100/90 sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Premium enclosures built from ABS, PVC, and glass — designed to keep
          your reptiles safe, comfortable, and thriving.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Button variant="primary" size="lg" href="/shop">
            Design Your Terrarium
          </Button>
          <Button variant="secondary" size="lg" href="/about">
            Learn More
          </Button>
        </motion.div>
      </div>

      {/* Section divider */}
      <SectionDivider variant="wave" fillColor="var(--surface-900)" />
    </section>
  );
}
