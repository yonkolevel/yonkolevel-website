'use client';
import { motion, MotionConfig } from 'framer-motion';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { useState } from 'react';
import Container from './Container';
import DesktopOnly from './DesktopOnly';
import MenuButton from './MenuButton';
import NavLink from './NavLink/NavLink';
import TabletAndBelow from './TabletAndBelow';
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
    href: '/studio',
    label: 'STUDIO',
    mobileLabel: 'STUDIO',
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
  height: '100dvh',
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
    <nav aria-label='Mobile navigation'>
      <ul className='space-y-6'>
        {PRODUCTS.map((product) => {
          const isActive = pathname === product.href;
          return (
            <li key={product.href}>
              <NavLink
                href={product.href}
                active={isActive}
                color={isActive ? ACTIVE_COLOR : INACTIVE_COLOR}
                arrowColor={ACTIVE_COLOR}
                onClick={() => handleClick(product.label, product.href)}
              >
                {isMobile ? product.mobileLabel : product.label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
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

  React.useEffect(() => {
    if (!menuOpen) return;

    const menu = menuRef.current;
    const previousFocus =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    const background = document.querySelectorAll<HTMLElement>('main, footer');
    const focusable = Array.from(
      menu?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []
    );

    focusable[0]?.focus();
    document.body.style.overflow = 'hidden';
    background.forEach((element) => {
      element.inert = true;
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handleToggleMenu();
        return;
      }

      if (event.key !== 'Tab' || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      background.forEach((element) => {
        element.inert = false;
      });
      previousFocus?.focus();
    };
  }, [handleToggleMenu, menuOpen]);

  React.useEffect(() => {
    if (!menuOpen) return;

    const desktop = window.matchMedia('(min-width: 1025px)');
    const closeAtDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) handleToggleMenu();
    };

    desktop.addEventListener('change', closeAtDesktop);

    return () => desktop.removeEventListener('change', closeAtDesktop);
  }, [handleToggleMenu, menuOpen]);

  const handleLogoClick = () => {
    posthog?.capture('logo_clicked', {
      from_page: pathname,
    });
  };

  return (
    <MotionConfig reducedMotion='user'>
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
            <NextLink
              href='/'
              className='group rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-4 focus-visible:ring-offset-black'
              onClick={handleLogoClick}
            >
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
          <nav className='relative flex items-center' aria-label='Primary navigation'>
            <DesktopOnly>
              <div className='flex items-center gap-6 md:gap-8'>
                {PRODUCTS.map((product, index) => {
                  const isActive = pathname === product.href;
                  return (
                    <motion.div
                      key={product.href}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
                    >
                      <NavLink
                        active={isActive}
                        href={product.href}
                        color={isActive ? ACTIVE_COLOR : INACTIVE_COLOR}
                        onClick={() => {
                          posthog?.capture('navigation_link_clicked', {
                            label: product.label,
                            href: product.href,
                            device: 'desktop',
                          });
                        }}
                      >
                        {product.label}
                      </NavLink>
                    </motion.div>
                  );
                })}
              </div>
            </DesktopOnly>
            <TabletAndBelow>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <MenuButton
                  onClick={handleToggleMenu}
                  isOpen={false}
                  aria-controls='mobile-navigation'
                  aria-expanded={menuOpen}
                  tabIndex={menuOpen ? -1 : undefined}
                />
              </motion.div>
            </TabletAndBelow>
          </nav>
        </div>
      </Container>
      {/* Mobile Menu Backdrop and Menu - Outside container for proper positioning */}
      <TabletAndBelow>
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
          ref={menuRef}
          initial='closed'
          animate={menuOpen ? 'open' : 'closed'}
          variants={variants}
          id='mobile-navigation'
          role='dialog'
          aria-label='Site navigation'
          aria-modal='true'
          aria-hidden={!menuOpen}
          inert={!menuOpen}
          className={`fixed overflow-y-auto overscroll-contain bg-black/95 text-white ${
            menuOpen
              ? 'z-[9999] pointer-events-auto'
              : 'z-[-1] pointer-events-none'
          }`}
          style={FULL_VIEWPORT_STYLE}
        >
          <div className='relative flex min-h-[max(100%,320px)] flex-col px-6 pb-16 pt-24'>
            {/* Close button in menu */}
            <div className='absolute top-6 right-6 z-10'>
              <MenuButton
                onClick={handleToggleMenu}
                isOpen={menuOpen}
                aria-controls='mobile-navigation'
                aria-expanded={menuOpen}
              />
            </div>
            <div className='flex-1 flex flex-col justify-center items-center'>
              <MenuList onItemClick={handleToggleMenu} isMobile />
            </div>
          </div>
        </motion.div>
      </TabletAndBelow>
      </header>
    </MotionConfig>
  );
};

export default Header;
