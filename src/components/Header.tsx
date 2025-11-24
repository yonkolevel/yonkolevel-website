'use client';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { useState } from 'react';
import useWindowSize from '../lib/hooks/useWindowSize';
import Column from './Columns';
import Container from './Container';
import MenuButton from './MenuButton';
import MobileOnly from './MobileOnly';
import NavLink from './NavLink/NavLink';
import Row from './Row';
import TabletAndAbove from './TabletAndAbove';

const variants = {
  open: { opacity: 1, y: 0, zIndex: 999, left: 0, right: 0 },
  closed: { opacity: 0, y: '-100%', zIndex: -1 },
};

interface IHeaderProps {}

const MenuList = () => {
  return (
    <ul className='space-y-6'>
      <li>
        <NavLink href='/about' color='#F8FAFC' arrowColor='#FF5C24'>
          About
        </NavLink>
      </li>
      <li>
        <NavLink href='/contact' color='#F8FAFC' arrowColor='#FF5C24'>
          Contact us
        </NavLink>
      </li>
    </ul>
  );
};

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { width } = useWindowSize();
  const isProductPage = pathname.includes('/products/midi-scout');

  const handleToggleMenu = React.useCallback(() => {
    setMenuOpen((v) => !v);
  }, []);

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

          {/* Navigation */}
          <nav className='relative flex items-center'>
            <TabletAndAbove>
              <div className='flex items-center gap-8'>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <NavLink
                    active={pathname === '/about'}
                    href='/about'
                    color={pathname === '/about' ? '#FF5C24' : '#F8FAFC'}
                  >
                    ABOUT
                  </NavLink>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <NavLink
                    href='/contact'
                    active={pathname === '/contact'}
                    color={pathname === '/contact' ? '#FF5C24' : '#F8FAFC'}
                  >
                    CONTACT
                  </NavLink>
                </motion.div>
              </div>
            </TabletAndAbove>
            <MobileOnly>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <MenuButton onClick={handleToggleMenu} isOpen={menuOpen} />
              </motion.div>
              <motion.div
                initial='closed'
                animate={menuOpen ? 'open' : 'closed'}
                variants={variants}
                className='fixed left-0 right-0 top-0 bottom-0 p-12 bg-black/95 backdrop-blur-md text-white'
              >
                <div className='flex flex-col h-full justify-center items-center'>
                  <MenuList />
                </div>
              </motion.div>
            </MobileOnly>
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Header;
