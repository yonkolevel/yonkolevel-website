import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';

export const metadata: Metadata = {
  title: 'Privacy Policy - Push Play',
  description:
    'How Push Play handles local music files, MIDI settings, optional Music Library access, TestFlight feedback, and support messages.',
  alternates: {
    canonical: 'https://yonkolevel.com/products/pushplay/privacy-policy',
  },
};

export default function PushPlayPrivacyPolicyPage() {
  return (
    <section className='bg-white py-16'>
      <Container>
        <div className='max-w-4xl mx-auto'>
          <div className='pb-10 text-center'>
            <h1 className='font-body font-bold text-3xl text-black'>
              Push Play privacy policy
            </h1>
            <p className='text-sm text-gray-500 mt-4'>
              Last updated: <time dateTime='2026-10-25'>25 October 2026</time>
            </p>
          </div>
          <div className='prose prose-lg text-gray-700 prose-headings:text-gray-900 prose-a:text-gray-900 prose-bullets:text-gray-600'>
            <h2>Overview</h2>
            <p>
              Yonko Level Ltd (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or
              &ldquo;our&rdquo;) develops Push Play. This policy covers the
              Push Play 0.1 early beta for macOS and iOS/iPadOS and information
              you choose to send us for support. You do not need a Push Play
              account to use the app.
            </p>

            <h2>Music files and library access</h2>
            <p>
              Push Play reads audio files you select and processes their audio,
              waveforms, and track metadata on your device. It does not provide
              a service that uploads your tracks or music library to Yonko Level.
              Track names, artists, and other available metadata are used to
              display and find tracks in the app.
            </p>
            <p>
              On iPhone and iPad, you can optionally give Push Play permission to
              read your Music Library. You can decline or revoke this permission
              in your device settings and use the file picker instead. Files
              selected through iCloud Drive or another file provider remain
              subject to that provider&apos;s storage and privacy practices.
            </p>

            <h2>Local settings and MIDI</h2>
            <p>
              Push Play stores preferences, selected-folder references, and saved
              MIDI mappings locally. It exchanges MIDI messages with connected
              controllers to operate the decks and update controller feedback.
              These features do not require a Yonko Level cloud account or
              cloud synchronisation service.
            </p>
            <p>
              You control the original music files and can remove them using
              your device&apos;s file tools. Removing Push Play does not delete
              original files stored outside the app. Local settings and backups
              are also subject to your operating system&apos;s storage and backup
              settings; contact us if you need help locating app-specific data.
            </p>

            <h2>Analytics and beta diagnostics</h2>
            <p>
              The current Push Play early beta does not initialise an in-app
              advertising or usage-analytics service. It does not sell your
              personal information or use your music for advertising.
            </p>
            <p>
              Apple processes installation, usage, and diagnostic information
              for TestFlight under its own terms. Apple may make beta crash
              information and feedback available to us. Feedback you send can
              include your email address, device and app details, comments, and
              screenshots. Do not include private material you do not want us
              to receive. Read{' '}
              <a href='https://www.apple.com/legal/privacy/data/en/test-flight/'>
                Apple&apos;s TestFlight privacy information
              </a>{' '}
              for details.
            </p>

            <h2>When you contact us</h2>
            <p>
              If you email support, we receive your email address, the contents
              of your message, and any files you attach. We use that information
              to answer you, investigate problems, and improve Push Play. Where
              data-protection law requires a legal basis, we rely on our
              legitimate interests in providing support and maintaining the app,
              or on meeting applicable legal obligations.
            </p>
            <p>
              Support messages may be processed by the email and infrastructure
              providers we use to communicate with you. We may also disclose
              information when required by law. We keep support and beta feedback
              only for as long as needed for these purposes and any applicable
              legal requirements. Please do not send passwords or unnecessary
              personal information.
            </p>

            <h2>Your choices and rights</h2>
            <p>
              You can revoke Music Library access in system settings, stop beta
              testing through TestFlight, and choose what to include in feedback.
              Depending on your location, you may have rights to request access,
              correction, deletion, or restriction of personal information we
              hold, or to object to its use. Contact{' '}
              <a href='mailto:team@yonkolevel.com'>team@yonkolevel.com</a>{' '}
              to make a request. You may also raise a concern with your local
              data-protection authority, including the UK Information
              Commissioner&apos;s Office where applicable.
            </p>

            <h2>Children&apos;s information</h2>
            <p>
              We do not ask children to provide personal information through
              Push Play. If you believe a child has sent us personal information
              in a support message or beta report, contact us so we can review
              and address it.
            </p>

            <h2>Changes and contact</h2>
            <p>
              We will update this page and its date if Push Play&apos;s data
              practices change. This app policy does not describe analytics used
              on the Yonko Level website itself or replace Apple&apos;s or your
              file provider&apos;s privacy terms.
            </p>
            <p>
              For privacy questions, email{' '}
              <a href='mailto:team@yonkolevel.com'>team@yonkolevel.com</a> at
              Yonko Level Ltd. For help using the app, visit{' '}
              <Link href='/products/pushplay/support'>Push Play support</Link>.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
