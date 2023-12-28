import * as React from 'react';

interface ITabletAndBelowProps extends React.HTMLAttributes<HTMLDivElement> {}

const TabletAndBelow: React.FunctionComponent<ITabletAndBelowProps> = ({
  children,
  ...props
}) => {
  return (
    <div className='block lg:hidden' {...props}>
      {children}
    </div>
  );
};

export default TabletAndBelow;
