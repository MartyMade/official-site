import { Check, X } from 'lucide-react';
import { MaterialInfo } from '@/types';
import PlaceholderImage from '@/components/ui/PlaceholderImage';
import Badge from '@/components/ui/Badge';

interface MaterialHeroProps {
  material: MaterialInfo;
}

export default function MaterialHero({ material }: MaterialHeroProps) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <h1 className="text-4xl font-bold tracking-tight text-surface-50 sm:text-5xl">
                {material.name} Terrariums
              </h1>
              <Badge variant="warning">{material.priceRange}</Badge>
            </div>
            <p className="mb-2 text-xl text-primary-400">{material.tagline}</p>
            <p className="mb-8 text-lg text-surface-400">{material.description}</p>

            <div className="mb-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary-400">
                  Pros
                </h3>
                <ul className="space-y-2">
                  {material.pros.map((pro) => (
                    <li key={pro} className="flex items-start gap-2 text-surface-300">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-red-400">
                  Cons
                </h3>
                <ul className="space-y-2">
                  {material.cons.map((con) => (
                    <li key={con} className="flex items-start gap-2 text-surface-300">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-copper-400">
                Ideal For
              </h3>
              <div className="flex flex-wrap gap-2">
                {material.idealFor.map((species) => (
                  <Badge key={species} variant="default">
                    {species}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <PlaceholderImage
            color={material.color}
            className="aspect-square w-full"
            label={`${material.name} Terrarium`}
          />
        </div>
      </div>
    </section>
  );
}
