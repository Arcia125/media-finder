import { createGlobalStyle } from 'styled-components';

import { themeFontFamily } from '../themeHelpers';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${themeFontFamily};
    margin: 0;
  }
`;

export default GlobalStyle;
