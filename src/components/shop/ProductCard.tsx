'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { usePostHog } from 'posthog-js/react';
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
      className='group bg-white/5 border-2 border-dashed border-white/20 rounded-lg overflow-hidden flex flex-col hover:border-[#FCC552]/50 transition-colors duration-300'
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Image with scanline overlay */}
      <div className='relative aspect-[3/4] overflow-hidden'>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className='object-cover'
          sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
        />
        {/* CRT scanline effect */}
        <div
          className='absolute inset-0 pointer-events-none opacity-[0.03]'
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.8) 2px, rgba(0,0,0,0.8) 4px)',
          }}
        />
      </div>

      <div className='p-5 flex flex-col flex-1 gap-3'>
        {/* Retro badges */}
        <div className='flex items-center gap-2'>
          <span className='text-[10px] font-pixel uppercase px-2 py-1 border border-[#FCC552]/40 text-[#FCC552] tracking-widest'>
            {product.type === 'physical' ? '◆ ITEM' : '◆ DLC'}
          </span>
          {product.series ? (
            <span className='text-[10px] font-pixel uppercase px-2 py-1 border border-white/20 text-white/50 tracking-widest'>
              VOL {product.series}
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
            <span className='font-pixel text-[#FCC552] text-xl'>
              {formatPrice(product.price)}
            </span>
            {product.type === 'physical' ? (
              <span className='text-white/40 text-xs block font-pixel'>+ shipping</span>
            ) : null}
          </div>

          {product.soldOut ? (
            <span className='font-pixel text-sm px-6 py-2 border-2 border-white/20 text-white/30 tracking-wider cursor-not-allowed'>
              SOLD OUT
            </span>
          ) : (
            <button
              onClick={handleBuy}
              disabled={loading}
              className='font-pixel text-sm px-6 py-2 bg-[#FCC552] text-black border-2 border-[#FCC552] hover:bg-transparent hover:text-[#FCC552] active:translate-y-[2px] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed tracking-wider'
            >
              {loading ? '...' : '► BUY'}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
