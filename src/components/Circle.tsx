import { Box } from 'rebass/styled-components';
import styled from 'styled-components';

const Circle = styled(Box)<any>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${(props) => props.backgroundColor || props.theme.colors.primary};
`;

export default Circle;
