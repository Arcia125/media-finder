import React from 'react';
import styled from 'styled-components';

import Logo from './Logo';
import { themeSpacing, themeMargin } from '../themeHelpers';

const HeaderContainer = styled.header`
  padding-left: ${themeMargin};
  padding-top: ${themeSpacing(6)};
  & a {
    text-decoration: none;
  }
`;

const Header = props => {
  return (
    <HeaderContainer>
      <a href="/">
        <Logo>Media Finder</Logo>
      </a>
    </HeaderContainer>
  );
};

export default Header;
