'use client';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import Column from './Columns';
import Container from './Container';

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const pathname = usePathname();

  return (
    <header className='relative z-50 bg-black/80 backdrop-blur-sm border-b border-white/5'>
      <Container>
        <div className='flex items-center justify-between py-6 md:py-8'>
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className='flex items-center'
          >
            <NextLink href='/' className='group'>
              <div className='flex items-center gap-2'>
                <img
                  src='/images/logo.svg'
                  className='w-[100px] md:w-[120px] transition-opacity group-hover:opacity-80'
                  alt='Yonko Level Logo'
                />
                {/* Optional: Add text logo variant for more impact */}
                {/* <span className='hidden md:block font-pixel text-white text-sm tracking-wider opacity-60 group-hover:opacity-100 transition-opacity'>
                  YONKO LEVEL
                </span> */}
              </div>
            </NextLink>
          </motion.div>

          {/* Navigation - Removed for now */}
        </div>
      </Container>
    </header>
  );
};

export default Header;
