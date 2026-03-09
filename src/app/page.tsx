import HeroSection from '@/components/home/HeroSection';
import ValueProps from '@/components/home/ValueProps';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import MaterialsOverview from '@/components/home/MaterialsOverview';
import HomeCTA from '@/components/home/HomeCTA';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ValueProps />
      <FeaturedProducts />
      <MaterialsOverview />
      <HomeCTA />
    </>
  );
}
