/* eslint-disable @next/next/no-img-element */
import { Metadata } from 'next';
import InvisibleCameraClient from './InvisibleCameraClient';

export const metadata: Metadata = {
  title: 'Invisible Camera - For Moments, Not Menus',
  description: "A super simple, easy-to-use mobile camera app that lets you capture moments instantly. With a clean, clutter-free design, it opens fast and takes great photos without any fuss. Just tap and shoot—it's that delightful.",
  keywords: ['camera app', 'simple camera', 'iOS camera', 'instant photography', 'mobile camera', 'privacy camera'],
  openGraph: {
    title: 'Invisible Camera - For Moments, Not Menus',
    description: "A super simple, easy-to-use mobile camera app that lets you capture moments instantly. Just tap and shoot—it's that delightful.",
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
    description: "A super simple, easy-to-use mobile camera app. Just tap and shoot—it's that delightful.",
    images: ['/products/invisible-camera/cover-photo-full.jpeg'],
  },
};

export default function Page() {
  return <InvisibleCameraClient />;
}
