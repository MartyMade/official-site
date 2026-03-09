export const presetSizes = [
  { key: 'small' as const, label: 'Small', dimensions: '24" x 18" x 12"', basePrice: 0 },
  { key: 'medium' as const, label: 'Medium', dimensions: '36" x 24" x 18"', basePrice: 80 },
  { key: 'large' as const, label: 'Large', dimensions: '48" x 24" x 24"', basePrice: 160 },
  { key: 'extra-large' as const, label: 'Extra Large', dimensions: '72" x 24" x 24"', basePrice: 280 },
];

export const materialBasePrices = {
  ABS: 149,
  PVC: 199,
  Glass: 129,
};

export const ventilationOptions = [
  { key: 'screen-top' as const, label: 'Screen Top', description: 'Mesh top for airflow and light penetration', price: 0 },
  { key: 'solid-top' as const, label: 'Solid Top', description: 'Enclosed top for humidity retention', price: 15 },
];

export const doorStyleOptions = [
  { key: 'sliding' as const, label: 'Sliding', description: 'Space-saving sliding doors', price: 0 },
  { key: 'hinged' as const, label: 'Hinged', description: 'Front-opening hinged doors', price: 15 },
];
