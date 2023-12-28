import * as React from 'react';
import { useState } from 'react';
import useWindowSize from '../lib/hooks/useWindowSize';
import BlogPostCard from './BlogPostCard';
import DesktopOnly from './DesktopOnly';
import Slider from './Slider';
import TabletAndBelow from './TabletAndBelow';
import Container from './Container';

interface IBlogBlockProps {}

const BlogBlock: React.FunctionComponent<IBlogBlockProps> = (props) => {
  const [visiblePost, setVisiblePost] = useState('');
  const { width } = useWindowSize();
  return (
    <section className='py-14 bg-white'>
      <Container>
        <div className='flex flex-wrap w-full pb-7'>
          <div className='w-full'>
            <span className='pre-header-style'>テクノロジー</span>
            <h1 className='text-blue2 mb-15 font-pixel text-2xl'>Blog</h1>
          </div>
        </div>
      </Container>

      <DesktopOnly>
        <Container>
          <div className='grid grid-cols-2'>
            <BlogPostCard
              title='UX/UI Unicorn'
              description='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply...'
              publishedDate={new Date()}
              author='Ricardo Abreu'
              slug='/1'
            />
            <BlogPostCard
              title='UX/UI Unicorn'
              description='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply...'
              publishedDate={new Date()}
              author='Ricardo Abreu'
              slug='/1'
            />
            <BlogPostCard
              title='UX/UI Unicorn'
              description='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply...'
              publishedDate={new Date()}
              author='Ricardo Abreu'
              slug='/1'
            />
          </div>
        </Container>
      </DesktopOnly>

      <TabletAndBelow>
        <Slider itemMarkers={[]}>
          <div className='w-[290px]'>
            <BlogPostCard
              title='UX/UI Unicorn'
              description='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply...'
              publishedDate={new Date()}
              author='Ricardo Abreu'
              slug='/1'
            />
          </div>
          <div className='w-[290px]'>
            <BlogPostCard
              title='UX/UI Unicorn'
              description='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply...'
              publishedDate={new Date()}
              author='Ricardo Abreu'
              slug='/1'
            />
          </div>

          <div className='w-[290px]'>
            <BlogPostCard
              title='UX/UI Unicorn'
              description='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply...'
              publishedDate={new Date()}
              author='Ricardo Abreu'
              slug='/1'
            />
          </div>
        </Slider>
      </TabletAndBelow>
    </section>
  );
};

export default BlogBlock;
