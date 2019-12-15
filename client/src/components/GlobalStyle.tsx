import { createGlobalStyle } from 'styled-components';
import { themeFontFamily } from '../themeHelpers';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Lato&display=swap');
  body {
    font-family: ${themeFontFamily};
    margin: 0;
  }
`;

export default GlobalStyle;
