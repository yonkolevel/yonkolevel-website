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

  // Find the contact in the audience by email
  const { data: listData, error: listError } = await resend.contacts.list({ audienceId });

  if (listError) {
    console.error('Resend list contacts error:', listError.message);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }

  const contact = listData?.data?.find((c) => c.email === email);

  if (!contact) {
    // Return success to avoid leaking whether the email is in the list
    return NextResponse.json({ success: true });
  }

  const { error } = await resend.contacts.update({
    audienceId,
    id: contact.id,
    unsubscribed: true,
  });

  if (error) {
    console.error('Resend unsubscribe error:', error.message);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
