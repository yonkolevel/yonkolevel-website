// import * as React from 'react';
// import { Box, Text } from 'rebass/styled-components';
// import styled from 'styled-components';
// import { customTheme } from '../theme/styled';

// interface IVerticalTitleProps {
//   circleColor?: typeof customTheme.colors;
//   showCircle?: boolean;
//   japanText?: string;
// }

// const Circle = styled(Box)`
//   width: 98px;
//   height: 98px;
//   border-radius: 50%;
//   position: absolute;
//   left: -32px;
//   bottom: -48px;
//   z-index: 0;
// `;

// const Wrapper = styled(Box)`
//   width: fit-content;
//   white-space: nowrap;
//   writing-mode: vertical-lr;
//   position: relative;

//   & ${Circle} {
//     will-change: transform;
//     transition: transform ease-in-out 350ms;
//   }
//   // :hover {
//   //   & ${Circle} {
//   //     transform: translateX(-1000px);
//   //   }
//   // }
// `;

// const VerticalTitle: React.FunctionComponent<IVerticalTitleProps> = ({
//   children,
//   circleColor,
//   japanText,
//   showCircle = true,
// }) => {
//   return (
//     <Wrapper>
//       {japanText && (
//         <Text as='h1' variant='japan' color='black'>
//           {japanText}
//         </Text>
//       )}
//       <Text
//         as='h1'
//         variant='jumbo'
//         color='blue2'
//         sx={{
//           transform: 'rotate(180deg)',
//           position: 'relative',
//           zIndex: 10,
//         }}
//       >
//         {children}
//       </Text>
//       {showCircle && <Circle backgroundColor={circleColor || 'orange'} />}
//     </Wrapper>
//   );
// };

// export default VerticalTitle;
