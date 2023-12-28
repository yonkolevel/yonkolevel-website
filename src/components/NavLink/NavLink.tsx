import * as React from 'react';
import styles from './navlink.module.css'
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
  arrowColor?: String
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
      className={`${styles.navLink} white ${active ? 'active' : ''}`}
      {...props}
      style={{color: color}}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='11'
        height='19'
        className={`${styles.navLinkArrow}`}
      >
        <path
          d='M 2.75 0 L 0 0 L 0 19 L 2.75 19 L 2.75 16.286 L 5.5 16.286 L 5.5 13.571 L 8.25 13.571 L 8.25 10.857 L 11 10.857 L 11 8.143 L 8.25 8.143 L 8.25 5.429 L 5.5 5.429 L 5.5 2.714 L 2.75 2.714 Z'
          fill={arrowColor}
        ></path>
      </svg>
      {children}
    </Link>
  );
};

export default NavLink;
