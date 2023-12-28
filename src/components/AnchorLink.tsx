import Link from 'next/link';
import * as React from 'react';

interface IAnchorLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

const AnchorLink: React.FunctionComponent<IAnchorLinkProps> = ({
  children,
  href,
  ...props
}) => {
  return (
    <Link href={href as string} {...props} className='relative'>
        {children}
    </Link>
  );
};

export default AnchorLink;
