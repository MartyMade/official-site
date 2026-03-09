'use client';

import { ProductSize } from '@/types';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  sizes: ProductSize[];
  activeSize: ProductSize | 'all';
  onFilterChange: (size: ProductSize | 'all') => void;
}

const sizeLabels: Record<ProductSize | 'all', string> = {
  all: 'All',
  small: 'Small',
  medium: 'Medium',
  large: 'Large',
  'extra-large': 'Extra Large',
};

export default function FilterBar({ sizes, activeSize, onFilterChange }: FilterBarProps) {
  const options: (ProductSize | 'all')[] = ['all', ...sizes];

  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {options.map((size) => (
        <button
          key={size}
          onClick={() => onFilterChange(size)}
          className={cn(
            'rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer',
            activeSize === size
              ? 'bg-primary-600 text-surface-50'
              : 'bg-surface-800 text-surface-400 hover:bg-surface-700 hover:text-surface-200'
          )}
        >
          {sizeLabels[size]}
        </button>
      ))}
    </div>
  );
}
