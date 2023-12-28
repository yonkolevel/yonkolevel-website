import React, { ReactNode } from 'react';

interface RowProps {
  children: ReactNode;
  flexWrap?: 'wrap' | 'nowrap';
}

const Row: React.FC<RowProps> = ({ children, flexWrap = 'wrap' }) => {
  return (
    <div
      className={`flex ${
        flexWrap === 'wrap' ? 'flex-wrap' : 'flex-nowrap'
      } -mr-2.5 -ml-2.5 sm:-mr-2.5 sm:-ml-2.5`}
    >
      {children}
    </div>
  );
};

export default Row;
