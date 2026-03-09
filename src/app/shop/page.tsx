import type { Metadata } from 'next';
import SectionHeading from '@/components/ui/SectionHeading';
import Configurator from '@/components/design/Configurator';

export const metadata: Metadata = {
  title: 'Design Your Terrarium | MartyMade',
  description:
    'Build your perfect custom terrarium enclosure step by step. Choose materials, size, ventilation, door style, and add-ons.',
};

export default function ShopPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        title="Design Your Terrarium"
        subtitle="Build your perfect enclosure step by step"
      />
      <div className="mt-12">
        <Configurator />
      </div>
    </main>
  );
}
