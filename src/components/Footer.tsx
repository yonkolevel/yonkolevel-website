'use client';
import * as React from 'react';
import Container from './Container';
import NavLink from './NavLink/NavLink';
import { usePathname } from 'next/navigation';

interface IFooterProps {}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
  const pathname = usePathname();

  return (
    <footer className='bg-black border-t border-white/5'>
      <Container>
        <div className='flex flex-col md:flex-row items-center justify-between py-12 md:py-16 gap-8'>
          {/* Navigation */}
          <nav className='flex items-center gap-8'>
            <NavLink
              href='/about'
              active={pathname === '/about'}
              color={pathname === '/about' ? '#FF5C24' : '#F8FAFC'}
            >
              ABOUT
            </NavLink>
            <NavLink
              href='/contact'
              active={pathname === '/contact'}
              color={pathname === '/contact' ? '#FF5C24' : '#F8FAFC'}
            >
              CONTACT
            </NavLink>
          </nav>

          {/* Copyright */}
          <div className='text-white/60 font-pixel text-sm tracking-wider'>
            © {new Date().getFullYear()} - Yonko Level Ltd.
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
