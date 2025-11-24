import React from 'react';

const Container: React.FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className='mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12'>
      {children}
    </div>
  );
};

export default Container;
