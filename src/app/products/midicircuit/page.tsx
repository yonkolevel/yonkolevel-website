/* eslint-disable @next/next/no-img-element */
import { Metadata } from 'next';
import MidiCircuitClient from './MidiCircuitClient';

export const metadata: Metadata = {
  title: 'MidiCircuit - Learn, Create, Share',
  description:
    'Experience the future of music creation with our innovative MIDI circuit builder. Design, connect, and play with virtual circuits that respond to your creativity in real-time. Learn music production through engaging lessons and challenges.',
  keywords: [
    'music app',
    'MIDI',
    'music production',
    'DAW',
    'music learning',
    'circuit builder',
    'music education',
    'iOS music',
    'macOS music',
  ],
  openGraph: {
    title: 'MidiCircuit - Learn, Create, Share',
    description:
      'Experience the future of music creation. Learn music production through engaging lessons and challenges, then create your own music in Playgrounds.',
    url: 'https://yonkolevel.com/products/midicircuit',
    type: 'website',
    images: [
      {
        url: '/products/midicircuit/cover-photo-full-pixelated.jpg',
        width: 1200,
        height: 630,
        alt: 'MidiCircuit app preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MidiCircuit - Learn, Create, Share',
    description:
      'Experience the future of music creation. Learn music production through engaging lessons and challenges.',
    images: ['/products/midicircuit/cover-photo-full-pixelated.jpg'],
  },
};

export default function Page() {
  return <MidiCircuitClient />;
}
