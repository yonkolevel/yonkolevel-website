/* eslint-disable @next/next/no-img-element */
import { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';
import { BODY_SM, LABEL, SECTION_Y, SUBHEAD, TITLE } from '@/lib/typography';

export const metadata: Metadata = {
  title: 'Support | Yonko Level',
  description:
    'Get help, browse app guides, and access press kits for Yonko Level apps.',
};

const APPS = [
  {
    name: 'Invisible Camera',
    slug: 'invisible-camera',
    icon: '/products/invisible-camera/app-icon.png',
  },
  {
    name: 'Midicircuit',
    slug: 'midicircuit',
    icon: '/products/midicircuit/app-icon.png',
  },
  {
    name: 'MIDI Scout',
    slug: 'midi-scout',
    icon: '/products/midi-scout/icon.png',
  },
] as const;

export default function SupportPage() {
  return (
    <div className='bg-black min-h-screen'>
      <Container>
        <div className={`mx-auto max-w-4xl ${SECTION_Y}`}>
          {/* Page Header */}
          <div className='mb-16'>
            <h1 className={`${TITLE} text-white`}>
              SUPPORT
            </h1>
          </div>

          {/* Get Help */}
          <section className='mb-16'>
            <h2 className={`${LABEL} text-[#FCC552]/60 mb-6`}>
              GET HELP
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <a
                href='https://discord.gg/nnkdbC8R'
                target='_blank'
                rel='noopener noreferrer'
                className='group bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors'
              >
                <h3 className={`${SUBHEAD} text-white mb-2`}>
                  DISCORD
                </h3>
                <p className={`${BODY_SM} text-white/50`}>
                  Community help, feedback, and feature requests.
                </p>
              </a>
              <a
                href='mailto:team@yonkolevel.com'
                className='group bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors'
              >
                <h3 className={`${SUBHEAD} text-white mb-2`}>
                  EMAIL
                </h3>
                <p className={`${BODY_SM} text-white/50`}>
                  team@yonkolevel.com
                </p>
              </a>
            </div>
          </section>

          {/* Apps */}
          <section>
            <h2 className={`${LABEL} text-[#FCC552]/60 mb-6`}>
              APPS
            </h2>
            <div className='grid grid-cols-1 gap-4'>
              {APPS.map((app) => (
                <div
                  key={app.slug}
                  className='bg-white/5 rounded-lg p-6 flex items-center gap-6'
                >
                  <img
                    src={app.icon}
                    alt={`${app.name} icon`}
                    width={48}
                    height={48}
                    className='rounded-xl'
                  />
                  <span className={`${LABEL} text-white flex-1`}>
                    {app.name.toUpperCase()}
                  </span>
                  <div className='flex items-center gap-3'>
                    <Link
                      href={`/products/${app.slug}/guides`}
                      className={`${LABEL} text-white/80 hover:text-white transition-colors px-4 py-2`}
                    >
                      GUIDES
                    </Link>
                    <Link
                      href={`/products/${app.slug}/press`}
                      className={`${LABEL} text-white/80 hover:text-white transition-colors px-4 py-2`}
                    >
                      PRESS KIT
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
