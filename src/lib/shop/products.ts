import { Category, ProductCategory, ClientProduct, LocalProductConfig } from './types';
import { getStripe } from '@/lib/stripe';

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

// Local config — only UI-specific data that Stripe doesn't manage.
// Keys must match the `shop_id` metadata on your Stripe products.
const localProductConfig: Record<string, LocalProductConfig> = {
  'adam-meets-music-pin': {
    image: '/shop/adam-meets-music-pin.jpeg',
    category: 'collectibles',
    displayOrder: 1,
  },
  'more-beats-please-pin': {
    image: '/shop/more-beats-please-pin.jpeg',
    category: 'collectibles',
    displayOrder: 2,
  },
};

/**
 * Fetches all shop products from Stripe.
 *
 * Stripe product metadata expected:
 *   - shop_id: string (matches a key in localProductConfig)
 *   - type: "physical" | "digital"
 *   - series: string (optional, e.g. "#1")
 *   - variant: string (optional, e.g. "Orange")
 *   - sold_out: "true" (optional, set when sold out)
 */
export async function fetchShopProducts(): Promise<ClientProduct[]> {
  const stripe = getStripe();

  const stripeProducts = await stripe.products.list({
    active: true,
    expand: ['data.default_price'],
  });

  const shopProducts: ClientProduct[] = [];

  for (const product of stripeProducts.data) {
    const shopId = product.metadata?.shop_id;
    if (!shopId) continue;

    const config = localProductConfig[shopId];
    if (!config) continue;

    const defaultPrice = product.default_price;
    if (!defaultPrice || typeof defaultPrice === 'string') continue;

    shopProducts.push({
      id: shopId,
      stripeProductId: product.id,
      name: product.name,
      description: product.description || '',
      price: defaultPrice.unit_amount ?? 0,
      currency: (defaultPrice.currency ?? 'gbp').toUpperCase(),
      type: (product.metadata?.type as 'physical' | 'digital') || 'physical',
      category: config.category,
      image: config.image,
      series: product.metadata?.series,
      soldOut: product.metadata?.sold_out === 'true',
    });
  }

  // Sort by display order
  shopProducts.sort((a, b) => {
    const orderA = localProductConfig[a.id]?.displayOrder ?? 99;
    const orderB = localProductConfig[b.id]?.displayOrder ?? 99;
    return orderA - orderB;
  });

  return shopProducts;
}

export async function fetchProductsByCategory(): Promise<
  { category: Category; products: ClientProduct[] }[]
> {
  const allProducts = await fetchShopProducts();

  return categories.map((cat) => ({
    category: cat,
    products: allProducts.filter((p) => p.category === cat.id),
  }));
}
