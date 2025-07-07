'use client';
import { motion } from 'framer-motion';

interface ProductAppIconProps {
  appIcon: string;
  appIconAlt: string;
  className?: string;
}

const ProductAppIcon: React.FC<ProductAppIconProps> = ({
  appIcon,
  appIconAlt,
  className = '',
}) => {
  return (
    <div className={`relative z-30 flex justify-center ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.3,
          ease: 'backOut',
        }}
        className='relative -top-24 -mb-24'
      >
        <img
          width={200}
          height={200}
          src={appIcon}
          alt={appIconAlt}
          className='rounded-3xl shadow-2xl'
        />
      </motion.div>
    </div>
  );
};

export default ProductAppIcon;
