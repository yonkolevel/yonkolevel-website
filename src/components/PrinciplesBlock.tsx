// import * as React from 'react';
// import { useEffect, useState } from 'react';
// import { useInView } from 'react-intersection-observer';
// import { Box, Flex, Image, Text } from 'rebass/styled-components';
// import { toPercentage } from '../utils/styles';
// import Column from './Columns';
// import Container from './Container';
// import Row from './Row';
// import RightThingPixelBottom from './shapes/RightThingPixelBottom';
// import RightThingPixelTop from './shapes/RightThingPixelTop';

// interface PrinciplesBlockProps {}

// const PrinciplesBlock: React.FunctionComponent<PrinciplesBlockProps> = (
//   props
// ) => {
//   const { ref, inView } = useInView();
//   const [showAnimation, setShowAnimation] = useState(false);

//   useEffect(() => {
//     if (inView) {
//       setShowAnimation(true);
//     }
//   }, [ref, inView]);

//   return (
//     <>
//       <Flex ref={ref}>
//         <RightThingPixelTop />
//       </Flex>
//       <Box as='section' backgroundColor='#000'>
//         <Container py={[100, 160, 160]}>
//           <Row justifyContent='center' width='100%'>
//             <Column
//               display={[
//                 'none !important',
//                 'none !important',
//                 'flex !important',
//               ]}
//               width={[toPercentage(8 / 12)]}
//               alignItems='center'
//             >
//               <Flex
//                 justifyContent='center'
//                 alignItems='center'
//                 p={'8px'}
//                 sx={{ border: '1px solid green' }}
//               >
//                 <Box mr={28}>
//                   <Image
//                     src='/images/illustrations/ricardo_avatar.svg'
//                     sx={{ objectFit: 'cover' }}
//                   />
//                 </Box>
//                 <Box>
//                   <Text
//                     as='span'
//                     variant='pixel'
//                     fontWeight='bold'
//                     fontSize={16}
//                     color='white'
//                   >
//                     At Yonko Level we do the right thing in the right way. We do
//                     our best throughout the project to achieve the best product.
//                   </Text>
//                 </Box>
//               </Flex>
//             </Column>
//           </Row>
//           <Row justifyContent='center' width='100%' backgroundColor='#000'>
//             <Column width={[1, 8 / 12]} alignItems='center'>
//               {showAnimation && (
//                 <Image src='/images/illustrations/yonko_values_game_Final.gif' />
//               )}
//             </Column>
//           </Row>
//         </Container>
//       </Box>
//       <Flex>
//         <RightThingPixelBottom />
//       </Flex>
//     </>
//   );
// };

// export default PrinciplesBlock;
