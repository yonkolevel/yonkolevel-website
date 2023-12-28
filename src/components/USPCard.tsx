import * as React from 'react';
import NavLink from './NavLink/NavLink';

enum Variant {
  blue,
  orange,
  yellow,
}

interface IUSPCardProps {
  title: string;
  description: string;
  variant: keyof typeof Variant;
  backgroundImage?: string;
}

const styles = {
  container: {
    blue: 'bg-blue2 text-white',
    yellow: 'bg-originalYellow text-blue2',
    orange: 'bg-orange text-white',
  },

  description: {
    blue: 'text-white',
    yellow: 'text-blue2',
    orange: 'text-white',
  },
  title: {
    blue: 'text-white',
    yellow: 'text-blue2',
    orange: 'text-white',

    linkArrowColor: {
      blue: '#F8FAFC',
      orange: '#F8FAFC',
      yellow: '#0C5DA8',
    },
  },
};

const USPCard: React.FunctionComponent<IUSPCardProps> = ({
  title,
  description,
  backgroundImage,
  variant = 'blue',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center relative rounded-lg grow h-[308px] md:h-[100%] ${styles.container[variant]}`}
    >
      {backgroundImage && (
        <div className='absolute bottom-0 right-0 z-0'>
          <img
            src={backgroundImage}
            className='block w-[100px] md:w-[270px]'
            alt='Background'
          />
        </div>
      )}
      <div className='absolute top-0 left-0 right-0 bottom-0 z-10 p-[24px]'>
        {/* <NavLink arrowColor={styles.title.linkArrowColor[variant]}> */}
          <h3 className='text-2xl mb-2 font-pixel text-secondary-focus'>
            {title}
          </h3>
        {/* </NavLink> */}
        <span className={`mb-2 ${styles.description[variant]}`}>
          {description}
        </span>
      </div>
    </div>
  );
};

export default USPCard;
