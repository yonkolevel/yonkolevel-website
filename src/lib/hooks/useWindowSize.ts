import { useEffect, useState } from 'react';

// Hook

const getSize = () => {
  const isClient = typeof window === 'object';
  return {
    width: isClient ? window.innerWidth : undefined,
    height: isClient ? window.innerHeight : undefined,
  };
};

function useWindowSize() {
  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    const isClient = typeof window === 'object';

    if (!isClient) {
      return;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

export default useWindowSize;
