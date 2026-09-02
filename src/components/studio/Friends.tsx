import * as React from 'react';
import Container from '@/components/Container';
import PixelSprite from '@/components/PixelSprite';

/**
 * The independent people Yonko Level brings in when a project needs more than
 * one person. Same compact band as the trusted-by strip: a label and a row,
 * not a section. Add to the list only with the person's agreement.
 */
type Friend = { name: string; role: string; href?: string };

const friends: Friend[] = [
  {
    name: 'Délcio Baptista',
    role: 'Design',
    href: 'https://www.linkedin.com/in/delciobaptista/',
  },
  {
    name: 'Anthony Cossins',
    role: 'Web & interactive',
    href: 'https://anthonycossins.com/',
  },
];

export default function Friends() {
  return (
    <section className='bg-black' aria-labelledby='friends-title'>
      <Container>
        <div className='flex flex-col gap-[1.75rem] border-t border-white/10 py-[2.5rem] lg:flex-row lg:items-center lg:gap-[4rem] lg:py-[3rem]'>
          <h2
            id='friends-title'
            className='shrink-0 font-pixel text-xs uppercase tracking-[0.22em] text-orange'
          >
            {'// YONKO LEVEL FRIENDS'}
          </h2>
          <ul
            role='list'
            className='flex flex-wrap items-baseline gap-x-[3rem] gap-y-[1.25rem]'
          >
            {friends.map((friend) => (
              <li key={friend.name} className='flex flex-col gap-[0.35rem]'>
                <span className='font-pixel text-sm uppercase tracking-[0.08em] text-white'>
                  {friend.href ? (
                    <a
                      href={friend.href}
                      target='_blank'
                      rel='noreferrer'
                      className='border-b border-orange pb-[2px] transition-colors hover:text-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-4 focus-visible:ring-offset-black'
                    >
                      {friend.name}
                    </a>
                  ) : (
                    friend.name
                  )}
                </span>
                <span className='font-pixel text-xs uppercase tracking-[0.18em] text-white/40'>
                  {friend.role}
                </span>
              </li>
            ))}
          </ul>
          <div
            aria-hidden='true'
            className='hidden items-end gap-[0.5rem] lg:ml-auto lg:flex'
          >
            <PixelSprite
              src='/images/pixel/characters/ricardo-idle.webp'
              width={128}
              height={128}
            />
            <PixelSprite
              src='/images/pixel/characters/delcio-idle.webp'
              width={128}
              height={128}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
