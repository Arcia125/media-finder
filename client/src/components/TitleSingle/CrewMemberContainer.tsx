import styled from 'styled-components';

import { themeSpacing, themeFontFamily } from '../../themeHelpers';

export const CrewMemberContainer = styled.div`
  display: flex;

  flex-direction: column;

  font-family: ${themeFontFamily};

  color: #f4f4f4;

  & h3 {
    margin: 0 0 ${themeSpacing(1)} 0;

    font-family: ${themeFontFamily};
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 21px;

    color: #f4f4f4;
  }

  & p {
    margin: 0;

    font-family: ${themeFontFamily};
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;

    color: #f4f4f4;
  }
`;
