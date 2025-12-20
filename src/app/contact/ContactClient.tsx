'use client';
import Container from '@/components/Container';
import * as React from 'react';
import { Widget } from '@typeform/embed-react';
import { usePostHog } from 'posthog-js/react';

export default function ContactClient() {
  const posthog = usePostHog();

  const handleFormReady = () => {
    posthog?.capture('contact_form_loaded');
  };

  const handleFormSubmit = () => {
    posthog?.capture('contact_form_submitted');
  };

  return (
    <Container>
      <div className='grid grid-cols-2 gap-10'>
        <div className='col-span-2 md:col-span-1'>
          <h1 className='font-pixel text-2xl text-blue2'>
            What can we do for you?
          </h1>
        </div>
        <div className='col-span-2 md:col-span-1'>
          <Widget
            id='JpaDXdWY'
            height={400}
            onReady={handleFormReady}
            onSubmit={handleFormSubmit}
          />
        </div>
      </div>
    </Container>
  );
}



