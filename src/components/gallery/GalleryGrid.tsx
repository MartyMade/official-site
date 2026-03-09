'use client';

import { useState } from 'react';
import { galleryItems } from '@/data/gallery';
import PlaceholderImage from '@/components/ui/PlaceholderImage';
import Badge from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import DimensionDisplay from '@/components/ui/DimensionDisplay';
import type { Material } from '@/types';

const filters: Array<{ label: string; value: Material | 'All' }> = [
  { label: 'All', value: 'All' },
  { label: 'ABS', value: 'ABS' },
  { label: 'PVC', value: 'PVC' },
  { label: 'Glass', value: 'Glass' },
];

const materialBadgeVariant: Record<Material, 'default' | 'success' | 'warning' | 'info'> = {
  ABS: 'default',
  PVC: 'warning',
  Glass: 'success',
};

export default function GalleryGrid() {
  const [active, setActive] = useState<Material | 'All'>('All');

  const filtered = active === 'All' ? galleryItems : galleryItems.filter((i) => i.material === active);

  return (
    <div>
      {/* Filter tabs */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            className={cn(
              'rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer',
              active === f.value
                ? 'bg-primary-600 text-surface-50'
                : 'bg-surface-800 text-surface-400 hover:bg-surface-700 hover:text-surface-50'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Masonry grid using CSS columns */}
      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
        {filtered.map((item, idx) => {
          // Vary aspect ratios for masonry feel
          const aspects = ['aspect-[4/3]', 'aspect-[3/4]', 'aspect-square'];
          const aspect = aspects[idx % 3];

          return (
            <div
              key={item.id}
              className="mb-6 break-inside-avoid overflow-hidden rounded-xl border border-surface-800 bg-surface-900 transition-colors duration-200 hover:border-surface-700"
            >
              <div className="relative">
                <PlaceholderImage
                  color={item.color}
                  className={cn('w-full', aspect)}
                  label={item.title}
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 hover:opacity-100">
                  <p className="text-sm text-surface-300">{item.description}</p>
                </div>
                {/* Material badge */}
                <div className="absolute top-3 right-3">
                  <Badge variant={materialBadgeVariant[item.material]}>{item.material}</Badge>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-surface-50">{item.title}</h3>
                <p className="mt-1 text-sm text-surface-400"><DimensionDisplay dimensions={item.size} /></p>
                <p className="mt-2 text-sm leading-relaxed text-surface-500 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
