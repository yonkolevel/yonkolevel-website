import * as React from 'react';
import styles from './navlink.module.css';
import config from '../../../tailwind.config';
import Link from 'next/link';

enum Variant {
  blue,
  orange,
  yellow,
}

const arrowColor = {
  blue: '#F8FAFC',
  orange: '#F8FAFC',
  yellow: '#0C5DA8',
};

interface INavLinkProps {
  active?: boolean;
  arrowColor?: String;
}

const NavLink: React.FunctionComponent<INavLinkProps & any> = ({
  children,
  active,
  arrowColor = '#0C5DA8',
  href,
  color,
  ...props
}) => {
  return (
    <Link
      href={href}
      className={`${styles.navLink} white ${active ? 'active' : ''} font-pixel font-semibold`}
      {...props}
      style={{ color: color }}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='11'
        height='19'
        className={`${styles.navLinkArrow}`}
      ></svg>
      {children}
    </Link>
  );
};

export default NavLink;
