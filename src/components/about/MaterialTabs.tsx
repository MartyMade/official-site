'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { materials } from '@/data/materials';
import { products } from '@/data/products';
import PlaceholderImage from '@/components/ui/PlaceholderImage';
import Badge from '@/components/ui/Badge';
import DimensionDisplay from '@/components/ui/DimensionDisplay';
import { Check, X } from 'lucide-react';

export default function MaterialTabs() {
  const [activeSlug, setActiveSlug] = useState(materials[0].slug);
  const material = materials.find((m) => m.slug === activeSlug)!;
  const exampleProducts = products.filter((p) => p.material === material.name).slice(0, 3);

  return (
    <div>
      {/* Tabs */}
      <div className="mb-8 flex justify-center gap-2">
        {materials.map((m) => (
          <button
            key={m.slug}
            onClick={() => setActiveSlug(m.slug)}
            className={cn(
              'rounded-full px-6 py-2.5 text-sm font-medium transition-colors cursor-pointer',
              activeSlug === m.slug
                ? 'bg-primary-600 text-surface-50'
                : 'bg-surface-800 text-surface-400 hover:bg-surface-700 hover:text-surface-50'
            )}
          >
            {m.name}
          </button>
        ))}
      </div>

      {/* Active material content */}
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
        <PlaceholderImage
          color={material.color}
          className="aspect-[4/3] w-full rounded-xl"
          label={`${material.name} Terrarium`}
        />
        <div>
          <div className="mb-4 flex items-center gap-3">
            <h4 className="text-2xl font-bold text-surface-50">{material.name}</h4>
            <Badge variant="warning">{material.priceRange}</Badge>
          </div>
          <p className="mb-2 text-lg text-primary-400">{material.tagline}</p>
          <p className="mb-6 text-surface-400">{material.description}</p>

          <div className="mb-6 grid grid-cols-2 gap-6">
            <div>
              <h5 className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary-400">Pros</h5>
              <ul className="space-y-1.5">
                {material.pros.map((pro) => (
                  <li key={pro} className="flex items-start gap-2 text-sm text-surface-300">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-400" />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="mb-2 text-xs font-semibold uppercase tracking-wider text-red-400">Cons</h5>
              <ul className="space-y-1.5">
                {material.cons.map((con) => (
                  <li key={con} className="flex items-start gap-2 text-sm text-surface-300">
                    <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400" />
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h5 className="mb-2 text-xs font-semibold uppercase tracking-wider text-copper-400">Ideal For</h5>
            <div className="flex flex-wrap gap-2">
              {material.idealFor.map((species) => (
                <Badge key={species} variant="default">{species}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Example builds */}
      {exampleProducts.length > 0 && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {exampleProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-xl border border-surface-800 bg-surface-900 p-4"
            >
              <h5 className="font-semibold text-surface-50">{product.name}</h5>
              <p className="mt-1 text-sm text-surface-400">
                <DimensionDisplay dimensions={product.dimensions} />
              </p>
              <ul className="mt-2 space-y-0.5">
                {product.features.slice(0, 2).map((f) => (
                  <li key={f} className="text-xs text-surface-500">&bull; {f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
