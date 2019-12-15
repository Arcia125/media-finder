import React from 'react';
import styled from 'styled-components';

import { TMDBLogo, Svg } from './TMDBLogo';
import { themeMargin, themeSpacing, themeFontFamily } from '../themeHelpers';

const Info = styled.p`
  margin: 0;
  font-family: ${themeFontFamily};
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;

  color: #f4f4f4;
`;

const StyledFooter = styled.footer`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  padding-left: ${themeMargin};
  grid-column-gap: ${themeSpacing(4)};
  max-width: 1000px;

  & ${Svg} {
    grid-area: 1 / 1 / 2 / 3;

    @media screen and (max-width: 768px) {
      grid-area: 1 / 1 / 2 / 6;
    }
  }

  & ${Info} {
    grid-area: 1 / 3 / 2 / 6;

    @media screen and (max-width: 768px) {
      grid-area: 1 / 6 / 2 / 13;
    }
  }
`;

const Footer = props => {
  return (
    <StyledFooter>
      <TMDBLogo />
      <Info>
        This product uses the TMDb API but is not endorsed or certified by TMDb.
      </Info>
    </StyledFooter>
  );
};

export default Footer;
