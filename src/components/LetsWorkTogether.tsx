import * as React from 'react';
import { Button, Flex, Text } from 'rebass/styled-components';
import Container from './Container';

interface ILetsWorkTogetherProps {}

const LetsWorkTogether: React.FunctionComponent<ILetsWorkTogetherProps> = (
  props
) => {
  return (
    <Container>
      <Flex as='section' pb={100} flexDirection='column' alignItems='center'>
        <Text as='h1' variant='h1' mb={4} textAlign='center'>
          Let’s work together
        </Text>
        <Text as='span' variant='quote' textAlign='center' mb={60}>
          We will help you to make your product a reality. Working closely, we
          will certainly achieve the best results.
        </Text>
        <Button as='a' variant='secondary' href='mailto:contact@yonkolevel.com'>
          Start Project
        </Button>
      </Flex>
    </Container>
  );
};

export default LetsWorkTogether;
