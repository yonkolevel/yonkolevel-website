'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SuccessBannerProps {
  productName?: string;
}

export default function SuccessBanner({ productName }: SuccessBannerProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className='bg-green-500/10 border border-green-500/20 rounded-2xl p-6 mb-8 flex items-center justify-between'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <h3 className='font-pixel text-green-400 text-lg mb-1'>
              Thank you for your purchase!
            </h3>
            <p className='text-white/60 text-sm'>
              {productName
                ? `Your order for ${productName} has been confirmed. Check your email for details.`
                : 'Your order has been confirmed. Check your email for details.'}
            </p>
          </div>
          <button
            onClick={() => setVisible(false)}
            className='text-white/40 hover:text-white/70 transition-colors ml-4 shrink-0'
            aria-label='Dismiss'
          >
            <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
              <line x1='18' y1='6' x2='6' y2='18' />
              <line x1='6' y1='6' x2='18' y2='18' />
            </svg>
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
