'use client';

import * as React from 'react';
import { usePostHog } from 'posthog-js/react';
import Container from './Container';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export default function NewsletterSignup() {
  const posthog = usePostHog();
  const [email, setEmail] = React.useState('');
  const [website, setWebsite] = React.useState('');
  const [state, setState] = React.useState<SubmitState>('idle');
  const [message, setMessage] = React.useState('');

  const statusMessageId = 'newsletter-signup-status';
  const emailHelpId = 'newsletter-email-help';

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState('submitting');
    setMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          consent: true,
          source: 'homepage-newsletter-section',
          website,
        }),
      });
      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(body.error ?? 'Could not subscribe right now.');
      }

      setState('success');
      setEmail('');
      posthog?.capture('newsletter_subscribed', { source: 'homepage-newsletter-section' });
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : 'Could not subscribe right now.');
      posthog?.capture('newsletter_subscribe_failed', { source: 'homepage-newsletter-section' });
    }
  }

  return (
    <section className='bg-black py-20 md:py-28'>
      <Container>
        <div className='grid grid-cols-1 gap-10 border-t border-white/10 pt-14 lg:grid-cols-[0.85fr_1fr] lg:gap-20 lg:pt-20'>
          <div className='max-w-xl'>
            <p className='font-pixel text-orange text-xs tracking-[0.22em] uppercase mb-5'>Newsletter</p>
            <h2 className='font-pixel text-white text-2xl md:text-4xl leading-tight tracking-tight'>
              Field notes from the Yonko Level lab.
            </h2>
            <p id={emailHelpId} className='text-white/60 text-base md:text-lg leading-8 mt-4'>
              Occasional updates on our apps, launches, prototypes, and the weird little decisions behind them.
              Midicircuit, Invisible Camera, and whatever we ship next.
            </p>
          </div>

          <form onSubmit={onSubmit} className='max-w-3xl lg:pt-16'>
            <div className='hidden' aria-hidden='true'>
              <label htmlFor='newsletter-website'>Website</label>
              <input
                id='newsletter-website'
                name='website'
                type='text'
                tabIndex={-1}
                autoComplete='off'
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
              />
            </div>

            <div className='flex flex-col gap-4 sm:flex-row'>
              <label htmlFor='newsletter-email' className='sr-only'>
                Email address
              </label>
              <input
                id='newsletter-email'
                name='email'
                type='email'
                inputMode='email'
                autoComplete='email'
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder='you@example.com'
                aria-describedby={`${emailHelpId} ${statusMessageId}`}
                aria-invalid={state === 'error'}
                className='min-h-16 flex-1 border border-white/10 bg-white/[0.06] px-5 text-lg text-white outline-none transition-colors placeholder:text-white/35 focus:border-orange/70 focus:bg-white/[0.09] focus:ring-2 focus:ring-orange/20'
              />

              <button
                type='submit'
                disabled={state === 'submitting'}
                className='min-h-16 bg-white px-8 font-pixel text-xs uppercase tracking-[0.14em] text-black transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-60 disabled:cursor-not-allowed sm:min-w-48'
              >
                {state === 'submitting' ? 'Subscribing…' : 'Subscribe'}
              </button>
            </div>

            <div id={statusMessageId} className='mt-4 min-h-6' aria-live='polite'>
              {state === 'success' && (
                <p className='text-sm text-green-300'>You’re on the list. Welcome aboard.</p>
              )}
              {state === 'error' && (
                <p className='text-sm text-red-300'>{message}</p>
              )}
            </div>

            <p className='mt-2 max-w-2xl text-sm leading-7 text-white/40'>
              We’ll only use your email for Yonko Level notes. No sharing, no surprise campaigns,
              and you can unsubscribe whenever.
            </p>
          </form>
        </div>
      </Container>
    </section>
  );
}
