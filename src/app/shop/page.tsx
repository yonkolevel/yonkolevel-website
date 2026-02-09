import { Metadata } from 'next';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Container from '@/components/Container';
import CategorySection from '@/components/shop/CategorySection';
import ShopClient from './ShopClient';
import { categories, getClientProductsByCategory } from '@/lib/shop/products';

const ShopHero = dynamic(() => import('@/components/shop/ShopHero'), {
  ssr: true,
});

export const metadata: Metadata = {
  title: 'Shop - Collectibles & Digital Goods | Yonko Level',
  description:
    'Shop limited edition enamel pins, collectibles, and digital wallpapers from the Yonko Level universe.',
  openGraph: {
    title: 'Shop - Collectibles & Digital Goods | Yonko Level',
    description:
      'Shop limited edition enamel pins, collectibles, and digital wallpapers from the Yonko Level universe.',
    url: 'https://yonkolevel.com/shop',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shop - Collectibles & Digital Goods | Yonko Level',
    description:
      'Shop limited edition enamel pins, collectibles, and digital wallpapers from the Yonko Level universe.',
  },
};

export default function ShopPage() {
  const allClientProducts = categories.map((cat) => ({
    category: cat,
    products: getClientProductsByCategory(cat.id),
  }));

  return (
    <div className='bg-black min-h-screen'>
      <ShopHero />

      <Container>
        <div className='py-16 md:py-24'>
          <Suspense fallback={null}>
            <ShopClient
              products={allClientProducts.flatMap((c) => c.products)}
            />
          </Suspense>

          {allClientProducts.map(({ category, products }) => (
            <CategorySection
              key={category.id}
              name={category.name}
              description={category.description}
              products={products}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
