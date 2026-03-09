import { MaterialInfo } from '@/types';

export const materials: MaterialInfo[] = [
  {
    slug: 'abs',
    name: 'ABS',
    tagline: 'Lightweight & Durable',
    description:
      'ABS (Acrylonitrile Butadiene Styrene) terrariums offer an excellent balance of durability and weight. The rigid plastic construction resists impacts and holds humidity well, making it ideal for tropical species. ABS enclosures are easy to clean, modify, and stack.',
    pros: [
      'Lightweight yet strong',
      'Excellent humidity retention',
      'Easy to drill and modify',
      'Stackable designs',
      'Resistant to impacts',
    ],
    cons: [
      'Less visibility than glass',
      'Can warp under extreme heat',
      'Limited aesthetic appeal compared to glass',
    ],
    idealFor: [
      'Ball pythons',
      'Corn snakes',
      'Leopard geckos',
      'Crested geckos',
      'Tarantulas',
    ],
    priceRange: '$149 - $449',
    color: '#374151',
  },
  {
    slug: 'pvc',
    name: 'PVC',
    tagline: 'Professional Grade Insulation',
    description:
      'PVC terrariums are the gold standard for serious reptile keepers. The expanded PVC panels provide superior insulation, keeping heat and humidity stable with minimal energy cost. Waterproof, lightweight, and incredibly durable — PVC enclosures last a lifetime.',
    pros: [
      'Superior insulation',
      'Completely waterproof',
      'Excellent humidity control',
      'Very lightweight',
      'Long lifespan',
      'Easy to sanitize',
    ],
    cons: [
      'Higher price point',
      'Limited to front viewing',
      'Requires proper ventilation design',
    ],
    idealFor: [
      'Boa constrictors',
      'Green tree pythons',
      'Chameleons',
      'Dart frogs',
      'Monitor lizards',
    ],
    priceRange: '$199 - $599',
    color: '#78716c',
  },
  {
    slug: 'glass',
    name: 'Glass',
    tagline: 'Crystal Clear Viewing',
    description:
      'Glass terrariums offer unmatched visibility and aesthetic appeal. Perfect for display setups and bioactive vivariums where you want to showcase your animals and plants. Our tempered glass enclosures feature front-opening doors for easy access and feeding.',
    pros: [
      '360-degree visibility',
      'Beautiful display piece',
      'Scratch resistant',
      'Ideal for bioactive setups',
      'Does not discolor over time',
    ],
    cons: [
      'Heavier than plastic alternatives',
      'Lower insulation',
      'More fragile during transport',
      'Higher heating costs',
    ],
    idealFor: [
      'Dart frogs',
      'Day geckos',
      'Anoles',
      'Planted vivariums',
      'Invertebrates',
    ],
    priceRange: '$129 - $549',
    color: '#166534',
  },
];
