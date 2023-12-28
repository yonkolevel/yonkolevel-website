import * as React from 'react';

interface IMenuProps {}

const Menu: React.FunctionComponent<IMenuProps> = (props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='36'
      height='36'
      fill='none'
      viewBox='0 0 36 36'
    >
      <path
        stroke='#0C5DA8'
        strokeLinecap='square'
        strokeMiterlimit='10'
        strokeWidth='2'
        d='M6.188 10.688h23.625M6.188 18h23.625M6.188 25.313h23.625'
      ></path>
    </svg>
  );
};

export default Menu;
