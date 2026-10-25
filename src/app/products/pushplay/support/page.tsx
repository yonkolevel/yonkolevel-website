import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';

export const metadata: Metadata = {
  title: 'PushPlay Support',
  description:
    'Get help with the PushPlay early beta: loading tracks, connecting MIDI controllers, audio output, and reporting problems.',
  alternates: {
    canonical: 'https://yonkolevel.com/products/pushplay/support',
  },
};

export default function PushPlaySupportPage() {
  return (
    <section className='bg-white py-16'>
      <Container>
        <div className='max-w-4xl mx-auto'>
          <div className='pb-10 text-center'>
            <p className='text-sm text-gray-500 mb-4'>PushPlay · Early beta</p>
            <h1 className='font-body font-bold text-3xl text-black'>
              PushPlay support
            </h1>
          </div>
          <div className='prose prose-lg text-gray-700 prose-headings:text-gray-900 prose-a:text-gray-900 prose-bullets:text-gray-600'>
            <p>
              PushPlay is a two-deck DJ app for Mac, iPhone, and iPad, with MIDI
              mappings for Ableton Push 2 and Move. The early beta is for trying
              the workflow and finding problems, not for relying on at a live gig.
              Hardware compatibility is still being tested.
            </p>

            <h2>Get in touch</h2>
            <p>
              Email{' '}
              <a href='mailto:team@yonkolevel.com?subject=PushPlay%20support'>
                team@yonkolevel.com
              </a>{' '}
              for help or to report a problem. If you installed through
              TestFlight, you can also send feedback from TestFlight.
            </p>
            <p>To help us reproduce a problem, include:</p>
            <ul>
              <li>Your PushPlay version and build number, shown in TestFlight.</li>
              <li>Your device model and macOS or iOS/iPadOS version.</li>
              <li>
                Your MIDI controller, its firmware version, and any audio
                interface, USB hub, or adapter in use.
              </li>
              <li>What you did, what you expected, and what happened instead.</li>
              <li>A screenshot or short recording, if it helps explain the issue.</li>
            </ul>
            <p>
              Please remove personal details from screenshots and logs. Do not
              send passwords, API keys, or music files you do not have permission
              to share. We will ask if we need a small example file.
            </p>

            <h2>Loading music</h2>
            <p>
              Start with a local audio file you can play on your device. Choose
              a track for each deck in the browser. On iPhone and iPad, Music
              Library access is optional and requires your permission. Cloud-only
              tracks and DRM-protected streaming tracks may not be available for
              loading; a streaming subscription does not make every track a
              playable local file.
            </p>
            <p>
              If a track is missing, check the selected folder and search filter.
              If access was denied, review PushPlay&apos;s Music Library permission
              in your device settings, or use the file picker instead.
            </p>

            <h2>Connecting a MIDI controller</h2>
            <p>
              Check the USB cable, power supply, and any adapter or hub. Open
              PushPlay&apos;s Settings and check the selected MIDI device and
              profile. Move&apos;s built-in mapping is for Live Control mode.
              Other MIDI controllers may need custom mappings.
            </p>
            <p>
              If a controller is not detected, try a direct connection and check
              whether another app is using it. Tell us the exact controller and
              firmware when reporting a mapping or LED issue.
            </p>

            <h2>Audio and headphone monitoring</h2>
            <p>
              Check the selected audio output, deck volumes, crossfader position,
              and your device or interface volume. Start at a low listening level.
              Independent headphone monitoring needs an available output pair
              separate from the main mix. A two-output route cannot provide
              separate main and cue mixes.
            </p>
            <p>
              If there is no sound or audio stops after a device change, report
              the selected route and the steps that led to it. Avoid changing
              cables or routing during a performance until you have tested your
              setup with this beta.
            </p>

            <h2>Privacy</h2>
            <p>
              Read the{' '}
              <Link href='/products/pushplay/privacy-policy'>
                PushPlay privacy policy
              </Link>{' '}
              for information about local music files, permissions, TestFlight
              feedback, and support messages.
            </p>
            <p className='text-sm'>
              PushPlay is an independent Yonko Level product. It is not affiliated
              with or endorsed by Ableton. Ableton, Push, and Move are trademarks
              of their respective owners.
            </p>
            <p><Link href='/support'>All Yonko Level support</Link></p>
          </div>
        </div>
      </Container>
    </section>
  );
}
