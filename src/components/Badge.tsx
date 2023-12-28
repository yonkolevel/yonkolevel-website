import * as React from 'react';
import { Box, Text } from 'rebass/styled-components';
import { useTheme } from 'styled-components';

interface IBadgeProps {}

const Badge: React.FunctionComponent<IBadgeProps> = ({ children }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        // @ts-ignore
        color: theme.colors.blue2,
        // @ts-ignore
        border: `1px solid ${theme.colors.blue2}`,
        p: 2,
      }}
    >
      <Text variant='small'>{children}</Text>
    </Box>
  );
};

export default Badge;
