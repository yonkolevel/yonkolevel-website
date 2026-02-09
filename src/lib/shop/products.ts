import { Product, Category, ProductCategory, ClientProduct } from './types';

export const categories: Category[] = [
  {
    id: 'collectibles',
    name: 'Collectibles',
    description: 'Limited edition enamel pins and physical goods',
  },
  {
    id: 'wallpapers',
    name: 'Wallpapers',
    description: 'Digital wallpapers for your devices',
  },
];

export const products: Product[] = [
  {
    id: 'adam-meets-music-pin',
    name: 'Adam Meets Music Pin',
    description: 'Orange enamel pin from the MidiCircuit collection. Series #1.',
    price: 599,
    currency: 'GBP',
    type: 'physical',
    category: 'collectibles',
    image: '/shop/adam-meets-music-pin.jpeg',
    stripePriceId: process.env.STRIPE_PRICE_ADAM_MEETS_MUSIC || '',
    series: '#1',
    variant: 'Orange',
  },
  {
    id: 'more-beats-please-pin',
    name: 'More Beats Please Pin',
    description: 'Lavender enamel pin from the MidiCircuit collection. Series #1.',
    price: 599,
    currency: 'GBP',
    type: 'physical',
    category: 'collectibles',
    image: '/shop/more-beats-please-pin.jpeg',
    stripePriceId: process.env.STRIPE_PRICE_MORE_BEATS_PLEASE || '',
    series: '#1',
    variant: 'Lavender',
  },
];

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function toClientProduct(product: Product): ClientProduct {
  const { stripePriceId, ...clientProduct } = product;
  return clientProduct;
}

export function getClientProductsByCategory(category: ProductCategory): ClientProduct[] {
  return getProductsByCategory(category).map(toClientProduct);
}
