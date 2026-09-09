import Link from 'next/link';
import Container from '@/components/Container';
import { BODY, LABEL, SUBHEAD, TITLE } from '@/lib/typography';
import { getAllPosts } from '@/lib/mdx';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Thoughts on Design & Technology',
  description:
    'Thoughts on design, technology, and building invisible tools. Stories from building apps like Midicircuit and Invisible Camera.',
  keywords: [
    'tech blog',
    'design blog',
    'app development',
    'product stories',
    'startup journey',
  ],
  openGraph: {
    title: 'Blog - Yonko Level',
    description:
      'Thoughts on design, technology, and building invisible tools. Stories from building apps like Midicircuit and Invisible Camera.',
    url: 'https://yonkolevel.com/blog',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Yonko Level Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Yonko Level',
    description:
      'Thoughts on design, technology, and building invisible tools.',
    images: ['/images/og-image.jpg'],
  },
};

export default async function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className='min-h-screen bg-black text-white pt-32 pb-20'>
      <Container>
        <div className='max-w-3xl mx-auto'>
          <h1 className={`${TITLE} mb-16 text-white`}>BLOG_POSTS</h1>

          <div className='space-y-8'>
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className='group block border-b border-white/10 pb-8 transition-colors last:border-b-0 last:pb-0 hover:border-white/40'
              >
                <article className='flex flex-col md:flex-row md:items-start gap-4 md:gap-12'>
                  <div className='flex-1'>
                    <h2 className={`${SUBHEAD} mb-2 text-white transition-colors group-hover:text-orange`}>
                      {post.frontMatter.title}
                    </h2>
                    <time className={`${LABEL} mb-3 block text-white/50`}>
                      {post.frontMatter.date}
                    </time>
                    <p className={`${BODY} text-white/60`}>
                      {post.frontMatter.excerpt}
                    </p>
                  </div>
                  <div className='hidden md:block text-orange opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 self-center'>
                    →
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
