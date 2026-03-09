'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryItem } from '@/types';

interface LightboxProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onNavigate: (item: GalleryItem) => void;
}

const photos = [
  'photo-1561740855-e9559767addc',
  'photo-1585095595205-e68428a9e205',
  'photo-1585095595274-aeffce35511a',
  'photo-1591001522559-c863e6e3bb5b',
  'photo-1591001681938-0bfde437aba1',
  'photo-1595803783609-5c961831ce34',
  'photo-1596577843272-67744c9d0e4f',
  'photo-1596577877537-d9ca17c4090c',
  'photo-1613176748515-8cd503764873',
  'photo-1651093161533-76e8cfedb83b',
  'photo-1664238842842-86571d9523e4',
  'photo-1697927979352-8cdb8d20f863',
  'photo-1733518950869-b6f479a509af',
  'photo-1733518986158-8d9e3f653905',
];

function getPhoto(label?: string): string {
  if (!label) return photos[0];
  const hash = label.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return photos[hash % photos.length];
}

export default function Lightbox({ item, items, onClose, onNavigate }: LightboxProps) {
  const currentIndex = item ? items.findIndex((i) => i.id === item.id) : -1;

  const goPrev = useCallback(() => {
    if (currentIndex > 0) onNavigate(items[currentIndex - 1]);
  }, [currentIndex, items, onNavigate]);

  const goNext = useCallback(() => {
    if (currentIndex < items.length - 1) onNavigate(items[currentIndex + 1]);
  }, [currentIndex, items, onNavigate]);

  useEffect(() => {
    if (!item) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    }
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [item, onClose, goPrev, goNext]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative max-w-5xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`https://images.unsplash.com/${getPhoto(item.title)}?auto=format&fit=crop&w=1600&q=90`}
              alt={item.title}
              className="rounded-lg max-h-[80vh] w-auto object-contain"
            />
            <div className="mt-4 text-center">
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-1 text-sm text-surface-400">{item.description}</p>
            </div>
          </motion.div>

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Prev */}
          {currentIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Next */}
          {currentIndex < items.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
