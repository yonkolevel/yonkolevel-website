import * as React from 'react';
import { Box, Flex, Text } from 'rebass/styled-components';
import { toPercentage } from '../utils/styles';
import Column from './Columns';
import Container from './Container';
import Golang from './icons/Golang';
import JavascriptIcon from './icons/JavascriptIcon';
import NextJsIcon from './icons/NextJsIcon';
import ReactIcon from './icons/ReactIcon';
import Row from './Row';
import TechnologyPixelBottom from './shapes/TechnologyPixelBottom';
import TechnologyPixelTop from './shapes/TechnologyPixelTop';

interface ITechnologyBlockProps {}

function TechLogos(props: any) {
  return (
    <Row
      // flexWrap={['wrap', 'wrap', 'nowrap']}
      justifyContent='space-between'
      alignItems='center'
    >
      <Column width={[1, 1 / 2, 1 / 4]} alignItems='center' mb={24}>
        <NextJsIcon />
      </Column>
      <Column width={[1, 1 / 2, 1 / 4]} alignItems='center' mb={24}>
        <ReactIcon />
      </Column>
      <Column width={[1, 1 / 2, 1 / 4]} alignItems='center' mb={24}>
        <JavascriptIcon />
      </Column>
      <Column width={[1, 1 / 2, 1 / 4]} alignItems='center' mb={24}>
        <Golang />
      </Column>
    </Row>
  );
}

const TabletAndDesktopView = () => {
  return (
    <>
      <Flex>
        <TechnologyPixelTop />
      </Flex>
      <Box as='section' py={[100, 100, 435]} backgroundColor='blue5'>
        <Container>
          <Row>
            <Column width={[7 / 8, 1]} alignItems='center' mb={104}>
              <Text variant='h2' textAlign='center' mb={104} color='blue2'>
                We build for the modern web and beyond
              </Text>
              <TechLogos />
            </Column>
            <Column
              width={[1, toPercentage(8 / 12), toPercentage(8 / 12)]}
              mx='auto'
            >
              <Text variant='quote' as='p' textAlign='center'>
                We’re experts in the latest web technologies while still
                bringing a pragmatic approach to building software that delivers
                value and quality to the user.
              </Text>
            </Column>
          </Row>
        </Container>
      </Box>
      <Flex>
        <TechnologyPixelBottom />
      </Flex>
    </>
  );
};

const TechnologyBlock: React.FunctionComponent<ITechnologyBlockProps> = (
  props
) => {
  return (
    <>
      <TabletAndDesktopView />
    </>
  );
};

export default TechnologyBlock;
