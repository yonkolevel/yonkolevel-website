import * as React from 'react';
import Container from '@/components/Container';

/**
 * The independent people Yonko Level brings in when a project needs more than
 * one person. Same compact band as the trusted-by strip: a label and a row,
 * not a section. Add to the list only with the person's agreement.
 */
const friends = [
  { name: 'Délcio Baptista', role: 'Design' },
  { name: 'Tiago', role: 'Engineering' },
  {
    name: 'Anthony Cossins',
    role: 'Web & interactive',
    href: 'https://anthonycossins.com/',
  },
] as const;

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
                  {'href' in friend ? (
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
        </div>
      </Container>
    </section>
  );
}
