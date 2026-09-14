export default function NewsletterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#111111', minHeight: '100vh' }}>
      {children}
    </div>
  );
}
