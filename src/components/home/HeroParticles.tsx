'use client';

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 13) % 100}%`,
  top: `${(i * 23 + 7) % 100}%`,
  size: 8 + (i % 4) * 4,
  delay: (i * 0.8) % 6,
  duration: 4 + (i % 3) * 2,
  opacity: 0.06 + (i % 5) * 0.02,
}));

export default function HeroParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <svg
          key={p.id}
          className="absolute animate-float"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          {/* Leaf shape */}
          <path
            d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75"
            className="text-primary-400"
          />
        </svg>
      ))}
    </div>
  );
}
