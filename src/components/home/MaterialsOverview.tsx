import { materials } from '@/data/materials';
import SectionHeading from '@/components/ui/SectionHeading';
import PlaceholderImage from '@/components/ui/PlaceholderImage';
import Button from '@/components/ui/Button';

export default function MaterialsOverview() {
  return (
    <section className="bg-surface-900 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          title="Choose Your Material"
          subtitle="Each material offers unique benefits for different setups and species."
          centered
        />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {materials.map((mat) => (
            <div
              key={mat.slug}
              className="overflow-hidden rounded-2xl border border-surface-700 bg-surface-800"
            >
              <PlaceholderImage
                color={mat.color}
                className="aspect-[4/3] w-full"
                label={mat.name}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-surface-50">
                  {mat.name}
                </h3>
                <p className="mt-2 text-surface-400">{mat.tagline}</p>
                <p className="mt-3 text-sm font-medium text-surface-400">
                  Starting at{' '}
                  <span className="text-copper-400">{mat.priceRange}</span>
                </p>
                <div className="mt-5">
                  <Button
                    variant="outline"
                    size="md"
                    href="/about"
                  >
                    Learn About {mat.name}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
