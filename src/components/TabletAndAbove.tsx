import * as React from 'react';


interface ITabletAndAboveProps {}

const TabletAndAbove: React.FunctionComponent<ITabletAndAboveProps> = ({
  children,
  ...props
}) => {
  return (
    //  @ts-ignore
    <div className='hidden md:block' {...props}>
      {children}
    </div>
  );
};

export default TabletAndAbove;
