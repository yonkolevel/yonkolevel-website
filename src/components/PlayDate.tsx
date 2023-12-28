/* eslint-disable @next/next/no-img-element */
import * as React from 'react';

interface IPlayDateProps {}

const PlayDate: React.FunctionComponent<IPlayDateProps> = (props) => {
  return (
    <div className='playdate relative w-[400px] md:w-[600px] overflow-hidden'>
      <img
        src='/images/play_date.webp'
        className='block'
        style={{ top: '15%' }}
        alt='Play Date'
      />

      <img
        src='/images/play_date_animation.gif'
        className='absolute block  w-[300px] md:w-[450px]'
        style={{
          top: 'calc(5%)',
          left: '25%',
          transform: 'translateX(-28%)',
        }}
        alt='Animated'
      />
    </div>
  );
};

export default PlayDate;
