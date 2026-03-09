'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye } from 'lucide-react';
import { galleryItems } from '@/data/gallery';
import PlaceholderImage from '@/components/ui/PlaceholderImage';
import Badge from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import DimensionDisplay from '@/components/ui/DimensionDisplay';
import Lightbox from './Lightbox';
import type { Material, GalleryItem } from '@/types';

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
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filtered = active === 'All' ? galleryItems : galleryItems.filter((i) => i.material === active);

  return (
    <div>
      {/* Filter tabs */}
      <div className="mb-10 flex flex-wrap justify-center gap-2 relative">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            className={cn(
              'relative rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer',
              active === f.value
                ? 'text-surface-50'
                : 'bg-surface-800 text-surface-400 hover:bg-surface-700 hover:text-surface-50'
            )}
          >
            {active === f.value && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 rounded-full bg-primary-600"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{f.label}</span>
          </button>
        ))}
      </div>

      {/* Masonry grid using CSS columns */}
      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, idx) => {
            const aspects = ['aspect-[4/3]', 'aspect-[3/4]', 'aspect-square'];
            const aspect = aspects[idx % 3];

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="mb-6 break-inside-avoid overflow-hidden rounded-xl border border-surface-800 bg-surface-900 transition-colors duration-200 hover:border-surface-700 cursor-pointer"
                onClick={() => setLightboxItem(item)}
              >
                <div className="group relative overflow-hidden">
                  <PlaceholderImage
                    color={item.color}
                    className={cn('w-full transition-transform duration-500 group-hover:scale-105', aspect)}
                    label={item.title}
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                      <Eye className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-sm text-surface-200 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      {item.description}
                    </p>
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
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <Lightbox
        item={lightboxItem}
        items={filtered}
        onClose={() => setLightboxItem(null)}
        onNavigate={setLightboxItem}
      />
    </div>
  );
}
