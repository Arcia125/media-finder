import styled from 'styled-components';

import { themeSpacing } from '../../themeHelpers';

export const CrewContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 90px);
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: ${themeSpacing(6)};
`;
