'use client';
import React from 'react';

interface PhoneMockupProps {
  appScreenshot: string;
  appName: string;
  className?: string;
}

const PhoneMockup: React.FC<PhoneMockupProps> = ({
  appScreenshot,
  appName,
  className = '',
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* iPhone frame */}
      <div className='relative w-80 h-[650px] bg-black rounded-[3rem] p-3'>
        {/* Screen */}
        <div className='relative w-full h-full bg-gray-900 rounded-[2.5rem] overflow-hidden'>
          {/* Status bar */}
          <div className='absolute top-0 left-0 right-0 h-12 bg-black z-10 flex items-center justify-between px-6'>
            <div className='text-white text-sm font-medium'>14:20</div>
            <div className='flex items-center space-x-1'>
              <div className='w-4 h-2 bg-white rounded-full opacity-60'></div>
              <div className='w-4 h-2 bg-white rounded-full opacity-60'></div>
              <div className='w-6 h-3 bg-white rounded-sm opacity-60'></div>
            </div>
          </div>

          {/* App screenshot */}
          <img
            src={appScreenshot}
            alt={`${appName} app screenshot`}
            className='w-full h-full object-cover'
          />

          {/* Home indicator */}
          <div className='absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full opacity-60'></div>
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;
