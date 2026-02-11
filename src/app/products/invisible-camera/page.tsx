/* eslint-disable @next/next/no-img-element */
import { Metadata } from 'next';
import InvisibleCameraClient from './InvisibleCameraClient';

export const metadata: Metadata = {
  title: 'Invisible Camera - For Moments, Not Menus',
  description: "Bypass Apple's Deep Fusion and Smart HDR for authentic, film-like iPhone photos. Real-time preview, curated film looks, and privacy-first design.",
  keywords: ['camera app', 'simple camera', 'iOS camera', 'instant photography', 'mobile camera', 'privacy camera'],
  openGraph: {
    title: 'Invisible Camera - For Moments, Not Menus',
    description: "Bypass Deep Fusion and Smart HDR for authentic, film-like iPhone photos. What you see is what you get.",
    url: 'https://yonkolevel.com/products/invisible-camera',
    type: 'website',
    images: [
      {
        url: '/products/invisible-camera/cover-photo-full.jpeg',
        width: 1200,
        height: 630,
        alt: 'Invisible Camera app preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Invisible Camera - For Moments, Not Menus',
    description: "Bypass Deep Fusion and Smart HDR for authentic, film-like iPhone photos. What you see is what you get.",
    images: ['/products/invisible-camera/cover-photo-full.jpeg'],
  },
};

export default function Page() {
  return <InvisibleCameraClient />;
}
