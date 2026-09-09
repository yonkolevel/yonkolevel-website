'use client';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { HEADING, LABEL, SUBHEAD } from '@/lib/typography';
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
        className='mb-10 md:mb-12'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className='flex items-center gap-3 mb-2'>
          <h2 className={`${HEADING} text-white`}>
            {name}
          </h2>
        </div>
      </motion.div>

      {products.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <motion.div
          className='border-2 border-dashed border-white/10 rounded-lg p-12 text-center'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className={`${SUBHEAD} text-white/40 mb-2`}>
            Coming Soon
            <motion.span
              className='inline-block ml-1'
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
            >
              _
            </motion.span>
          </p>
          <p className={`${LABEL} text-white/30`}>
            ► Insert coin to continue
          </p>
        </motion.div>
      )}
    </section>
  );
}
