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
    <button onClick={onClick}>
      {!isOpen && <Menu />}
      {/* @ts-ignore */}
      {isOpen && <Close style={{ background: '#0C5DA8' }} />}
    </button>
  );
};

export default MenuButton;
