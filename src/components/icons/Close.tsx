import * as React from 'react';

interface ICloseProps extends React.SVGProps<SVGSVGElement> {}

const Close: React.FunctionComponent<ICloseProps> = (props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='36'
      height='36'
      fill='none'
      viewBox='0 0 36 36'
      {...props}
    >
      <path
        stroke='#F8FAFC'
        strokeLinecap='square'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M25.875 25.875l-15.75-15.75M25.875 10.125l-15.75 15.75'
      ></path>
    </svg>
  );
};

export default Close;
