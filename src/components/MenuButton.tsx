import * as React from 'react';
import Close from './icons/Close';
import Menu from './icons/Menu';

interface IMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen?: boolean;
}

const MenuButton: React.FunctionComponent<IMenuButtonProps> = ({
  isOpen,
  className = '',
  ...props
}) => {
  return (
    <button
      type='button'
      {...props}
      className={`${
        isOpen
          ? 'bg-orange text-black hover:bg-white'
          : 'text-white hover:text-orange'
      } transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-4 focus-visible:ring-offset-black ${className}`}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
      {!isOpen && <Menu />}
      {isOpen && <Close />}
    </button>
  );
};

export default MenuButton;
