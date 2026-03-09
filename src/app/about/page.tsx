import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import PlaceholderImage from '@/components/ui/PlaceholderImage';
import MaterialTabs from '@/components/about/MaterialTabs';
import { Heart, Wrench, Shield, Leaf } from 'lucide-react';

export const metadata = {
  title: 'About | MartyMade',
  description:
    'Learn about MartyMade — our story, craftsmanship philosophy, and the materials behind our handbuilt terrariums.',
};

const values = [
  {
    icon: Heart,
    title: 'Passion First',
    description:
      'We are reptile keepers ourselves. Every enclosure we build reflects what we would want for our own animals.',
  },
  {
    icon: Wrench,
    title: 'Built by Hand',
    description:
      'No mass production, no shortcuts. Every seam is sealed, every vent is placed, and every door is fitted by hand.',
  },
  {
    icon: Shield,
    title: 'Quality Guaranteed',
    description:
      'We stand behind every build. If something is not right, we make it right — no questions asked.',
  },
  {
    icon: Leaf,
    title: 'Animal Welfare',
    description:
      'Proper husbandry starts with a proper enclosure. We design for the animal first, aesthetics second.',
  },
];

export default function AboutPage() {
  return (
    <main className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="About MartyMade"
          subtitle="Handcrafted terrariums born from a passion for reptile keeping"
        />

        {/* Brand Story */}
        <section className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-2xl font-bold text-surface-50">Our Story</h3>
            <div className="space-y-4 text-surface-400 leading-relaxed">
              <p>
                MartyMade started the way most good things do — out of frustration. As lifelong
                reptile keepers, we were tired of enclosures that were either too flimsy, too
                generic, or too expensive for what they offered. So we started building our own.
              </p>
              <p>
                What began as a weekend project in a garage quickly turned into something bigger.
                Friends in the herp community started asking for builds. Then their friends asked.
                Before long, we had a workshop, a waitlist, and a mission: build the best terrariums
                on the market, one at a time.
              </p>
              <p>
                Today, MartyMade ships handcrafted ABS, PVC, and glass enclosures across the
                country. Every build is made to order, sized to spec, and designed with the animal in
                mind.
              </p>
            </div>
          </div>
          <PlaceholderImage
            color="#78716c"
            className="aspect-[4/3] w-full rounded-xl"
            label="The MartyMade Workshop"
          />
        </section>

        {/* Craftsmanship */}
        <section className="mt-24">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <PlaceholderImage
              color="#374151"
              className="aspect-[4/3] w-full rounded-xl"
              label="Handcrafted Detail"
            />
            <div>
              <h3 className="mb-4 text-2xl font-bold text-surface-50">Craftsmanship</h3>
              <div className="space-y-4 text-surface-400 leading-relaxed">
                <p>
                  Every MartyMade terrarium is handbuilt from start to finish. We cut, assemble,
                  seal, and finish each enclosure ourselves — no outsourced panels, no pre-fab kits.
                </p>
                <p>
                  We obsess over the details: perfectly aligned door tracks, food-safe silicone
                  seals, precision-drilled ventilation, and clean interior finishes. The result is an
                  enclosure that looks great, functions flawlessly, and lasts for years.
                </p>
                <p>
                  We use only premium-grade materials sourced from trusted suppliers. Whether it is
                  marine-grade PVC, high-impact ABS, or tempered safety glass, every component is
                  chosen for durability and animal safety.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mt-24">
          <h3 className="mb-10 text-center text-2xl font-bold text-surface-50">What We Stand For</h3>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="rounded-xl border border-surface-800 bg-surface-900 p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-900">
                    <Icon className="h-6 w-6 text-primary-400" />
                  </div>
                  <h4 className="mb-2 text-lg font-semibold text-surface-50">{v.title}</h4>
                  <p className="text-sm leading-relaxed text-surface-400">{v.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Materials */}
        <section className="mt-24">
          <h3 className="mb-4 text-center text-2xl font-bold text-surface-50">
            What We Build
          </h3>
          <p className="mx-auto mb-10 max-w-2xl text-center text-surface-400">
            Every enclosure is fully custom. Here are the materials we work with and examples of what is possible.
          </p>
          <MaterialTabs />
        </section>

        {/* CTA */}
        <section className="mt-24 text-center">
          <h3 className="text-2xl font-bold text-surface-50">Ready to Build Yours?</h3>
          <p className="mx-auto mt-3 max-w-lg text-surface-400">
            Every terrarium is made to order. Design your perfect enclosure or get in touch to discuss your project.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/shop" size="lg">
              Design Your Terrarium
            </Button>
            <Button href="/contact" size="lg" variant="outline">
              Get in Touch
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
