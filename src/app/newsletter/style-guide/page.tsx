const tk = {
  surface:      { hex: '#111111', label: 'surface',      usage: 'Primary section background' },
  surface2:     { hex: '#191919', label: 'surface2',     usage: 'Alternating sections, footer, section labels' },
  surface3:     { hex: '#2B2B29', label: 'surface3',     usage: 'Tag background, social icon background' },
  border:       { hex: '#2F2F2D', label: 'border',       usage: 'Section hairlines, image borders' },
  borderStrong: { hex: '#3D3D3B', label: 'borderStrong', usage: 'Tag borders, CTA borders' },
  tp:           { hex: '#EDEDE8',                    label: 'text primary (100%)',  usage: 'Headings, titles' },
  ts:           { hex: 'rgba(237, 237, 232, 0.7)',  label: 'text secondary (70%)', usage: 'Body copy, excerpts, editorial note' },
  tt:           { hex: 'rgba(237, 237, 232, 0.55)', label: 'text tertiary (55%)',  usage: 'Labels, metadata, fine print, copyright' },
  orange:       { hex: '#FF5C24',                    label: 'orange',               usage: 'App tags, primary CTAs, accent bar' },
};

const pageBg = '#111111';

function Row({ children }: { children: React.ReactNode }) {
  return <div style={{ borderBottom: '1px solid #2F2F2D', padding: '40px 0' }}>{children}</div>;
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: '#64645E', margin: '0 0 24px' }}>
      {children}
    </p>
  );
}

export default function StyleGuidePage() {
  return (
    <div style={{ background: pageBg, minHeight: '100vh', padding: '60px 48px', fontFamily: 'var(--font-body)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Title */}
        <div style={{ marginBottom: '60px' }}>
          <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: '#64645E', margin: '0 0 12px' }}>Yonko Level</p>
          <h1 style={{ fontFamily: 'var(--font-pixel)', fontSize: '28px', fontWeight: 900, color: '#EDEDE8', margin: 0, lineHeight: 1.3 }}>Newsletter Style Guide</h1>
        </div>

        {/* Colours */}
        <Row>
          <Label>Colour Tokens</Label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px' }}>
            {Object.values(tk).map((t) => (
              <div key={t.hex}>
                {/* Swatch */}
                <div style={{
                  height: '72px',
                  borderRadius: '6px',
                  background: t.hex,
                  border: t.hex === pageBg ? '1px solid #2F2F2D' : 'none',
                  marginBottom: '10px',
                }} />
                <p style={{ fontSize: '11px', fontWeight: 700, color: '#EDEDE8', margin: '0 0 2px', fontFamily: 'var(--font-body)' }}>{t.hex}</p>
                <p style={{ fontSize: '10px', color: '#96958F', margin: '0 0 2px', fontFamily: 'var(--font-body)' }}>{t.label}</p>
                <p style={{ fontSize: '9px', color: '#64645E', margin: 0, fontFamily: 'var(--font-body)', lineHeight: 1.5 }}>{t.usage}</p>
              </div>
            ))}
          </div>
        </Row>

        {/* Pixel font */}
        <Row>
          <Label>Pixel Font — Doto (var(--font-pixel))</Label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div>
              <p style={{ fontSize: '9px', color: '#64645E', margin: '0 0 6px', fontFamily: 'var(--font-body)', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>Display H1 — 48px desktop / 30px mobile</p>
              <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '48px', fontWeight: 900, color: '#EDEDE8', margin: 0, lineHeight: 1.2 }}>Android Beta is Here</p>
            </div>
            <div>
              <p style={{ fontSize: '9px', color: '#64645E', margin: '0 0 6px', fontFamily: 'var(--font-body)', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>Large H1 / H2 — 36px desktop / 24px mobile</p>
              <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '36px', fontWeight: 900, color: '#EDEDE8', margin: 0, lineHeight: 1.2 }}>v2.4 — Biggest Update Yet</p>
            </div>
            <div>
              <p style={{ fontSize: '9px', color: '#64645E', margin: '0 0 6px', fontFamily: 'var(--font-body)', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>Medium H2 — 30px desktop / 20px mobile</p>
              <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '30px', fontWeight: 900, color: '#EDEDE8', margin: 0, lineHeight: 1.2 }}>Also Shipping This Month</p>
            </div>
            <div>
              <p style={{ fontSize: '9px', color: '#64645E', margin: '0 0 6px', fontFamily: 'var(--font-body)', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>Small H3 — 24px desktop / 18px mobile</p>
              <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '24px', fontWeight: 900, color: '#EDEDE8', margin: 0, lineHeight: 1.2 }}>Music as Markdown</p>
            </div>
            <div>
              <p style={{ fontSize: '9px', color: '#64645E', margin: '0 0 6px', fontFamily: 'var(--font-body)', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>CTAs & Tags — 12px desktop / 10px mobile</p>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' as const }}>
                <a href="#" style={{ display: 'inline-block', padding: '8px 16px', borderRadius: '4px', background: 'rgba(255,92,36,0.08)', border: '1px solid rgba(255,92,36,0.3)', fontFamily: 'var(--font-pixel)', fontSize: '12px', fontWeight: 900, color: '#FF5C24', textDecoration: 'none' }}>Read More →</a>
                <a href="#" style={{ display: 'inline-block', padding: '8px 16px', borderRadius: '4px', background: 'transparent', border: '1px solid #3D3D3B', fontFamily: 'var(--font-pixel)', fontSize: '12px', fontWeight: 900, color: '#96958F', textDecoration: 'none' }}>Watch →</a>
                <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: '999px', background: 'rgba(255,92,36,0.08)', border: '1px solid rgba(255,92,36,0.25)', fontFamily: 'var(--font-pixel)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#FF5C24' }}>Midicircuit</span>
                <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: '999px', background: '#2B2B29', border: '1px solid #3D3D3B', fontFamily: 'var(--font-pixel)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#96958F' }}>Blog</span>
              </div>
            </div>
          </div>
        </Row>

        {/* Body font */}
        <Row>
          <Label>Body Font — Noto Sans (var(--font-body))</Label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div>
              <p style={{ fontSize: '9px', color: 'rgba(237,237,232,0.55)', margin: '0 0 6px', fontFamily: 'var(--font-body)', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>Body — 16px desktop / 14px mobile · text secondary (70%)</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'rgba(237,237,232,0.7)', margin: 0, lineHeight: 1.7, maxWidth: '620px' }}>
                Three years in the making. Midicircuit is coming to Android and we're opening beta access now. If you've been waiting to bring your MIDI workflow off iOS, this is your moment — spots are limited.
              </p>
            </div>
            <div>
              <p style={{ fontSize: '9px', color: 'rgba(237,237,232,0.55)', margin: '0 0 6px', fontFamily: 'var(--font-body)', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>Editorial note — 16px italic · text secondary (70%)</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'rgba(237,237,232,0.7)', margin: 0, lineHeight: 1.6, fontStyle: 'italic', maxWidth: '620px' }}>
                Big month. Android beta is finally happening, we shipped Music as Markdown, and I've been deep in drum samples all week for reasons that will make sense soon.
              </p>
            </div>
            <div>
              <p style={{ fontSize: '9px', color: 'rgba(237,237,232,0.55)', margin: '0 0 6px', fontFamily: 'var(--font-body)', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>Fine print — 14px desktop / 12px mobile · text tertiary (55%)</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(237,237,232,0.55)', margin: 0 }}>Ricardo · Mar 19 2026</p>
            </div>
            <div>
              <p style={{ fontSize: '9px', color: 'rgba(237,237,232,0.55)', margin: '0 0 6px', fontFamily: 'var(--font-body)', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>Section label — 10px desktop / 8px mobile · uppercase · text tertiary (55%)</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'rgba(237,237,232,0.55)', margin: 0 }}>From the Blog</p>
            </div>
          </div>
        </Row>

        {/* Fonts at a glance */}
        <Row>
          <Label>Fonts at a Glance</Label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div style={{ background: '#191919', borderRadius: '8px', padding: '24px' }}>
              <p style={{ fontSize: '9px', color: '#64645E', margin: '0 0 16px', fontFamily: 'var(--font-body)', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>Doto · Pixel Font</p>
              <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '22px', fontWeight: 900, color: '#EDEDE8', margin: '0 0 6px', lineHeight: 1.3 }}>ABCDEFGHIJ</p>
              <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '22px', fontWeight: 900, color: '#EDEDE8', margin: '0 0 6px', lineHeight: 1.3 }}>KLMNOPQRST</p>
              <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '22px', fontWeight: 900, color: '#EDEDE8', margin: '0 0 16px', lineHeight: 1.3 }}>UVWXYZ 0–9</p>
              <p style={{ fontSize: '9px', color: '#64645E', margin: 0, fontFamily: 'var(--font-body)' }}>Used for: all headings, CTAs, tags</p>
            </div>
            <div style={{ background: '#191919', borderRadius: '8px', padding: '24px' }}>
              <p style={{ fontSize: '9px', color: '#64645E', margin: '0 0 16px', fontFamily: 'var(--font-body)', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>Noto Sans · Body Font</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', fontWeight: 400, color: '#EDEDE8', margin: '0 0 4px', lineHeight: 1.5 }}>Regular — The quick brown fox</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', fontWeight: 500, color: '#EDEDE8', margin: '0 0 4px', lineHeight: 1.5 }}>Medium — The quick brown fox</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', fontWeight: 700, color: '#EDEDE8', margin: '0 0 16px', lineHeight: 1.5 }}>Bold — The quick brown fox</p>
              <p style={{ fontSize: '9px', color: '#64645E', margin: 0, fontFamily: 'var(--font-body)' }}>Used for: body copy, labels, fine print</p>
            </div>
          </div>
        </Row>

      </div>
    </div>
  );
}
