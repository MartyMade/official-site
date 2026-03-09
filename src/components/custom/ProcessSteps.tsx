import { MessageSquare, PenTool, Package } from 'lucide-react';

const steps = [
  {
    number: 1,
    title: 'Consultation',
    description:
      'Tell us about your species, space, and vision. We discuss your needs and recommend the best materials and features.',
    icon: MessageSquare,
  },
  {
    number: 2,
    title: 'Design & Quote',
    description:
      'We create a detailed design with dimensions, materials, and features. You review, tweak, and approve before we start.',
    icon: PenTool,
  },
  {
    number: 3,
    title: 'Build & Deliver',
    description:
      'Your terrarium is handcrafted in our shop with meticulous attention to detail, then carefully packed and shipped to your door.',
    icon: Package,
  },
];

export default function ProcessSteps() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {/* Connecting line (desktop) */}
          <div className="absolute top-14 left-[16.67%] right-[16.67%] hidden h-0.5 bg-gradient-to-r from-primary-600 via-copper-400 to-primary-600 md:block" />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative flex flex-col items-center text-center">
                {/* Number badge */}
                <div className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-lg font-bold text-surface-50 shadow-lg shadow-primary-600/30">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-surface-800 border border-surface-700">
                  <Icon className="h-8 w-8 text-copper-400" />
                </div>

                {/* Title */}
                <h3 className="mb-2 text-xl font-bold text-surface-50">{step.title}</h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-surface-400">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
