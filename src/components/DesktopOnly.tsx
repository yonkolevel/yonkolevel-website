import * as React from 'react';

interface IDesktopOnlyProps extends React.HTMLAttributes<HTMLDivElement> {}

const DesktopOnly: React.FunctionComponent<IDesktopOnlyProps> = ({
  children,
  ...props
}) => {
  return (
    <div className='hidden lg:block' {...props}>
      {children}
    </div>
  );
};

export default DesktopOnly;
