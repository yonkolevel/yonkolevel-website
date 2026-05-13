import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const audienceId = process.env.RESEND_AUDIENCE_ID!;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.email || typeof body.email !== 'string') {
    return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
  }

  const email = body.email.toLowerCase().trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  const { error } = await resend.contacts.create({
    audienceId,
    email,
    firstName: body.firstName ?? undefined,
    lastName: body.lastName ?? undefined,
    unsubscribed: false,
  });

  if (error) {
    console.error('Resend subscribe error:', error.message);
    return NextResponse.json({ error: 'Failed to subscribe. Please try again.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
