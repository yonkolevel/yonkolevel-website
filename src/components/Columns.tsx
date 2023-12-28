import React, { ReactNode } from 'react';

interface ColumnProps {
  children: ReactNode;
  flexDirection?: 'column' | 'row';
}

const Column: React.FC<ColumnProps> = ({
  children,
  flexDirection = 'column',
}) => {
  return <div className={`flex flex-${flexDirection} p-2.5`}>{children}</div>;
};

export default Column;
