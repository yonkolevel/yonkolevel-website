import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isAlreadySubscribed(error: { message?: string; name?: string }) {
  const message = `${error.name ?? ''} ${error.message ?? ''}`.toLowerCase();
  return message.includes('already') || message.includes('exists') || message.includes('duplicate');
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (body?.website) {
    return NextResponse.json({ success: true });
  }

  if (!body?.email || typeof body.email !== 'string') {
    return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
  }

  if (body.consent !== true) {
    return NextResponse.json({ error: 'Please confirm you want to receive the newsletter.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!apiKey || !audienceId) {
    console.error('Newsletter subscribe route missing RESEND_API_KEY or RESEND_AUDIENCE_ID');
    return NextResponse.json({ error: 'Newsletter signup is not configured yet.' }, { status: 500 });
  }

  const email = body.email.toLowerCase().trim();
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  const firstName = typeof body.firstName === 'string' ? body.firstName.trim().slice(0, 100) : undefined;
  const lastName = typeof body.lastName === 'string' ? body.lastName.trim().slice(0, 100) : undefined;
  const resend = new Resend(apiKey);

  const { error } = await resend.contacts.create({
    audienceId,
    email,
    firstName,
    lastName,
    unsubscribed: false,
  });

  if (error) {
    if (isAlreadySubscribed(error)) {
      return NextResponse.json({ success: true, alreadySubscribed: true });
    }

    console.error('Resend subscribe error:', error.message);
    return NextResponse.json({ error: 'Failed to subscribe. Please try again.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
