import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import Container from '@/components/Container';
import Link from 'next/link';
import { Metadata } from 'next';
import { BlogDrumPads, BlogPianoKeys, BlogPianoRoll } from '@/components/blog/MusicBlocks';

const mdxComponents = {
  BlogDrumPads,
  BlogPianoKeys,
  BlogPianoRoll,
};

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

  const ogImage = post.frontMatter.coverImage || '/images/og-image.jpg';

  return {
    title: post.frontMatter.title,
    description: post.frontMatter.excerpt,
    authors: [{ name: 'Yonko Level' }],
    openGraph: {
      title: post.frontMatter.title,
      description: post.frontMatter.excerpt,
      type: 'article',
      publishedTime: post.frontMatter.date,
      url: `https://yonkolevel.com/blog/${slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.frontMatter.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@yonkolevel',
      creator: '@yonkolevel',
      title: post.frontMatter.title,
      description: post.frontMatter.excerpt,
      images: [ogImage],
    },
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
            prose-code:text-white/90 prose-code:bg-white/10 prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-lg
            prose-blockquote:border-l-orange prose-blockquote:text-white/60
            prose-table:border-collapse prose-th:border prose-th:border-white/20 prose-th:px-4 prose-th:py-2 prose-th:bg-white/5 prose-td:border prose-td:border-white/20 prose-td:px-4 prose-td:py-2'
          >
            <MDXRemote source={post.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} components={mdxComponents} />
          </div>
        </article>
      </Container>
    </main>
  );
}
