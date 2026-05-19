import { render } from '@react-email/render';
import { NextResponse } from 'next/server';
import * as React from 'react';
import NewsletterEmail, { type Theme } from '@/emails/NewsletterEmail';
import { newsletterSampleData as sampleData } from '@/lib/newsletter-sample';

export async function GET(request: Request) {
  const secret = process.env.INTERNAL_SECRET;
  const { searchParams } = new URL(request.url);
  if (!secret || searchParams.get('secret') !== secret) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const theme = (searchParams.get('theme') ?? 'light') as Theme;
  const html = await render(React.createElement(NewsletterEmail, { ...sampleData, theme }));
  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
