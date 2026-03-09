import { products } from '@/data/products';
import Button from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';
import PlaceholderImage from '@/components/ui/PlaceholderImage';
import Badge from '@/components/ui/Badge';
import DimensionDisplay from '@/components/ui/DimensionDisplay';

const materialColors: Record<string, string> = {
  ABS: '#374151',
  PVC: '#78716c',
  Glass: '#166534',
};

export default function FeaturedProducts() {
  const featured = products.filter((p) => p.featured);

  return (
    <section className="bg-surface-950 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          title="Example Builds"
          subtitle="A look at what we can create. Every build is fully custom."
          centered
        />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-2xl border border-surface-700 bg-surface-800"
            >
              <PlaceholderImage
                color={materialColors[product.material] ?? '#6b7280'}
                className="aspect-[4/3] w-full"
                label={product.name}
              />
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-surface-50">
                    {product.name}
                  </h3>
                  <Badge>{product.material}</Badge>
                </div>
                <p className="mt-1 text-sm text-surface-400">
                  <DimensionDisplay dimensions={product.dimensions} />
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" href="/shop">
            Design Your Own
          </Button>
        </div>
      </div>
    </section>
  );
}
