/* eslint-disable @next/next/no-img-element */
import { Metadata } from 'next';
import MidiCircuitClient from './MidiCircuitClient';

export const metadata: Metadata = {
  title: 'MidiCircuit - Learn, Create, Share',
  description:
    'A simple and approachable DAW for creating and sharing music. No experience needed. Available on iOS, iPad and macOS.',
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
      'A simple and approachable DAW for creating and sharing music. No experience needed.',
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
      'A simple and approachable DAW. Create beats, share songs — no experience needed.',
    images: ['/products/midicircuit/cover-photo-full-pixelated.jpg'],
  },
};

export default function Page() {
  return <MidiCircuitClient />;
}
