import * as React from 'react';
import { Box, Flex, Image, Text } from 'rebass/styled-components';
import styled from 'styled-components';

interface IAuthorCardProps {
  pictureUrl: string;
  name: string;
  description: string;
  twitterUrl?: string;
  instagramUrl?: string;
}

const Avatar = styled('div')<{ imageUrl: string }>`
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: url(${(props) => props.imageUrl});
  background-size: cover;
`;

const Details = styled(Box)`
  > span {
    display: block;
  }
`;

const AuthorCard: React.FunctionComponent<IAuthorCardProps> = ({
  pictureUrl,
  name,
  description,
  instagramUrl,
  twitterUrl,
}) => {
  return (
    <Box width={434}>
      <Flex>
        <Flex mr={24} flexDirection='column' alignItems='center'>
          <Avatar imageUrl={pictureUrl} />
          <Flex mt={24}>
            {twitterUrl && (
              <a href={twitterUrl} target='_blank'>
                <Image src='/images/icons/twitter.svg' mr={20} />
              </a>
            )}
            {instagramUrl && (
              <a href={instagramUrl} target='_blank'>
                <Image src='/images/icons/instagram.svg' />
              </a>
            )}
          </Flex>
        </Flex>
        <Details flex={1}>
          <Text as='span' fontFamily='pixel' variant='caption' mb={12}>
            Written by
          </Text>
          <Text
            as='span'
            variant='body'
            fontWeight='bold'
            color='orange'
            mb={12}
          >
            {name}
          </Text>
          <Text as='span' variant='caption' color='blue3'>
            {description}
          </Text>
        </Details>
      </Flex>
    </Box>
  );
};

export default AuthorCard;
