import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type Theme = 'light' | 'dark';

interface S1Feature {
  variant: 'feature';
  appTag: string;
  headline: string;
  imageUrl?: string;
  imageAlt?: string;
  copy: string;
  ctaText: string;
  ctaUrl: string;
}

interface S1Changelog {
  variant: 'changelog';
  versionTag: string;
  headline: string;
  items: string[];
  ctaText: string;
  ctaUrl: string;
}

interface S1MultiApp {
  variant: 'multi-app';
  primary: { appTag: string; headline: string; copy: string; ctaText: string; ctaUrl: string };
  secondary: { appTag: string; headline: string; copy: string; ctaText: string; ctaUrl: string };
}

type S1 = S1Feature | S1Changelog | S1MultiApp;

interface AdjacentNews {
  label: string;
  iconUrl?: string;
  headline: string;
  location: string;
  date: string;
  copy: string;
  ctaText: string;
  ctaUrl: string;
}

interface BlogPost {
  type: 'Blog' | 'Vlog';
  headline: string;
  excerpt: string;
  author?: string;
  date?: string;
  thumbnailUrl?: string;
  ctaUrl: string;
}

interface Education {
  label: string;
  headline: string;
  body: string;
  exampleContent?: string;
  ctaText: string;
  ctaUrl: string;
}

interface CulturalPick {
  thumbnailUrl?: string;
  title: string;
  url: string;
  note: string;
}

export interface NewsletterEmailProps {
  theme?: Theme;
  issueNumber: string;
  issueDate: string;
  editorialNote?: string;
  biggestNews: S1;
  adjacentNews?: AdjacentNews;
  posts?: BlogPost[];
  education?: Education;
  culturalPicks: CulturalPick[];
  socialLinks?: { twitter?: string; instagram?: string; youtube?: string };
  unsubscribeUrl: string;
  preferencesUrl?: string;
}

// ─── Design tokens ────────────────────────────────────────────────────────────

type Tokens = typeof lightTokens;

const lightTokens = {
  pageBg: '#FFFFFF',
  surface: '#FFFFFF',
  surface2: '#F7F7F5',
  surface3: '#EFEFEC',
  border: '#E2E1DC',
  borderStrong: '#C8C7C0',
  textPrimary: '#1A1A18',
  textSecondary: '#5C5C58',
  textTertiary: '#9B9B95',
  textPlaceholder: '#C0BFB8',
  orange: '#FF5C24',
};

const darkTokens: Tokens = {
  pageBg: '#1C1C1A',
  surface: '#1C1C1A',
  surface2: '#232321',
  surface3: '#2B2B29',
  border: '#2F2F2D',
  borderStrong: '#3D3D3B',
  textPrimary: '#EDEDE8',
  textSecondary: '#96958F',
  textTertiary: '#64645E',
  textPlaceholder: '#46463F',
  orange: '#FF5C24',
};

const font = {
  pixel: "Doto, 'Courier New', monospace",
  label: 'Barlow Condensed, Arial Narrow, Arial, sans-serif',
  body: 'Barlow, Arial, sans-serif',
};

// ─── CSS for prefers-color-scheme (Apple Mail, iOS Mail, Outlook Mac) ─────────

const darkModeCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Doto:wght@900&family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@500;600&display=swap');
  @media only screen and (max-width: 600px) {
    .yl-post-row { display: block !important; width: 100% !important; }
    .yl-post-col-text { display: block !important; width: 100% !important; }
    .yl-post-col-thumb { display: block !important; width: 100% !important; padding-left: 0 !important; padding-top: 12px !important; }
    .yl-post-col-thumb img { width: 100% !important; height: auto !important; border-radius: 6px !important; }
  }
  @media (prefers-color-scheme: dark) {
    .yl-body    { background-color: #1C1C1A !important; }
    .yl-card    { background-color: #1C1C1A !important; }
    .yl-s       { background-color: #1C1C1A !important; border-color: #2F2F2D !important; }
    .yl-s2      { background-color: #232321 !important; border-color: #2F2F2D !important; }
    .yl-footer  { background-color: #171715 !important; border-color: #2F2F2D !important; }
    .yl-hr      { border-color: #2F2F2D !important; }
    .yl-tp      { color: #EDEDE8 !important; }
    .yl-ts      { color: #96958F !important; }
    .yl-tt      { color: #64645E !important; }
    .yl-tph     { color: #46463F !important; }
    .yl-tag     { background-color: #2B2B29 !important; border-color: #3D3D3B !important; color: #96958F !important; }
    .yl-btn-n   { background-color: #1C1C1A !important; border-color: #3D3D3B !important; color: #96958F !important; }
    .yl-btn-o   { background-color: rgba(255,92,36,0.12) !important; border-color: rgba(255,92,36,0.45) !important; }
    .yl-ex      { background-color: #232321 !important; border-color: #3D3D3B !important; }
    .yl-img     { border-color: #2F2F2D !important; }
    .yl-social  { background-color: #2B2B29 !important; border-color: #3D3D3B !important; color: #64645E !important; }
  }
`;

// ─── Primitive components (token-aware) ───────────────────────────────────────

function SectionLabel({ t, children }: { t: Tokens; children: React.ReactNode }) {
  return (
    <Section className="yl-s2" style={{ padding: '14px 24px 10px', borderBottom: `1px solid ${t.border}`, background: t.surface2 }}>
      <Text className="yl-tt" style={{ fontFamily: font.label, fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: t.textTertiary, margin: 0 }}>
        {children}
      </Text>
    </Section>
  );
}

function AppTag({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: 'inline-block', height: '18px', lineHeight: '18px', padding: '0 8px', borderRadius: '999px', background: 'rgba(255,92,36,0.08)', border: '1px solid rgba(255,92,36,0.25)', fontFamily: font.label, fontSize: '8px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#FF5C24' }}>
      {children}
    </span>
  );
}

function NeutralTag({ t, children }: { t: Tokens; children: React.ReactNode }) {
  return (
    <span className="yl-tag" style={{ display: 'inline-block', height: '18px', lineHeight: '18px', padding: '0 8px', borderRadius: '999px', background: t.surface3, border: `1px solid ${t.borderStrong}`, fontFamily: font.label, fontSize: '8px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: t.textSecondary }}>
      {children}
    </span>
  );
}

function CtaOrange({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="yl-btn-o" style={{ display: 'inline-block', padding: '8px 16px', borderRadius: '4px', background: 'rgba(255,92,36,0.08)', border: '1px solid rgba(255,92,36,0.3)', fontFamily: font.pixel, fontSize: '10px', fontWeight: 900, letterSpacing: '0.04em', color: '#FF5C24', textDecoration: 'none' }}>
      {children}
    </a>
  );
}

function CtaNeutral({ t, href, children }: { t: Tokens; href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="yl-btn-n" style={{ display: 'inline-block', padding: '8px 16px', borderRadius: '4px', background: t.surface, border: `1px solid ${t.borderStrong}`, fontFamily: font.pixel, fontSize: '10px', fontWeight: 900, letterSpacing: '0.04em', color: t.textSecondary, textDecoration: 'none' }}>
      {children}
    </a>
  );
}

// ─── S1 variants ─────────────────────────────────────────────────────────────

function S1FeatureBlock({ t, data }: { t: Tokens; data: S1Feature }) {
  return (
    <>
      <Section className="yl-s" style={{ padding: '20px 24px 16px', borderBottom: `1px solid ${t.border}` }}>
        <AppTag>{data.appTag}</AppTag>
        <Heading className="yl-tp" style={{ fontFamily: font.pixel, fontSize: '18px', fontWeight: 900, color: t.textPrimary, lineHeight: '1.4', margin: '12px 0 0' }}>
          {data.headline}
        </Heading>
      </Section>

      {data.imageUrl && (
        <Section style={{ padding: '0', borderBottom: `1px solid ${t.border}` }}>
          <Img src={data.imageUrl} alt={data.imageAlt ?? data.headline} width="600" height="340"
            style={{ display: 'block', width: '100%', height: '340px', objectFit: 'cover', objectPosition: 'top' }} />
        </Section>
      )}

      <Section className="yl-s" style={{ padding: '20px 24px', borderBottom: `1px solid ${t.border}` }}>
        <Text className="yl-ts" style={{ fontFamily: font.body, fontSize: '14px', color: t.textSecondary, lineHeight: '1.6', margin: '0 0 16px' }}>
          {data.copy}
        </Text>
        <CtaOrange href={data.ctaUrl}>{data.ctaText}</CtaOrange>
      </Section>
    </>
  );
}

function S1ChangelogBlock({ t, data }: { t: Tokens; data: S1Changelog }) {
  return (
    <>
      <Section className="yl-s" style={{ padding: '20px 24px 16px', borderBottom: `1px solid ${t.border}` }}>
        <NeutralTag t={t}>{data.versionTag}</NeutralTag>
        <Heading className="yl-tp" style={{ fontFamily: font.pixel, fontSize: '14px', fontWeight: 900, color: t.textPrimary, lineHeight: '1.5', margin: '12px 0 0' }}>
          {data.headline}
        </Heading>
      </Section>
      <Section className="yl-s" style={{ padding: '20px 24px' }}>
        <span style={{ fontFamily: font.label, fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: t.textPlaceholder, marginBottom: '10px', display: 'block' }}>
          What's new
        </span>
        {data.items.map((item, i) => (
          <Row key={i} style={{ marginBottom: '10px' }}>
            <Column style={{ width: '24px', verticalAlign: 'top', paddingTop: '1px' }}>
              <span style={{ display: 'inline-block', width: '16px', height: '16px', borderRadius: '50%', border: `1px solid ${t.borderStrong}`, fontFamily: font.label, fontSize: '8px', fontWeight: 600, color: t.textTertiary, textAlign: 'center', lineHeight: '16px' }}>
                {i + 1}
              </span>
            </Column>
            <Column>
              <Text className="yl-ts" style={{ fontFamily: font.body, fontSize: '14px', color: t.textSecondary, lineHeight: '1.6', margin: 0 }}>{item}</Text>
            </Column>
          </Row>
        ))}
        <Section style={{ marginTop: '16px' }}>
          <CtaOrange href={data.ctaUrl}>{data.ctaText}</CtaOrange>
        </Section>
      </Section>
    </>
  );
}

function S1MultiAppBlock({ t, data }: { t: Tokens; data: S1MultiApp }) {
  return (
    <>
      <Section className="yl-s" style={{ padding: '20px 24px', borderBottom: `3px solid ${t.surface3}` }}>
        <AppTag>{data.primary.appTag}</AppTag>
        <Heading className="yl-tp" style={{ fontFamily: font.pixel, fontSize: '14px', fontWeight: 900, color: t.textPrimary, lineHeight: '1.5', margin: '12px 0 12px' }}>
          {data.primary.headline}
        </Heading>
        <Text className="yl-ts" style={{ fontFamily: font.body, fontSize: '14px', color: t.textSecondary, lineHeight: '1.6', margin: '0 0 14px' }}>{data.primary.copy}</Text>
        <CtaOrange href={data.primary.ctaUrl}>{data.primary.ctaText}</CtaOrange>
      </Section>
      <Section className="yl-s2" style={{ padding: '20px 24px', background: t.surface2 }}>
        <NeutralTag t={t}>{data.secondary.appTag}</NeutralTag>
        <Heading className="yl-tp" style={{ fontFamily: font.pixel, fontSize: '13px', fontWeight: 900, color: t.textPrimary, lineHeight: '1.5', margin: '10px 0 10px' }}>
          {data.secondary.headline}
        </Heading>
        <Text className="yl-ts" style={{ fontFamily: font.body, fontSize: '14px', color: t.textSecondary, lineHeight: '1.6', margin: '0 0 14px' }}>{data.secondary.copy}</Text>
        <CtaNeutral t={t} href={data.secondary.ctaUrl}>{data.secondary.ctaText}</CtaNeutral>
      </Section>
    </>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function NewsletterEmail({
  theme = 'light',
  issueNumber,
  issueDate,
  editorialNote,
  biggestNews,
  adjacentNews,
  posts,
  education,
  culturalPicks,
  socialLinks,
  unsubscribeUrl,
  preferencesUrl,
}: NewsletterEmailProps) {
  const t = theme === 'dark' ? darkTokens : lightTokens;

  const previewText =
    biggestNews.variant === 'multi-app' ? biggestNews.primary.headline : biggestNews.headline;

  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
        <style>{darkModeCSS}</style>
      </Head>
      <Preview>{previewText}</Preview>

      <Body className="yl-body" style={{ background: t.pageBg, margin: 0, padding: 0, fontFamily: font.body }}>
        <Container className="yl-card" style={{ maxWidth: '600px', margin: '0 auto', background: t.surface, overflow: 'hidden' }}>

          {/* ── Header ── */}
          <Section className="yl-s" style={{ padding: '20px 24px', borderBottom: `1px solid ${t.border}` }}>
            <Row>
              <Column style={{ verticalAlign: 'middle' }}>
                <Link href="https://yonkolevel.com">
                  <Img
                    src="https://yonkolevel.com/images/logo.svg"
                    alt="Yonko Level"
                    width="130"
                    height="48"
                    style={{ display: 'block', width: '130px', height: '48px' }}
                  />
                </Link>
              </Column>
              <Column align="right">
                <Text className="yl-tt" style={{ fontFamily: font.label, fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: t.textTertiary, lineHeight: '1.4', margin: 0, textAlign: 'right' }}>
                  {issueNumber}
                </Text>
                <Text className="yl-tt" style={{ fontFamily: font.label, fontSize: '10px', letterSpacing: '0.06em', color: t.textTertiary, lineHeight: '1.4', margin: '2px 0 0', textAlign: 'right' }}>
                  {issueDate}
                </Text>
              </Column>
            </Row>

            {editorialNote && (
              <>
                <Hr className="yl-hr" style={{ borderColor: t.border, margin: '16px 0 12px' }} />
                <Text className="yl-ts" style={{ fontFamily: font.body, fontSize: '13px', fontStyle: 'italic', color: t.textSecondary, lineHeight: '1.6', margin: 0 }}>
                  {editorialNote}
                </Text>
              </>
            )}
          </Section>

          {/* ── S1: Biggest News ── */}
          {biggestNews.variant === 'feature'   && <S1FeatureBlock   t={t} data={biggestNews} />}
          {biggestNews.variant === 'changelog' && <S1ChangelogBlock t={t} data={biggestNews} />}
          {biggestNews.variant === 'multi-app' && <S1MultiAppBlock  t={t} data={biggestNews} />}

          {/* ── S2: Adjacent News ── */}
          {adjacentNews && (
            <>
              <SectionLabel t={t}>{adjacentNews.label}</SectionLabel>
              <Section className="yl-s" style={{ padding: '20px 24px', borderBottom: `1px solid ${t.border}` }}>
                <Row>
                  {adjacentNews.iconUrl && (
                    <Column style={{ width: '66px', verticalAlign: 'top' }}>
                      <Img src={adjacentNews.iconUrl} alt="" width="52" height="52" className="yl-img" style={{ display: 'block', borderRadius: '8px', border: `1px solid ${t.border}` }} />
                    </Column>
                  )}
                  <Column style={{ verticalAlign: 'top' }}>
                    <Heading className="yl-tp" style={{ fontFamily: font.pixel, fontSize: '13px', fontWeight: 900, color: t.textPrimary, lineHeight: '1.5', margin: '0 0 6px' }}>
                      {adjacentNews.headline}
                    </Heading>
                    <Text className="yl-tt" style={{ fontFamily: font.body, fontSize: '11px', color: t.textTertiary, lineHeight: '1.4', margin: '0 0 8px' }}>
                      {adjacentNews.location} · {adjacentNews.date}
                    </Text>
                    <Text className="yl-ts" style={{ fontFamily: font.body, fontSize: '14px', color: t.textSecondary, lineHeight: '1.6', margin: '0 0 12px' }}>
                      {adjacentNews.copy}
                    </Text>
                    <CtaNeutral t={t} href={adjacentNews.ctaUrl}>{adjacentNews.ctaText}</CtaNeutral>
                  </Column>
                </Row>
              </Section>
            </>
          )}

          {/* ── S3: Blog / Vlog ── */}
          {posts && posts.length > 0 && (
            <>
              <SectionLabel t={t}>From the Blog</SectionLabel>
              {posts.map((post, i) => (
                <Section
                  key={i}
                  className={i % 2 === 1 ? 'yl-s2' : 'yl-s'}
                  style={{ padding: '20px 24px', borderBottom: `1px solid ${t.border}`, background: i % 2 === 1 ? t.surface2 : t.surface }}
                >
                  <Row className="yl-post-row">
                    <Column className="yl-post-col-text" style={{ verticalAlign: 'top' }}>
                      <NeutralTag t={t}>{post.type}</NeutralTag>
                      <Heading className="yl-tp" style={{ fontFamily: font.pixel, fontSize: '13px', fontWeight: 900, color: t.textPrimary, lineHeight: '1.5', margin: '8px 0 6px' }}>
                        {post.headline}
                      </Heading>
                      <Text className="yl-ts" style={{ fontFamily: font.body, fontSize: '14px', color: t.textSecondary, lineHeight: '1.6', margin: '0 0 8px' }}>
                        {post.excerpt}
                      </Text>
                      {(post.author || post.date) && (
                        <Text className="yl-tt" style={{ fontFamily: font.body, fontSize: '11px', color: t.textTertiary, lineHeight: '1.4', margin: '0 0 10px' }}>
                          {[post.author, post.date].filter(Boolean).join(' · ')}
                        </Text>
                      )}
                      <CtaNeutral t={t} href={post.ctaUrl}>
                        {post.type === 'Vlog' ? 'Watch →' : 'Read →'}
                      </CtaNeutral>
                    </Column>
                    {post.thumbnailUrl && (
                      <Column className="yl-post-col-thumb" style={{ width: '100px', paddingLeft: '16px', verticalAlign: 'middle' }}>
                        <Img src={post.thumbnailUrl} alt={post.headline} width="88" height="66" className="yl-img"
                          style={{ display: 'block', width: '88px', height: '66px', objectFit: 'cover', borderRadius: '8px', border: `1px solid ${t.border}` }} />
                      </Column>
                    )}
                  </Row>
                </Section>
              ))}
            </>
          )}

          {/* ── S4: Education ── */}
          {education && (
            <>
              <SectionLabel t={t}>{education.label}</SectionLabel>
              <Section className="yl-s" style={{ padding: '20px 24px', borderBottom: `1px solid ${t.border}` }}>
                <Row>
                  <Column style={{ width: '17px', verticalAlign: 'top' }}>
                    <div style={{ width: '3px', minHeight: '80px', background: '#FF5C24', borderRadius: '2px', opacity: 0.5 }} />
                  </Column>
                  <Column style={{ verticalAlign: 'top' }}>
                    <Heading className="yl-tp" style={{ fontFamily: font.pixel, fontSize: '13px', fontWeight: 900, color: t.textPrimary, lineHeight: '1.5', margin: '0 0 10px' }}>
                      {education.headline}
                    </Heading>
                    <Text className="yl-ts" style={{ fontFamily: font.body, fontSize: '14px', color: t.textSecondary, lineHeight: '1.6', margin: '0 0 14px' }}>
                      {education.body}
                    </Text>
                    {education.exampleContent && (
                      <Section className="yl-ex" style={{ background: t.surface2, border: `1px dashed ${t.borderStrong}`, borderRadius: '8px', padding: '14px 16px', marginBottom: '16px' }}>
                        <Text className="yl-ts" style={{ fontFamily: font.body, fontSize: '13px', color: t.textSecondary, lineHeight: '1.6', margin: 0 }}>
                          {education.exampleContent}
                        </Text>
                      </Section>
                    )}
                    <CtaOrange href={education.ctaUrl}>{education.ctaText}</CtaOrange>
                  </Column>
                </Row>
              </Section>
            </>
          )}

          {/* ── S5: Cultural Recommendations ── */}
          {culturalPicks.length > 0 && (
            <>
              <SectionLabel t={t}>What We're Into</SectionLabel>
              <Section className="yl-s" style={{ padding: '20px 24px', borderBottom: `1px solid ${t.border}` }}>
                {culturalPicks.slice(0, 3).map((pick, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <Hr className="yl-hr" style={{ borderColor: t.border, margin: '12px 0' }} />}
                    <Row>
                      {pick.thumbnailUrl && (
                        <Column style={{ width: '50px', verticalAlign: 'top', paddingTop: '2px' }}>
                          <Img src={pick.thumbnailUrl} alt={pick.title} width="38" height="38" className="yl-img"
                            style={{ display: 'block', borderRadius: '6px', border: `1px solid ${t.border}` }} />
                        </Column>
                      )}
                      <Column style={{ verticalAlign: 'top' }}>
                        <Link href={pick.url} className="yl-tp" style={{ fontFamily: font.body, fontSize: '13px', fontWeight: 600, color: t.textPrimary, textDecoration: 'none', display: 'block', marginBottom: '3px' }}>
                          {pick.title}
                        </Link>
                        <Text className="yl-tt" style={{ fontFamily: font.body, fontSize: '11px', color: t.textTertiary, lineHeight: '1.4', margin: 0 }}>
                          {pick.note}
                        </Text>
                      </Column>
                    </Row>
                  </React.Fragment>
                ))}
              </Section>
            </>
          )}

          {/* ── Footer ── */}
          <Section className="yl-footer" style={{ padding: '24px', background: t.surface2, textAlign: 'center' }}>
            <Link href="https://yonkolevel.com">
              <Img
                src="https://yonkolevel.com/images/logo.svg"
                alt="Yonko Level"
                width="90"
                height="33"
                style={{ display: 'block', width: '90px', height: '33px', margin: '0 auto 16px' }}
              />
            </Link>

            {socialLinks && (
              <Row style={{ marginBottom: '16px' }}>
                <Column align="center">
                  {socialLinks.twitter && (
                    <Link href={socialLinks.twitter} style={{ display: 'inline-block', margin: '0 6px' }}>
                      <span className="yl-social" style={{ display: 'inline-block', width: '24px', height: '24px', lineHeight: '24px', borderRadius: '50%', background: t.surface3, border: `1px solid ${t.borderStrong}`, fontFamily: font.label, fontSize: '9px', fontWeight: 600, color: t.textSecondary, textAlign: 'center' }}>𝕏</span>
                    </Link>
                  )}
                  {socialLinks.instagram && (
                    <Link href={socialLinks.instagram} style={{ display: 'inline-block', margin: '0 6px' }}>
                      <span className="yl-social" style={{ display: 'inline-block', width: '24px', height: '24px', lineHeight: '24px', borderRadius: '50%', background: t.surface3, border: `1px solid ${t.borderStrong}`, fontFamily: font.label, fontSize: '9px', fontWeight: 600, color: t.textSecondary, textAlign: 'center' }}>IG</span>
                    </Link>
                  )}
                  {socialLinks.youtube && (
                    <Link href={socialLinks.youtube} style={{ display: 'inline-block', margin: '0 6px' }}>
                      <span className="yl-social" style={{ display: 'inline-block', width: '24px', height: '24px', lineHeight: '24px', borderRadius: '50%', background: t.surface3, border: `1px solid ${t.borderStrong}`, fontFamily: font.label, fontSize: '9px', fontWeight: 600, color: t.textSecondary, textAlign: 'center' }}>YT</span>
                    </Link>
                  )}
                </Column>
              </Row>
            )}

            <Hr className="yl-hr" style={{ borderColor: t.border, margin: '0 0 14px' }} />

            <Text style={{ fontFamily: font.body, fontSize: '11px', color: t.textTertiary, lineHeight: '1.4', textAlign: 'center', margin: '0 0 6px' }}>
              {preferencesUrl && (
                <><Link href={preferencesUrl} className="yl-tt" style={{ color: t.textTertiary, textDecoration: 'none' }}>Manage preferences</Link>{' · '}</>
              )}
              <Link href={unsubscribeUrl} className="yl-tt" style={{ color: t.textTertiary, textDecoration: 'none' }}>Unsubscribe</Link>
              {' · '}
              <Link href="https://yonkolevel.com" className="yl-tt" style={{ color: t.textTertiary, textDecoration: 'none' }}>yonkolevel.com</Link>
            </Text>
            <Text className="yl-tph" style={{ fontFamily: font.body, fontSize: '10px', color: t.textPlaceholder, textAlign: 'center', margin: 0 }}>
              © {new Date().getFullYear()} Yonko Level Ltd.
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}
