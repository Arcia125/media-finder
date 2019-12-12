import React from 'react';
import styled from 'styled-components';

import { themeSpacing, themeMargin } from '../themeHelpers';
import { createResource } from '../utils/createResource';

const Main = styled.main`
  margin-top: ${themeSpacing(12)};
  margin-left: ${themeMargin};
`;

const TitleSingle = () => {
  return <Main>TITLE SINGLE</Main>;
};

export default TitleSingle;
