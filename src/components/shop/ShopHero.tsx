'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { usePostHog } from 'posthog-js/react';
import { useState } from 'react';
import Container from '@/components/Container';
import PixelDisplacementGrid from '@/components/PixelDisplacementGrid';
import { formatPrice } from '@/lib/shop/utils';
import type { ClientProduct } from '@/lib/shop/types';

const heroPixelDisplacements = [
  { row: 0, col: 0, displaceX: 2, displaceY: -1 },
  { row: 1, col: 1, displaceX: 2, displaceY: 1 },
  { row: 2, col: 0, displaceX: 1, displaceY: 2 },
  { row: 7, col: 0, displaceX: -1, displaceY: 2 },
  { row: 7, col: 2, displaceX: 2, displaceY: 2 },
];

interface ShopHeroProps {
  product: ClientProduct;
}

export default function ShopHero({ product }: ShopHeroProps) {
  const [loading, setLoading] = useState(false);
  const posthog = usePostHog();

  const handleBuy = async () => {
    setLoading((prev) => true);
    posthog?.capture('shop_product_buy_clicked', {
      product_id: product.id,
      product_name: product.name,
      product_type: product.type,
      price: product.price,
      location: 'hero',
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
    <section className='relative min-h-[70vh] flex items-center overflow-hidden'>
      <div className='absolute inset-0'>
        <PixelDisplacementGrid
          backgroundColor='#1a1a1a'
          holeColor='#000000'
          displacedPixelColor='#FCC552'
          pixelSize={40}
          displacements={heroPixelDisplacements}
          animationDelay={0.15}
          animationDuration={0.5}
        />
      </div>

      <Container>
        <div className='relative z-40 py-16 md:py-24'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center'>
            {/* Product image */}
            <motion.div
              className='relative aspect-[3/4] max-w-[400px] mx-auto md:mx-0 w-full'
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className='relative w-full h-full rounded-lg overflow-hidden'>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className='object-cover'
                  sizes='(max-width: 768px) 100vw, 50vw'
                  priority
                />
              </div>
            </motion.div>

            {/* Product info */}
            <div className='flex flex-col gap-4 md:gap-6'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <span className='font-pixel text-[#FCC552]/60 text-xs tracking-[0.3em] uppercase'>
                  ★ Featured
                </span>
              </motion.div>

              <motion.h1
                className='font-pixel text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1]'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {product.name}
              </motion.h1>

              <motion.p
                className='text-white/60 text-base md:text-lg max-w-md'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {product.description}
              </motion.p>

              <motion.div
                className='flex items-center gap-3'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.55, duration: 0.6 }}
              >
                <span className='text-[10px] font-pixel uppercase px-2 py-1 border border-[#FCC552]/40 text-[#FCC552] tracking-widest'>
                  ◆ ITEM
                </span>
                {product.series ? (
                  <span className='text-[10px] font-pixel uppercase px-2 py-1 border border-white/20 text-white/50 tracking-widest'>
                    COLLECTION {product.series}
                  </span>
                ) : null}
              </motion.div>

              <motion.div
                className='flex items-center gap-6 mt-2'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div>
                  <span className='font-pixel text-[#FCC552] text-3xl md:text-4xl'>
                    {formatPrice(product.price)}
                  </span>
                  <span className='text-white/40 text-xs block font-pixel mt-1'>
                    + shipping
                  </span>
                </div>

                {product.soldOut ? (
                  <span className='font-pixel text-base px-8 py-3 border-2 border-white/20 text-white/30 tracking-wider cursor-not-allowed'>
                    SOLD OUT
                  </span>
                ) : (
                  <button
                    onClick={handleBuy}
                    disabled={loading}
                    className='font-pixel text-base px-8 py-3 bg-[#FCC552] text-black border-2 border-[#FCC552] hover:bg-transparent hover:text-[#FCC552] active:translate-y-[2px] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed tracking-wider'
                  >
                    {loading ? '...' : '► BUY NOW'}
                  </button>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
