interface SectionDividerProps {
  variant?: 'wave' | 'curve' | 'organic';
  className?: string;
  fillColor?: string;
}

export default function SectionDivider({ variant = 'wave', className = '', fillColor = 'var(--surface-900)' }: SectionDividerProps) {
  const paths: Record<string, string> = {
    wave: 'M0,64 C320,120 640,0 960,64 C1280,128 1600,0 1920,64 L1920,200 L0,200 Z',
    curve: 'M0,128 Q960,0 1920,128 L1920,200 L0,200 Z',
    organic: 'M0,96 C240,160 480,32 720,96 C960,160 1200,48 1440,96 C1680,144 1920,64 1920,96 L1920,200 L0,200 Z',
  };

  return (
    <div className={`absolute bottom-0 left-0 right-0 overflow-hidden leading-[0] ${className}`}>
      <svg
        viewBox="0 0 1920 200"
        preserveAspectRatio="none"
        className="block w-full h-[60px] sm:h-[80px]"
      >
        <path d={paths[variant]} fill={fillColor} />
      </svg>
    </div>
  );
}
