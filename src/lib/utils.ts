import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function parseDimensionString(dim: string): number[] {
  return [...dim.matchAll(/(\d+(?:\.\d+)?)\s*"/g)].map((m) => Number(m[1]));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price);
}
