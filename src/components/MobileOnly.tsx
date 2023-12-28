import * as React from 'react';

interface IMobileOnlyProps {
  children: React.ReactNode;
}

const MobileOnly: React.FunctionComponent<IMobileOnlyProps> = ({
  children,
}) => {
  return <div className='block md:hidden'>{children}</div>;
};

export default MobileOnly;
