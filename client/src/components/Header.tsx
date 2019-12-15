import React from 'react';
import { Link } from 'react-router-dom';
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
      <Link to="/">
        <Logo>Media Finder</Logo>
      </Link>
    </HeaderContainer>
  );
};

export default Header;
