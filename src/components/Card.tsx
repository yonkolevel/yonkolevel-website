import * as React from 'react';
import { Flex, Image, Text } from 'rebass/styled-components';
import Badge from './Badge';

interface ICardProps {
  imageUrl: string;
  title: string;
  description: string;
  badgeLabel?: string;
}

const Card: React.FunctionComponent<ICardProps> = ({
  imageUrl,
  title,
  description,
  badgeLabel,
}) => {
  return (
    <Flex flexDirection='column'>
      <Image
        src={imageUrl}
        height={221}
        mb={3}
        sx={{ objectFit: 'cover' }}
        width={1}
      />
      <Flex mb={4} alignItems='center' justifyContent='space-between' width={1}>
        <Text variant='title' fontWeight='bold' as='h2'>
          {title}
        </Text>
        {badgeLabel && <Badge>{badgeLabel}</Badge>}
      </Flex>
      <Text>{description}</Text>
    </Flex>
  );
};

export default Card;
