'use client';
import { useEffect, useRef } from 'react';

interface PixelatedImageProps {
  src: string;
  alt: string;
  pixelSize?: number;
  legoSize?: number;
  maxWidth?: number;
  maxHeight?: number;
  legoEffect?: boolean;
  className?: string;
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'image-pixelated': {
        ref?: React.Ref<HTMLElement>;
        src: string;
        'pixel-size'?: string;
        'lego-size'?: string;
        'max-width'?: string;
        'max-height'?: string;
        'lego-effect'?: string;
        class?: string;
        style?: React.CSSProperties;
      };
    }
  }
}

const PixelatedImage: React.FC<PixelatedImageProps> = ({
  src,
  alt,
  pixelSize = 20,
  legoSize = 20,
  maxWidth = 1000,
  maxHeight = 1000,
  legoEffect = false,
  className = '',
}) => {
  const componentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Load the web component via script tag
    const existingScript = document.querySelector('script[src*="pixelate"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/image-pixelate@2.0.0/js/pixelate.js';
      script.onload = () => console.log('Pixelate component loaded');
      script.onerror = () => console.error('Failed to load pixelate component');
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    // Set aria-label for accessibility and style the component
    if (componentRef.current) {
      componentRef.current.setAttribute(
        'aria-label',
        `Pixelated version of ${alt}`
      );

      // Style the web component container
      const element = componentRef.current as HTMLElement;
      element.style.width = '100%';
      element.style.height = '100%';
      element.style.display = 'block';
      element.style.position = 'relative';
    }
  }, [alt]);

  useEffect(() => {
    // Monitor for canvas creation and apply styles
    const styleCanvas = (canvas: HTMLCanvasElement) => {
      canvas.style.width = '1440px';
      canvas.style.height = '640px';
      canvas.style.objectFit = 'cover';
      canvas.style.display = 'block';
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.minWidth = '100%';
      canvas.style.minHeight = '100%';
    };

    const observer = new MutationObserver(() => {
      if (componentRef.current) {
        const canvas = componentRef.current.querySelector(
          'canvas'
        ) as HTMLCanvasElement;
        if (canvas) {
          styleCanvas(canvas);
        }
      }
    });

    if (componentRef.current) {
      observer.observe(componentRef.current, {
        childList: true,
        subtree: true,
      });

      // Also check immediately in case canvas already exists
      const canvas = componentRef.current.querySelector(
        'canvas'
      ) as HTMLCanvasElement;
      if (canvas) {
        styleCanvas(canvas);
      }
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`w-full h-full relative ${className}`}>
      <image-pixelated
        ref={componentRef}
        src={src}
        pixel-size={pixelSize.toString()}
        lego-size={legoSize.toString()}
        lego-effect={legoEffect.toString()}
        class='w-full h-full block'
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </div>
  );
};

export default PixelatedImage;
