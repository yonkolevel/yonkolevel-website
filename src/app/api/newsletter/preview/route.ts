import { render } from '@react-email/render';
import { NextResponse } from 'next/server';
import * as React from 'react';
import NewsletterEmail, { type Theme } from '@/emails/NewsletterEmail';
import {
  collectNewsletterAssetWarnings,
  resolveNewsletterRenderInput,
  sampleNewsletterData,
} from '@/lib/newsletter/render';

function isAuthorized(request: Request) {
  const secret = process.env.INTERNAL_SECRET;
  if (!secret) return false;
  return request.headers.get('x-internal-secret') === secret;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  if (!isAuthorized(request)) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const theme = (url.searchParams.get('theme') ?? 'light') as Theme;
  const props = { ...sampleNewsletterData, theme };
  const html = await render(React.createElement(NewsletterEmail, props));
  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({})) as Record<string, unknown>;
  const renderInput = resolveNewsletterRenderInput(body);
  const html = await render(React.createElement(NewsletterEmail, renderInput.props));
  const assetWarnings = collectNewsletterAssetWarnings(renderInput.props);
  const responseFormat = body.responseFormat ?? body.format;

  if (responseFormat === 'html' || request.headers.get('accept')?.includes('text/html')) {
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
        'X-Newsletter-Asset-Warnings': String(assetWarnings.length),
      },
    });
  }

  return NextResponse.json({
    success: true,
    html,
    subject: renderInput.subject,
    previewText: renderInput.previewText,
    issueNumber: renderInput.props.issueNumber,
    issueDate: renderInput.props.issueDate,
    theme: renderInput.props.theme ?? 'light',
    usedProvidedProps: renderInput.usedProvidedProps,
    assetWarnings,
  }, {
    headers: { 'Cache-Control': 'no-store' },
  });
}
