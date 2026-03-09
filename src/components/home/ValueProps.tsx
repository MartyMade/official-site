'use client';

import { Shield, Ruler, Paintbrush } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';

const values = [
  {
    icon: Shield,
    title: 'Built to Last',
    description:
      'Every enclosure is constructed with premium materials and reinforced joints, ensuring years of reliable use for your animals.',
  },
  {
    icon: Ruler,
    title: 'Custom Sizes',
    description:
      'Need a specific dimension? We build terrariums to any size so your pet gets the perfect amount of space.',
  },
  {
    icon: Paintbrush,
    title: 'Your Design',
    description:
      'Choose your material, color, ventilation style, and accessories. Full customization from top to bottom.',
  },
];

export default function ValueProps() {
  return (
    <section className="relative bg-surface-900 py-20 overflow-hidden">
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 bg-dots opacity-[0.15]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          title="Why MartyMade?"
          subtitle="Quality, customization, and care in every build."
          centered
        />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.1}>
              <div className="card-hover rounded-2xl border border-surface-700 bg-surface-800 p-8 text-center hover:border-primary-700/50 hover:shadow-primary-900/20">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-900 text-primary-400">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-surface-50">
                  {item.title}
                </h3>
                <p className="mt-3 text-surface-400">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
