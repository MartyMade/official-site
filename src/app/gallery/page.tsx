import SectionHeading from '@/components/ui/SectionHeading';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'Gallery | MartyMade',
  description: 'Browse our portfolio of custom-built terrariums in ABS, PVC, and glass.',
};

export default function GalleryPage() {
  return (
    <main className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Build Gallery"
          subtitle="See what we've created for our customers"
        />

        <GalleryGrid />

        {/* CTA */}
        <div className="mt-20 rounded-xl border border-surface-800 bg-surface-900 px-8 py-12 text-center">
          <h3 className="text-2xl font-bold text-surface-50">Want something similar?</h3>
          <p className="mx-auto mt-3 max-w-lg text-surface-400">
            Every build in our gallery started as a conversation. Tell us what you need and
            we&apos;ll make it happen.
          </p>
          <div className="mt-8">
            <Button href="/shop" size="lg">
              Start a Custom Build
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
