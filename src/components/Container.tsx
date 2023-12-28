import React from 'react';

const Container: React.FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className='mx-auto max-w-[720px] px-[24px] md:px-[48px] sm:px-[24px]'>
      {children}
    </div>
  );
};

export default Container;
