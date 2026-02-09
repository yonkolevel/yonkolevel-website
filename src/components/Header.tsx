'use client';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { useState } from 'react';
import Container from './Container';
import MenuButton from './MenuButton';
import MobileOnly from './MobileOnly';
import NavLink from './NavLink/NavLink';
import TabletAndAbove from './TabletAndAbove';
import { usePostHog } from 'posthog-js/react';

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
    href: '/shop',
    label: 'SHOP',
    mobileLabel: 'SHOP',
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
const MENU_TRANSITION = {
  duration: 0.5,
  ease: [0.4, 0, 0.2, 1] as const,
};
const FULL_VIEWPORT_STYLE = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100vw',
  height: '100vh',
};

const variants = {
  open: {
    opacity: 1,
    y: 0,
    zIndex: 9999,
    left: 0,
    right: 0,
    transition: MENU_TRANSITION,
  },
  closed: {
    opacity: 0,
    y: '-100%',
    zIndex: -1,
    transition: MENU_TRANSITION,
  },
};

interface IHeaderProps {}

interface MenuListProps {
  onItemClick?: () => void;
  isMobile?: boolean;
}

const MenuList: React.FunctionComponent<MenuListProps> = ({
  onItemClick,
  isMobile = false,
}) => {
  const pathname = usePathname();
  const posthog = usePostHog();

  const handleClick = (productLabel: string, productHref: string) => {
    posthog?.capture('navigation_link_clicked', {
      label: productLabel,
      href: productHref,
      device: isMobile ? 'mobile' : 'desktop',
    });
    onItemClick?.();
  };

  return (
    <ul className='space-y-6'>
      {PRODUCTS.map((product) => {
        const isActive = pathname === product.href;
        return (
          <li
            key={product.href}
            onClick={() => handleClick(product.label, product.href)}
          >
            <NavLink
              href={product.href}
              active={isActive}
              color={isActive ? ACTIVE_COLOR : INACTIVE_COLOR}
              arrowColor={ACTIVE_COLOR}
            >
              {isMobile ? product.mobileLabel : product.label}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const posthog = usePostHog();

  const handleToggleMenu = React.useCallback(() => {
    setMenuOpen((v) => {
      const newValue = !v;
      posthog?.capture('mobile_menu_toggled', {
        action: newValue ? 'opened' : 'closed',
      });
      return newValue;
    });
  }, [posthog]);

  const handleLogoClick = () => {
    posthog?.capture('logo_clicked', {
      from_page: pathname,
    });
  };

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
            <NextLink href='/' className='group' onClick={handleLogoClick}>
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
              <div className='flex items-center gap-6 md:gap-8'>
                {PRODUCTS.map((product, index) => {
                  const isActive = pathname === product.href;
                  return (
                    <motion.div
                      key={product.href}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
                      onClick={() => {
                        posthog?.capture('navigation_link_clicked', {
                          label: product.label,
                          href: product.href,
                          device: 'desktop',
                        });
                      }}
                    >
                      <NavLink
                        active={isActive}
                        href={product.href}
                        color={isActive ? ACTIVE_COLOR : INACTIVE_COLOR}
                      >
                        {product.label}
                      </NavLink>
                    </motion.div>
                  );
                })}
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
            </MobileOnly>
          </nav>
        </div>
      </Container>
      {/* Mobile Menu Backdrop and Menu - Outside container for proper positioning */}
      <MobileOnly>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: menuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed inset-0 bg-black/40 backdrop-blur-sm ${
            menuOpen
              ? 'z-[9998] pointer-events-auto'
              : 'z-[-1] pointer-events-none'
          }`}
          onClick={handleToggleMenu}
          style={FULL_VIEWPORT_STYLE}
        />
        {/* Menu */}
        <motion.div
          initial='closed'
          animate={menuOpen ? 'open' : 'closed'}
          variants={variants}
          className={`fixed bg-black/95 text-white ${
            menuOpen
              ? 'z-[9999] pointer-events-auto'
              : 'z-[-1] pointer-events-none'
          }`}
          style={FULL_VIEWPORT_STYLE}
        >
          <div className='flex flex-col h-full pt-24 pb-16 px-6 relative'>
            {/* Close button in menu */}
            <div className='absolute top-6 right-6 z-10'>
              <MenuButton onClick={handleToggleMenu} isOpen={menuOpen} />
            </div>
            <div className='flex-1 flex flex-col justify-center items-center'>
              <MenuList onItemClick={handleToggleMenu} isMobile />
            </div>
          </div>
        </motion.div>
      </MobileOnly>
    </header>
  );
};

export default Header;
