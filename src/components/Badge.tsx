import * as React from 'react';
import config from '../../tailwind.config';


interface IBadgeProps {
  children: React.ReactNode;
}

const Badge: React.FunctionComponent<IBadgeProps> = ({ children }) => {

  return (
    <div
      style={{
        color: config.colors.blue2,
        border: `1px solid ${config.colors.blue2}`,
        padding: 2,
      }}
    >
      <span >{children}</span>
    </div>
  );
};

export default Badge;
