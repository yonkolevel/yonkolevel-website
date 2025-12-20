import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: "Contact Us - Let's Work Together",
  description:
    "Get in touch with Yonko Level. Whether you need help building an app, improving your product, or just want to say hello, we'd love to hear from you.",
  keywords: [
    'contact',
    'hire developers',
    'hire designers',
    'app development',
    'product design',
  ],
  openGraph: {
    title: "Contact Yonko Level - Let's Work Together",
    description:
      "Get in touch with Yonko Level. We'd love to help you build something amazing.",
    url: 'https://yonkolevel.com/contact',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Yonko Level',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Yonko Level',
    description:
      "Get in touch with Yonko Level. We'd love to help you build something amazing.",
    images: ['/images/og-image.jpg'],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
