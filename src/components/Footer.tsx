'use client';
import * as React from 'react';
import Container from './Container';
import NavLink from './NavLink/NavLink';
import { usePathname } from 'next/navigation';

// Product navigation configuration
const PRODUCTS = [
  {
    href: '/products/invisible-camera',
    label: 'INVISIBLE CAMERA',
    mobileLabel: 'INVISIBLE CAMERA',
  },
  {
    href: '/products/midicircuit',
    label: 'MIDICIRCUIT',
    mobileLabel: 'MIDICIRCUIT',
  },
  {
    href: '/products/midi-scout',
    label: 'MIDI SCOUT',
    mobileLabel: 'MIDI SCOUT',
  },
  {
    href: '/blog',
    label: 'BLOG',
    mobileLabel: 'BLOG',
  },
] as const;

// Shared constants
const ACTIVE_COLOR = '#FF5C24';
const INACTIVE_COLOR = '#F8FAFC';

interface IFooterProps {}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
  const pathname = usePathname();

  return (
    <footer className='bg-black border-t border-white/5'>
      <Container>
        <div className='flex flex-col md:flex-row items-center justify-between py-12 md:py-16 gap-8'>
          {/* Navigation */}
          <nav className='flex items-center gap-6 md:gap-8 flex-wrap justify-center'>
            {PRODUCTS.map((product) => {
              const isActive = pathname === product.href;
              return (
                <NavLink
                  key={product.href}
                  href={product.href}
                  active={isActive}
                  color={isActive ? ACTIVE_COLOR : INACTIVE_COLOR}
                >
                  {product.label}
                </NavLink>
              );
            })}
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
