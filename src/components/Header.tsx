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
      <ul>
        <li>
          <NavLink href='/about' color='#F8FAFC' arrowColor='#F8FAFC'>
            About
          </NavLink>
        </li>
        {/* <li>
          <NavLink href='/blog' color='white'>
            Blog
          </NavLink>
        </li> */}
        <li>
          <NavLink href='/contact-us' color='#F8FAFC' arrowColor='#F8FAFC'>
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

  const handleToggleMenu = React.useCallback(() => {
    setMenuOpen((v) => !v);
  }, []);
  return (
    <header className='navbar bg-white mb-12'>
      <div className='flex flex-column flex-1'>
        <NextLink href='/' passHref>
          <img src='/images/logo.svg' className='w-[100px]' />
        </NextLink>
      </div>
      <div className='flex-none flex-column'>
        <nav className='relative flex align-center'>
          <TabletAndAbove>
            <div className='flex'>
              <NavLink active={pathname === '/about'} href='/about-us'>
                <NextLink href='/about'>About</NextLink>
              </NavLink>

              {/* <NavLink href='/blog' active={pathname === '/blog'}>
                Blog
              </NavLink> */}

              {/* <NavLink href='/case-studies' active={pathname === '/case-studies'}>
                Case Studies
              </NavLink> */}

              <NavLink href='/contact' active={pathname === '/contact'}>
                Contact
              </NavLink>
            </div>
          </TabletAndAbove>
          <MobileOnly>
            <MenuButton onClick={handleToggleMenu} isOpen={menuOpen} />
            <motion.div
              initial='closed'
              animate={menuOpen ? 'open' : 'closed'}
              variants={variants}
              className='fixed left-0 right-0 p-32 bg-blue2 text-white'
            >
              <MenuList />
            </motion.div>
          </MobileOnly>
        </nav>
      </div>
    </header>
  );
};

export default Header;
