/* eslint-disable @next/next/no-img-element */
'use client';
import * as React from 'react';
import Button from './Button';
import Column from './Columns';
import Container from './Container';
import NextLink from './NextLink';
import Row from './Row';
import FooterPixelTop from './shapes/FooterPixelTop';
import NavLink from './NavLink/NavLink';
import { usePathname } from 'next/navigation';

interface IFooterProps {}

const styles = {
  footer: 'py-6 min-h-[220px] h-[220px] bg-blue2',
};

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
  const pathname = usePathname();
  const isProductPage = pathname.includes('/products');

  return (
    <>
      <section className='bg-black py-24 relative'>
        <footer className='footer footer-center p-10 bg-black text-blue5 rounded'>
          <nav className='grid grid-flow-col gap-4 relative z-10'>
            <NavLink href='/about' className='link link-hover'>
              About us
            </NavLink>
            <NavLink href='/contact' className='link link-hover'>
              Contact
            </NavLink>
          </nav>
          <aside>
            <p>© {new Date().getFullYear()} - Yonko Level Ltd.</p>
          </aside>
        </footer>
      </section>
    </>
  );
};

export default Footer;
