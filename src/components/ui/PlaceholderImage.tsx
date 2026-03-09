import { cn } from '@/lib/utils';

interface PlaceholderImageProps {
  color?: string;
  className?: string;
  label?: string;
  icon?: React.ReactNode;
}

// All from Unsplash "ball python" search — verified working
const photos = [
  'photo-1561740855-e9559767addc',
  'photo-1585095595205-e68428a9e205',
  'photo-1585095595274-aeffce35511a',
  'photo-1591001522559-c863e6e3bb5b',
  'photo-1591001681938-0bfde437aba1',
  'photo-1595803783609-5c961831ce34',
  'photo-1596577843272-67744c9d0e4f',
  'photo-1596577877537-d9ca17c4090c',
  'photo-1613176748515-8cd503764873',
  'photo-1651093161533-76e8cfedb83b',
  'photo-1664238842842-86571d9523e4',
  'photo-1697927979352-8cdb8d20f863',
  'photo-1733518950869-b6f479a509af',
  'photo-1733518986158-8d9e3f653905',
];

function getPhoto(label?: string): string {
  if (!label) return photos[0];
  const hash = label.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return photos[hash % photos.length];
}

export default function PlaceholderImage({ color = '#374151', className, label }: PlaceholderImageProps) {
  const photoId = getPhoto(label);
  const src = `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=800&q=80`;

  return (
    <div
      className={cn('relative overflow-hidden rounded-lg', className)}
      style={{
        background: `linear-gradient(135deg, ${color}33 0%, ${color}66 50%, ${color}44 100%)`,
      }}
    >
      <img
        src={src}
        alt={label || ''}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
    </div>
  );
}
