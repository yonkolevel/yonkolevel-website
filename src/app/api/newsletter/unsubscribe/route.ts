import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const audienceId = process.env.RESEND_AUDIENCE_ID!;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.email || typeof body.email !== 'string') {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  const email = body.email.toLowerCase().trim();

  const { error } = await resend.contacts.remove({ audienceId, email });

  if (error) {
    console.error('Resend unsubscribe error:', error.message);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }

  // Always return success — never confirm whether the email was in the list
  return NextResponse.json({ success: true });
}
