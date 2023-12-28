import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { customTheme } from '../theme/styled';
import GlobalStyles from './GlobalStyles';

interface IThemeProps {}

const Theme: React.FunctionComponent<IThemeProps> = ({ children }) => {
  return (
    <ThemeProvider theme={customTheme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
