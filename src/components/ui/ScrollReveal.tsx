'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type Variant = 'fade-up' | 'fade-left' | 'fade-right' | 'scale-in';

const variants = {
  'fade-up': {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-left': {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
  'fade-right': {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },
  'scale-in': {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
} as const;

interface ScrollRevealProps {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
  duration?: number;
}

export default function ScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  className,
  duration = 0.5,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      variants={variants[variant]}
      className={className}
    >
      {children}
    </motion.div>
  );
}
