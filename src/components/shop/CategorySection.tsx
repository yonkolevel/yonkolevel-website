'use client';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import type { ClientProduct } from '@/lib/shop/types';

interface CategorySectionProps {
  name: string;
  description: string;
  products: ClientProduct[];
}

export default function CategorySection({ name, description, products }: CategorySectionProps) {
  return (
    <section className='mb-16 md:mb-24'>
      <motion.div
        className='mb-8 md:mb-12'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className='font-pixel text-white text-2xl md:text-4xl mb-2'>
          {name}
        </h2>
        <p className='text-white/60 text-sm md:text-base'>
          {description}
        </p>
      </motion.div>

      {products.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <motion.div
          className='bg-white/5 border border-white/10 rounded-2xl p-12 text-center'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className='font-pixel text-white/40 text-xl md:text-2xl mb-2'>
            Coming Soon
          </p>
          <p className='text-white/30 text-sm'>
            Stay tuned for new releases
          </p>
        </motion.div>
      )}
    </section>
  );
}
