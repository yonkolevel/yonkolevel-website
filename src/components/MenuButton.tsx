import * as React from 'react';
import Close from './icons/Close';
import Menu from './icons/Menu';
import Button from './Button';

interface IMenuButtonProps {
  isOpen?: boolean;
  onClick?: () => void;
}

const MenuButton: React.FunctionComponent<IMenuButtonProps> = ({
  isOpen,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className='text-white hover:text-[#FF5C24] transition-colors'
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
      {!isOpen && <Menu />}
      {/* @ts-ignore */}
      {isOpen && <Close style={{ background: '#FF5C24' }} />}
    </button>
  );
};

export default MenuButton;
