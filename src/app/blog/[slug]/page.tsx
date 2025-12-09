import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Container from '@/components/Container';
import Link from 'next/link';
import { Metadata } from 'next';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return {
    title: `${post.frontMatter.title} - Yonko Level`,
    description: post.frontMatter.excerpt,
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return (
    <main className='min-h-screen bg-black text-white pt-32 pb-20'>
      <Container>
        <article className='max-w-3xl mx-auto'>
          <Link
            href='/blog'
            className='inline-flex items-center text-sm text-white/50 hover:text-orange mb-12 transition-colors font-mono'
          >
            ← BACK_TO_INDEX
          </Link>

          <header className='mb-16'>
            <time className='font-mono text-sm text-orange mb-4 block'>
              {post.frontMatter.date}
            </time>
            <h1 className='font-pixel text-3xl md:text-5xl leading-tight mb-8'>
              {post.frontMatter.title}
            </h1>
          </header>

          <div
            className='prose prose-invert prose-lg max-w-none 
            prose-headings:font-pixel 
            prose-p:text-white/80 
            prose-a:text-orange prose-a:no-underline hover:prose-a:underline
            prose-code:text-orange prose-code:bg-white/10 prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
            prose-blockquote:border-l-orange prose-blockquote:text-white/60'
          >
            <MDXRemote source={post.content} />
          </div>
        </article>
      </Container>
    </main>
  );
}
