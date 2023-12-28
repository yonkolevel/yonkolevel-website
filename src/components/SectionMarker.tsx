import * as React from 'react';
import { Text } from 'rebass/styled-components';
import styled from 'styled-components';
import Circle from './Circle';

interface ISectionMakerProps {
  title: string;
  circleColor?: string;
}

const Wrapper = styled.div`
  display: flex;
  transform: rotate(90deg);
  align-items: center;
`;

const SectionMaker: React.FunctionComponent<ISectionMakerProps> = ({
  title,
  circleColor,
}) => {
  return (
    <Wrapper>
      <Text
        as='h1'
        mb={[4, 4, 0]}
        variant={['display']}
        color='secondary'
        display={['none', 'none', 'block']}
        mr={4}
      >
        {title}
      </Text>

      <Circle
        display={['none', 'none', 'block']}
        backgroundColor={circleColor || 'black'}
      />
    </Wrapper>
  );
};

export default SectionMaker;
