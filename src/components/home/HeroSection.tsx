import Button from '@/components/ui/Button';

export default function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 text-white">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Handcrafted Terrariums for Every Species
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-green-100 sm:text-xl">
          Premium enclosures built from ABS, PVC, and glass — designed to keep
          your reptiles safe, comfortable, and thriving.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button variant="primary" size="lg" href="/shop">
            Design Your Terrarium
          </Button>
          <Button variant="secondary" size="lg" href="/about">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
