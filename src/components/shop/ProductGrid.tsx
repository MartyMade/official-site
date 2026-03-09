'use client';

import { useState } from 'react';
import { Product, ProductSize } from '@/types';
import FilterBar from '@/components/shop/FilterBar';
import ProductCard from '@/components/shop/ProductCard';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [activeSize, setActiveSize] = useState<ProductSize | 'all'>('all');

  const sizes: ProductSize[] = Array.from(
    new Set(products.map((p) => p.size))
  ) as ProductSize[];

  const filteredProducts =
    activeSize === 'all'
      ? products
      : products.filter((p) => p.size === activeSize);

  return (
    <div>
      <FilterBar sizes={sizes} activeSize={activeSize} onFilterChange={setActiveSize} />

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-lg text-surface-400">No products found for the selected size.</p>
        </div>
      )}
    </div>
  );
}
