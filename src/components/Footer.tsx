'use client';
import * as React from 'react';
import Container from './Container';

interface IFooterProps {}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
  return (
    <footer className='bg-black border-t border-white/5'>
      <Container>
        <div className='flex flex-col md:flex-row items-center justify-center py-12 md:py-16 gap-8'>
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
