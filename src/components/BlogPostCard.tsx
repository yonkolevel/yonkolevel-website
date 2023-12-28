import { format } from 'date-fns';
import React from 'react';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import AnchorLink from './AnchorLink';

interface IBlogPostCardProps {
  title: string;
  description: string;
  author: string;
  publishedDate: Date;
  slug: string;
  backgroundColor?: string;
  onVisibilityChanged?: (visibile: boolean) => void;
}


const CategoryLabel: React.FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div
      className='flex p-2 absolute bottom-0 left-0 bg-white items-center'
      style={{ width: '94px' }}
    >
      <span>{children}</span>
    </div>
  );
};

const BlogPostCard: React.FunctionComponent<IBlogPostCardProps> = ({
  title,
  description,
  author,
  publishedDate,
  slug = '/',
  backgroundColor,
  onVisibilityChanged,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.9,
    rootMargin: '3px',
  });

  useEffect(() => {
    if (onVisibilityChanged) {
      onVisibilityChanged(inView);
    }
  }, [inView, onVisibilityChanged]);

  return (
    <div
      className={`w-[290px] min-h-[100px] bg-${backgroundColor} pb-7 relative`}
      ref={ref}
    >
      <div className='relative mb-6'>
        <img
          className='object-cover block'
          style={{ height: '180px' }}
          src='https://images.unsplash.com/photo-1502209877429-d7c6df9eb3f9?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1347&q=80'
          alt='Blog Post'
        />
        <CategoryLabel>Design</CategoryLabel>
      </div>

      <AnchorLink href={slug}>
        <h4 className=' text-blue1 font-pixel mb-3'>{title}</h4>
      </AnchorLink>
      <p className='text-sm mb-3'>{description}</p>
      <span className='text-sm text-blue4'>
        Published on {format(publishedDate, 'MMM do')} by {author}
      </span>
    </div>
  );
};

export default BlogPostCard;
