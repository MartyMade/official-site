import Button from '@/components/ui/Button';

export default function HomeCTA() {
  return (
    <section className="bg-gradient-to-r from-green-800 to-emerald-700 py-20 text-white">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to Build Your Dream Terrarium?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-green-100">
          Tell us about your species, space, and style. We will design and build
          a fully custom enclosure tailored to your exact needs.
        </p>
        <div className="mt-8">
          <Button variant="primary" size="lg" href="/shop">
            Start Your Custom Build
          </Button>
        </div>
      </div>
    </section>
  );
}
