import { createHash } from 'node:crypto';
import { render } from '@react-email/render';
import { NextResponse } from 'next/server';
import * as React from 'react';
import { Resend } from 'resend';
import NewsletterEmail, { type NewsletterEmailProps } from '@/emails/NewsletterEmail';
import {
  collectNewsletterAssetWarnings,
  resolveNewsletterRenderInput,
} from '@/lib/newsletter/render';

function testKey(to: string, subject: string, props: NewsletterEmailProps) {
  const digest = createHash('sha256')
    .update(JSON.stringify({ to, subject, issueNumber: props.issueNumber, issueDate: props.issueDate }))
    .digest('hex')
    .slice(0, 24);
  return `newsletter-test/${digest}`;
}

export async function POST(request: Request) {
  const secret = process.env.INTERNAL_SECRET;
  if (!secret || request.headers.get('x-internal-secret') !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'RESEND_API_KEY is not configured' }, { status: 500 });
  }

  const body = await request.json().catch(() => ({})) as Record<string, unknown>;
  if (Array.isArray(body.to)) {
    return NextResponse.json({ error: 'Test sends accept exactly one recipient string, not an audience or recipient array.' }, { status: 400 });
  }

  const to = typeof body.to === 'string' ? body.to : 'ricardo@yonkolevel.com';
  const renderInput = resolveNewsletterRenderInput(body);
  const assetWarnings = collectNewsletterAssetWarnings(renderInput.props);
  const html = await render(React.createElement(NewsletterEmail, renderInput.props));
  const from = process.env.NEWSLETTER_FROM_EMAIL ?? 'Yonko Level <onboarding@resend.dev>';
  const resend = new Resend(apiKey);

  const { data, error } = await resend.emails.send(
    {
      from,
      to: [to],
      subject: `[TEST] ${renderInput.subject}`,
      html,
    },
    { idempotencyKey: typeof body.idempotencyKey === 'string' ? body.idempotencyKey : testKey(to, renderInput.subject, renderInput.props) },
  );

  if (error) {
    console.error('Test send failed:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    id: data?.id,
    to,
    subject: `[TEST] ${renderInput.subject}`,
    from,
    theme: renderInput.props.theme ?? 'light',
    usedProvidedProps: renderInput.usedProvidedProps,
    assetWarnings,
  });
}
