import { Product, Material } from '@/types';
import { formatPrice } from '@/lib/utils';
import PlaceholderImage from '@/components/ui/PlaceholderImage';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import DimensionDisplay from '@/components/ui/DimensionDisplay';

interface ProductCardProps {
  product: Product;
}

const materialColors: Record<Material, string> = {
  ABS: '#374151',
  PVC: '#78716c',
  Glass: '#166534',
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-surface-800 bg-surface-900 transition-colors duration-200 hover:border-surface-700">
      <div className="relative">
        <PlaceholderImage
          color={materialColors[product.material]}
          className="aspect-[4/3] w-full"
          label={product.name}
        />
        {!product.inStock && (
          <div className="absolute top-3 right-3">
            <Badge variant="warning">Out of Stock</Badge>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-surface-50">{product.name}</h3>
          <Badge variant="info">{product.material}</Badge>
        </div>

        <p className="mb-3 text-sm text-surface-400"><DimensionDisplay dimensions={product.dimensions} /></p>

        <ul className="mb-4 space-y-1">
          {product.features.slice(0, 3).map((feature) => (
            <li key={feature} className="text-sm text-surface-400">
              &bull; {feature}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-xl font-bold text-surface-50">{formatPrice(product.price)}</span>
          {product.inStock ? (
            <Button size="sm" href={`/shop/${product.material.toLowerCase()}/${product.id}`}>
              View Details
            </Button>
          ) : (
            <Button size="sm" variant="outline" disabled>
              Out of Stock
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
