'use client';
import { useSearchParams } from 'next/navigation';
import { usePostHog } from 'posthog-js/react';
import { useEffect } from 'react';
import SuccessBanner from '@/components/shop/SuccessBanner';
import type { ClientProduct } from '@/lib/shop/types';

interface ShopClientProps {
  products: ClientProduct[];
}

export default function ShopClient({ products }: ShopClientProps) {
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  const isSuccess = searchParams.get('success') === 'true';
  const purchasedProductId = searchParams.get('product');

  const purchasedProduct = purchasedProductId
    ? products.find((p) => p.id === purchasedProductId)
    : undefined;

  useEffect(() => {
    if (isSuccess) {
      posthog?.capture('shop_purchase_completed', {
        product_id: purchasedProductId,
        product_name: purchasedProduct?.name,
      });
    }
  }, [isSuccess, purchasedProductId, purchasedProduct?.name, posthog]);

  if (!isSuccess) return null;

  return <SuccessBanner productName={purchasedProduct?.name} />;
}
