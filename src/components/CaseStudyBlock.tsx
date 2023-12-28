import * as React from 'react';
import { Box, Image, Text } from 'rebass/styled-components';
import { customTheme } from '../theme/styled';
import { toPercentage } from '../utils/styles';
import Button from './Button';
import Column from './Columns';
import Row from './Row';

interface ICaseStudyBlockProps extends React.RefAttributes<HTMLInputElement> {
  title: string;
  keywords: string;
  description: string;
  coverImageUrl: string;
  clientName: string;
  backgroundColor?: keyof typeof customTheme.colors;
  imageWidth?: any[] | string | number;
}

const CaseStudyBlock: React.FunctionComponent<ICaseStudyBlockProps> =
  React.forwardRef(
    (
      {
        title,
        keywords,
        description,
        coverImageUrl,
        clientName,
        backgroundColor,
        imageWidth,
      },
      ref
    ) => {
      return (
        <Box
          as='section'
          py={'10%'}
          backgroundColor={backgroundColor}
          ref={ref}
        >
          <Row
            alignItems={['center', 'center', null]}
            flexDirection={['column-reverse', 'column-reverse', 'row', 'row']}
            flexWrap='nowrap'
          >
            <Column
              width={[
                toPercentage(1),
                toPercentage(4 / 6),
                toPercentage(5 / 12),
              ]}
              justifyContent='center'
            >
              <Text as='span'>ケーススタディ</Text>
              <Text
                as='h3'
                variant='hero'
                color='blue2'
                mb={2}
                style={{
                  borderBottom: `2px solid ${customTheme.colors.blue3}`,
                }}
              >
                {title}
              </Text>

              <Text as='span' variant='japan' fontWeight='bold' mb={5}>
                {keywords}
              </Text>

              <Box mb={40}>
                <Text as='p' variant='small'>
                  {description}
                </Text>
              </Box>
              <Button>Case Study</Button>
            </Column>

            <Column
              width={[
                toPercentage(1),
                toPercentage(4 / 6),
                toPercentage(5 / 12),
              ]}
              // mx={['auto', 'auto', 0]}
              alignItems={['center', 'flex-start', 'flex-start']}
              mb={[72, 72, 0]}
            >
              <Image
                maxWidth='100%'
                width={imageWidth || ['100%']}
                src={coverImageUrl}
                style={{ objectFit: 'cover' }}
                mx='auto'
              />
            </Column>
          </Row>
        </Box>
      );
    }
  );

export default CaseStudyBlock;
