import * as React from 'react';

interface IAuthorCardProps {
  pictureUrl: string;
  name: string;
  description: string;
  twitterUrl?: string;
  instagramUrl?: string;
}

const AuthorCard: React.FunctionComponent<IAuthorCardProps> = ({
  pictureUrl,
  name,
  description,
  instagramUrl,
  twitterUrl,
}) => {
  return (
    <div className='w-[434px]'>
      <div className='flex'>
        <div className='flex flex-column align-center mb-[24px]'>
          <div
            style={{
              width: '88px',
              height: '88px',
              borderRadius: '50%',
              background: `url(${pictureUrl})`,
              backgroundSize: 'cover',
            }}
          />
          <div className='flex flex-column align-center mt-[24px]'>
            {twitterUrl && (
              <a href={twitterUrl} target='_blank'>
                <img className='mr-[20px]' src='/images/icons/twitter.svg' alt='Twitter' />
              </a>
            )}
            {instagramUrl && (
              <a href={instagramUrl} target='_blank'>
                <img src='/images/icons/instagram.svg' alt='Instagram' />
              </a>
            )}
          </div>
        </div>
        <div >
          <span className='font-pixel text-caption mb-[12px]'>Written by</span>
          <span className='font-weight-bold text-orange mb-[12px]'>{name}</span>
          <span className='text-caption text-blue3'>{description}</span>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
