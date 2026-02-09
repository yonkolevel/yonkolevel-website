'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { usePostHog } from 'posthog-js/react';
import Button from '@/components/Button';
import { formatPrice } from '@/lib/shop/utils';
import type { ClientProduct } from '@/lib/shop/types';

interface ProductCardProps {
  product: ClientProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [loading, setLoading] = useState(false);
  const posthog = usePostHog();

  const handleBuy = async () => {
    setLoading((prev) => true);

    posthog?.capture('shop_product_buy_clicked', {
      product_id: product.id,
      product_name: product.name,
      product_type: product.type,
      price: product.price,
    });

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Checkout failed:', data);
        setLoading((prev) => false);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setLoading((prev) => false);
    }
  };

  return (
    <motion.div
      className='bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col'
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className='relative aspect-[3/4]'>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className='object-cover'
          sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
        />
      </div>

      <div className='p-5 flex flex-col flex-1 gap-3'>
        <div className='flex items-center gap-2'>
          <span className='text-xs font-pixel uppercase px-2 py-1 rounded-full bg-white/10 text-white/70'>
            {product.type === 'physical' ? 'Physical' : 'Digital'}
          </span>
          {product.series ? (
            <span className='text-xs font-pixel uppercase px-2 py-1 rounded-full bg-white/10 text-white/70'>
              Series {product.series}
            </span>
          ) : null}
        </div>

        <h3 className='font-pixel text-white text-lg leading-tight'>
          {product.name}
        </h3>

        <p className='text-white/60 text-sm flex-1'>
          {product.description}
        </p>

        <div className='flex items-center justify-between mt-2'>
          <div>
            <span className='font-pixel text-white text-xl'>
              {formatPrice(product.price)}
            </span>
            {product.type === 'physical' ? (
              <span className='text-white/40 text-xs block'>+ shipping</span>
            ) : null}
          </div>

          <Button
            onClick={handleBuy}
            disabled={loading}
            className='!btn-sm !w-auto !min-w-0 px-6'
          >
            {loading ? 'LOADING...' : 'BUY'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
