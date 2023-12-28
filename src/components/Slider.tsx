import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

interface ItemMarker {
  itemId: string;
  isActive?: boolean;
  onClick?: () => void;
}

interface ISliderProps {
  itemMarkers: ItemMarker[];
}

const Slider: React.FunctionComponent<ISliderProps> = ({
  children,
  itemMarkers = [],
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(0);
  const [visibleItem, setVisibleItem] = useState(0);

  useEffect(() => {
    const handleScroll = (event: any) => {
      if (event.target.scrollLeft >= (visibleItem + 1) * itemWidth) {
        if (visibleItem + 1 > itemMarkers.length) {
          setVisibleItem(visibleItem);
        } else {
          setVisibleItem(visibleItem + 1);
        }

        return;
      }

      if (event.target.scrollLeft <= (visibleItem + 1) * itemWidth) {
        if (visibleItem - 1 < 0) {
          setVisibleItem(visibleItem);
        } else {
          setVisibleItem(visibleItem - 1);
        }

        return;
      }
    };

    scrollContainerRef.current?.addEventListener('scroll', handleScroll);

    return () => {
      scrollContainerRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, [scrollContainerRef.current, itemWidth, visibleItem]);

  useEffect(() => {
    const firstChild = scrollContainerRef.current?.children[0];

    if (!firstChild) return;

    setItemWidth(firstChild.clientWidth);
  }, [scrollContainerRef]);

  return (
    <>
      <div
        ref={scrollContainerRef}
        className='overflow-x-scroll flex no-scrollbar'
        style={{
          scrollSnapType: 'x mandatory',
          cursor: 'grab',
          scrollPadding: '50%',
        }}
      >
        {children}
        <div className='pr-6'></div>
      </div>
      <div className='flex justify-center mt-8'>
        <div className='flex justify-between items-center'>
          {itemMarkers.map((m, index) => (
            <div
              key={m.itemId}
              className={`w-5 h-5 rounded-sm ${
                visibleItem === index
                  ? 'border-4 border-blue-600 transform scale-100'
                  : 'border-4 border-blue-600 transform scale-75 opacity-50'
              }`}
              onClick={m.onClick}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Slider;
