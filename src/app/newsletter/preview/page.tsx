import { newsletterSampleData } from '@/lib/newsletter-sample';

const tk = {
  surface:      '#111111',
  surface2:     '#191919',
  surface3:     '#2B2B29',
  border:       '#2F2F2D',
  borderStrong: '#3D3D3B',
  tp:  '#EDEDE8',                   // 100% — headings, titles
  ts:  'rgba(237, 237, 232, 0.7)', //  70% — body copy, excerpts
  tt:  'rgba(237, 237, 232, 0.55)',//  55% — labels, metadata, fine print
  orange: '#FF5C24',
};

const COL = 'mx-auto w-full px-4 sm:px-8 lg:px-12';
const PAD = 'py-10 sm:py-14 lg:py-[60px]';

// Type scale via CSS custom properties — responsive via media query
// Mobile:         label 8px  | meta 10px | fine 12px | body 14px
// Tablet/Desktop: label 10px | meta 12px | fine 14px | body 16px
const ty = {
  label: 'var(--ty-label)',
  meta:  'var(--ty-meta)',
  fine:  'var(--ty-fine)',
  body:  'var(--ty-body)',
};

const typeScaleCSS = `
  :root {
    --ty-label: 8px;
    --ty-meta:  10px;
    --ty-fine:  12px;
    --ty-body:  14px;
  }
  @media (min-width: 640px) {
    :root {
      --ty-label: 10px;
      --ty-meta:  12px;
      --ty-fine:  14px;
      --ty-body:  16px;
    }
  }
`;

function Sec({ bg, border, pad = true, children }: { bg: string; border?: string; pad?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ background: bg, borderBottom: border }}>
      <div className={`${COL}${pad ? ` ${PAD}` : ''}`} style={{ maxWidth: '1200px' }}>
        {children}
      </div>
    </div>
  );
}

function AppTag({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: '999px', background: 'rgba(255,92,36,0.08)', border: '1px solid rgba(255,92,36,0.25)', fontSize: ty.meta, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: tk.orange }}>
      {children}
    </span>
  );
}

function NeutralTag({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: '999px', background: tk.surface3, border: `1px solid ${tk.borderStrong}`, fontSize: ty.meta, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: tk.ts }}>
      {children}
    </span>
  );
}

function CtaOrange({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} style={{ display: 'inline-block', padding: '8px 16px', borderRadius: '4px', background: 'rgba(255,92,36,0.08)', border: '1px solid rgba(255,92,36,0.3)', fontSize: ty.meta, fontWeight: 900, color: tk.orange, textDecoration: 'none', fontFamily: 'var(--font-pixel)' }}>
      {children}
    </a>
  );
}

function CtaNeutral({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} style={{ display: 'inline-block', padding: '8px 16px', borderRadius: '4px', background: 'transparent', border: `1px solid ${tk.borderStrong}`, fontSize: ty.meta, fontWeight: 900, color: tk.ts, textDecoration: 'none', fontFamily: 'var(--font-pixel)' }}>
      {children}
    </a>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: tk.surface2, borderBottom: `1px solid ${tk.border}` }}>
      <div className={`${COL} py-3`} style={{ maxWidth: '1200px' }}>
        <span style={{ fontSize: ty.label, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: tk.tt }}>{children}</span>
      </div>
    </div>
  );
}

type S1Feature   = { variant: 'feature';   appTag: string; headline: string; imageUrl?: string; imageAlt?: string; copy: string; ctaText: string; ctaUrl: string };
type S1Changelog = { variant: 'changelog'; versionTag: string; headline: string; items: string[]; ctaText: string; ctaUrl: string };
type S1MultiApp  = { variant: 'multi-app'; primary: { appTag: string; headline: string; copy: string; ctaText: string; ctaUrl: string }; secondary: { appTag: string; headline: string; copy: string; ctaText: string; ctaUrl: string } };

function S1Feature({ data }: { data: S1Feature }) {
  return (
    <>
      <Sec bg={tk.surface}>
        <AppTag>{data.appTag}</AppTag>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight" style={{ color: tk.tp, fontFamily: 'var(--font-pixel)', marginTop: '16px', marginBottom: 0 }}>{data.headline}</h1>
      </Sec>
      {data.imageUrl && (
        <div style={{ background: tk.surface }}>
          <div className={COL} style={{ maxWidth: '1200px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.imageUrl} alt={data.imageAlt ?? data.headline} style={{ display: 'block', width: '100%', maxHeight: '480px', objectFit: 'cover', objectPosition: 'top' }} />
          </div>
        </div>
      )}
      <Sec bg={tk.surface} border={`1px solid ${tk.border}`}>
        <p style={{ fontSize: ty.body, lineHeight: 1.7, color: tk.ts, marginTop: 0, marginBottom: 0 }}>{data.copy}</p>
        <div style={{ marginTop: '24px' }}>
          <CtaOrange href={data.ctaUrl}>{data.ctaText}</CtaOrange>
        </div>
      </Sec>
    </>
  );
}

function S1Changelog({ data }: { data: S1Changelog }) {
  return (
    <>
      <Sec bg={tk.surface} border={`1px solid ${tk.border}`}>
        <NeutralTag>{data.versionTag}</NeutralTag>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight" style={{ color: tk.tp, fontFamily: 'var(--font-pixel)', marginTop: '16px', marginBottom: 0 }}>{data.headline}</h1>
      </Sec>
      <Sec bg={tk.surface} border={`1px solid ${tk.border}`}>
        <span style={{ display: 'block', fontSize: ty.label, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: tk.tt, marginBottom: '12px' }}>What&apos;s new</span>
        <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {data.items.map((item, i) => (
            <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '10px' }}>
              <span style={{ flexShrink: 0, width: '18px', height: '18px', borderRadius: '50%', border: `1px solid ${tk.borderStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: ty.meta, fontWeight: 600, color: tk.tt }}>{i + 1}</span>
              <p style={{ fontSize: ty.body, lineHeight: 1.6, color: tk.ts, margin: 0 }}>{item}</p>
            </li>
          ))}
        </ol>
        <div style={{ marginTop: '24px' }}>
          <CtaOrange href={data.ctaUrl}>{data.ctaText}</CtaOrange>
        </div>
      </Sec>
    </>
  );
}

function S1MultiApp({ data }: { data: S1MultiApp }) {
  return (
    <>
      <Sec bg={tk.surface} border={`3px solid ${tk.surface3}`}>
        <AppTag>{data.primary.appTag}</AppTag>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight" style={{ color: tk.tp, fontFamily: 'var(--font-pixel)', marginTop: '16px', marginBottom: '12px' }}>{data.primary.headline}</h2>
        <p style={{ fontSize: ty.body, lineHeight: 1.7, color: tk.ts, marginTop: 0, marginBottom: 0 }}>{data.primary.copy}</p>
        <div style={{ marginTop: '24px' }}>
          <CtaOrange href={data.primary.ctaUrl}>{data.primary.ctaText}</CtaOrange>
        </div>
      </Sec>
      <Sec bg={tk.surface2}>
        <NeutralTag>{data.secondary.appTag}</NeutralTag>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black leading-tight" style={{ color: tk.tp, fontFamily: 'var(--font-pixel)', marginTop: '16px', marginBottom: '12px' }}>{data.secondary.headline}</h2>
        <p style={{ fontSize: ty.body, lineHeight: 1.7, color: tk.ts, marginTop: 0, marginBottom: 0 }}>{data.secondary.copy}</p>
        <div style={{ marginTop: '24px' }}>
          <CtaNeutral href={data.secondary.ctaUrl}>{data.secondary.ctaText}</CtaNeutral>
        </div>
      </Sec>
    </>
  );
}

export default function NewsletterPreviewPage() {
  const d = newsletterSampleData;

  return (
    <>
      <style>{typeScaleCSS}</style>

      {/* Header */}
      <div style={{ background: tk.surface, borderBottom: `1px solid ${tk.border}` }}>
        <div className={`${COL} py-8 sm:py-10 lg:py-12`} style={{ maxWidth: '1200px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <a href="https://yonkolevel.com"><img src="https://yonkolevel.com/images/logo.svg" alt="Yonko Level" style={{ display: 'block', width: '130px', height: '48px' }} /></a>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: ty.meta, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: tk.tt, margin: 0 }}>{d.issueNumber}</p>
              <p style={{ fontSize: ty.meta, color: tk.tt, margin: '2px 0 0' }}>{d.issueDate}</p>
            </div>
          </div>
          {d.editorialNote && (
            <div style={{ borderTop: `1px solid ${tk.border}`, marginTop: '16px', paddingTop: '12px' }}>
              <p style={{ fontSize: ty.body, fontStyle: 'italic', lineHeight: 1.6, color: tk.ts, margin: 0 }}>{d.editorialNote}</p>
            </div>
          )}
        </div>
      </div>

      {/* S1 */}
      {d.biggestNews.variant === 'feature'   && <S1Feature   data={d.biggestNews as S1Feature} />}
      {d.biggestNews.variant === 'changelog' && <S1Changelog data={d.biggestNews as S1Changelog} />}
      {d.biggestNews.variant === 'multi-app' && <S1MultiApp  data={d.biggestNews as S1MultiApp} />}

      {/* Blog / Vlog */}
      {d.posts && d.posts.length > 0 && (
        <>
          <SectionLabel>From the Blog</SectionLabel>
          {d.posts.map((post, i) => (
            <div key={i} style={{ background: i % 2 === 1 ? tk.surface2 : tk.surface, borderBottom: `1px solid ${tk.border}` }}>
              <div className={`${COL} ${PAD}`} style={{ maxWidth: '1200px' }}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-10">
                  <div className="sm:flex-[0_0_60%] min-w-0">
                    <NeutralTag>{post.type}</NeutralTag>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-black leading-tight" style={{ color: tk.tp, fontFamily: 'var(--font-pixel)', marginTop: '16px', marginBottom: '8px' }}>{post.headline}</h3>
                    <p style={{ fontSize: ty.body, lineHeight: 1.6, color: tk.ts, marginTop: 0, marginBottom: 0 }}>{post.excerpt}</p>
                    {(post.author || post.date) && <p style={{ fontSize: ty.fine, color: tk.tt, marginTop: '6px', marginBottom: 0 }}>{[post.author, post.date].filter(Boolean).join(' · ')}</p>}
                    <div style={{ marginTop: '24px' }}>
                      <CtaNeutral href={post.ctaUrl}>{post.type === 'Vlog' ? 'Watch →' : 'Read →'}</CtaNeutral>
                    </div>
                  </div>
                  {post.thumbnailUrl && (
                    <div className="mt-4 sm:mt-0 sm:flex-[0_0_calc(40%-32px)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={post.thumbnailUrl} alt={post.headline} className="w-full rounded-lg object-cover" style={{ aspectRatio: '16/9', border: `1px solid ${tk.border}` }} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </>
      )}

      {/* Education */}
      {d.education && (
        <>
          <SectionLabel>{d.education.label}</SectionLabel>
          <Sec bg={tk.surface} border={`1px solid ${tk.border}`}>
            <div className="lg:max-w-3xl">
              <div className="flex gap-3 items-stretch">
                <div style={{ flexShrink: 0, width: '3px', background: tk.orange, opacity: 0.5, borderRadius: '2px' }} />
                <div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-black leading-tight" style={{ color: tk.tp, fontFamily: 'var(--font-pixel)', marginTop: 0, marginBottom: '12px' }}>{d.education.headline}</h3>
                  <p style={{ fontSize: ty.body, lineHeight: 1.6, color: tk.ts, marginTop: 0, marginBottom: 0 }}>{d.education.body}</p>
                </div>
              </div>
              {d.education.exampleContent && (
                <div style={{ background: tk.surface2, border: `1px dashed ${tk.borderStrong}`, borderRadius: '8px', padding: '14px 16px', marginTop: '40px' }}>
                  <p style={{ fontSize: ty.body, lineHeight: 1.6, color: tk.ts, margin: 0 }}>{d.education.exampleContent}</p>
                </div>
              )}
              <div style={{ marginTop: '24px' }}>
                <CtaOrange href={d.education.ctaUrl}>{d.education.ctaText}</CtaOrange>
              </div>
            </div>
          </Sec>
        </>
      )}

      {/* Cultural Picks */}
      {d.culturalPicks.length > 0 && (
        <>
          <SectionLabel>What We&apos;re Into</SectionLabel>
          <Sec bg={tk.surface} border={`1px solid ${tk.border}`}>
            <div className="lg:max-w-xl">
              {d.culturalPicks.slice(0, 3).map((pick, i) => (
                <div key={i}>
                  {i > 0 && <hr style={{ borderColor: tk.border, margin: 0 }} />}
                  <div style={{ paddingTop: '16px', paddingBottom: '16px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'stretch' }}>
                      {pick.thumbnailUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={pick.thumbnailUrl} alt={pick.title} style={{ width: '38px', height: '38px', borderRadius: '6px', objectFit: 'cover', border: `1px solid ${tk.border}`, flexShrink: 0 }} />
                      )}
                      <div>
                        <a href={pick.url} style={{ fontSize: ty.body, fontWeight: 900, color: tk.tp, textDecoration: 'none', display: 'block', marginBottom: '3px', fontFamily: 'var(--font-pixel)' }}>{pick.title}</a>
                        <p style={{ fontSize: ty.body, lineHeight: 1.5, color: tk.tt, margin: 0 }}>{pick.note}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Sec>
        </>
      )}

      {/* Footer */}
      <div style={{ background: tk.surface2 }}>
        <div className={`${COL} ${PAD}`} style={{ maxWidth: '1200px', textAlign: 'center' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <a href="https://yonkolevel.com" style={{ display: 'inline-block', marginBottom: '16px' }}><img src="https://yonkolevel.com/images/logo.svg" alt="Yonko Level" style={{ width: '90px', height: '33px', display: 'block', margin: '0 auto' }} /></a>
          <div style={{ marginBottom: '16px' }}>
            <CtaNeutral href="https://yonkolevel.com">Visit yonkolevel.com</CtaNeutral>
          </div>
          {d.socialLinks && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '16px' }}>
              {d.socialLinks.twitter   && <a href={d.socialLinks.twitter}   style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '26px', height: '26px', borderRadius: '50%', background: tk.surface3, border: `1px solid ${tk.borderStrong}`, fontSize: ty.meta, color: tk.ts, textDecoration: 'none' }}>&#120143;</a>}
              {d.socialLinks.instagram && <a href={d.socialLinks.instagram} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '26px', height: '26px', borderRadius: '50%', background: tk.surface3, border: `1px solid ${tk.borderStrong}`, fontSize: ty.meta, color: tk.ts, textDecoration: 'none' }}>IG</a>}
              {d.socialLinks.youtube   && <a href={d.socialLinks.youtube}   style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '26px', height: '26px', borderRadius: '50%', background: tk.surface3, border: `1px solid ${tk.borderStrong}`, fontSize: ty.meta, color: tk.ts, textDecoration: 'none' }}>YT</a>}
            </div>
          )}
          <hr style={{ borderColor: tk.border, marginBottom: '14px' }} />
          <p style={{ fontSize: ty.fine, color: tk.tt, margin: '0 0 6px' }}>
            {d.preferencesUrl && <><a href={d.preferencesUrl} style={{ color: tk.tt, textDecoration: 'none' }}>Manage preferences</a>{' · '}</>}
            <a href={d.unsubscribeUrl} style={{ color: tk.tt, textDecoration: 'none' }}>Unsubscribe</a>
          </p>
          <p style={{ fontSize: ty.meta, color: tk.tt, margin: 0 }}>&copy; {new Date().getFullYear()} Yonko Level Ltd.</p>
        </div>
      </div>
    </>
  );
}
