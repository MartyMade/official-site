'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/data/siteConfig';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 md:hidden transition-opacity duration-300',
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Slide-in Panel */}
      <div
        className={cn(
          'absolute top-0 right-0 h-full w-72 bg-surface-950 shadow-xl transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-surface-300 hover:text-primary-400 hover:bg-surface-800 transition-colors"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col px-4">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="py-3 px-4 text-lg text-surface-200 hover:text-primary-400 hover:bg-surface-800 rounded-lg transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={siteConfig.ctaLink.href}
            onClick={onClose}
            className="mt-4 mx-4 rounded-lg bg-primary-600 py-3 px-4 text-center text-lg font-medium text-surface-50 hover:bg-primary-500 transition-colors"
          >
            {siteConfig.ctaLink.label}
          </Link>
        </nav>
      </div>
    </div>
  );
}
