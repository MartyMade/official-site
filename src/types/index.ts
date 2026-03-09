export type Material = 'ABS' | 'PVC' | 'Glass';
export type ProductSize = 'small' | 'medium' | 'large' | 'extra-large';

export interface Product {
  id: string;
  name: string;
  material: Material;
  size: ProductSize;
  dimensions: string;
  price: number;
  description: string;
  features: string[];
  inStock: boolean;
  featured: boolean;
}

export interface MaterialInfo {
  slug: string;
  name: Material;
  tagline: string;
  description: string;
  pros: string[];
  cons: string[];
  idealFor: string[];
  priceRange: string;
  color: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  material: Material;
  size: string;
  description: string;
  color: string;
}

export interface TerrariumConfig {
  material: Material | null;
  size: {
    preset: ProductSize | null;
    custom?: { w: number; d: number; h: number };
  };
  features: {
    ventilation: 'screen-top' | 'solid-top';
    doorStyle: 'hinged' | 'sliding';
  };
}
