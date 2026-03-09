import { parseDimensionString } from '@/lib/utils';

interface DimensionDisplayProps {
  dimensions?: string;
  w?: number;
  d?: number;
  h?: number;
  className?: string;
}

function toFeet(inches: number) {
  return Math.round((inches / 12) * 10) / 10;
}

export default function DimensionDisplay({ dimensions, w, d, h, className }: DimensionDisplayProps) {
  const values = dimensions ? parseDimensionString(dimensions) : [w, d, h].filter((v): v is number => v != null);

  if (values.length === 0) return null;

  return (
    <span className={className}>
      {values.map((val, i) => (
        <span key={i}>
          {i > 0 && <span className="text-surface-500"> × </span>}
          {toFeet(val)}ft
        </span>
      ))}
    </span>
  );
}
