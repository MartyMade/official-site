'use client';

import { cn } from '@/lib/utils';
import ScrollReveal from './ScrollReveal';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({ title, subtitle, centered = true, className }: SectionHeadingProps) {
  return (
    <ScrollReveal>
      <div className={cn('mb-12', centered && 'text-center', className)}>
        <h2 className={cn('text-3xl font-bold tracking-tight text-surface-50 sm:text-4xl section-heading-accent', centered && 'centered')}>
          {title}
        </h2>
        {subtitle && <p className="mt-4 text-lg text-surface-400 max-w-2xl mx-auto">{subtitle}</p>}
      </div>
    </ScrollReveal>
  );
}
