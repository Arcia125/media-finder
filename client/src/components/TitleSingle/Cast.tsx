import React from 'react';
import styled from 'styled-components';

import { CastMember } from './CastMember';
import { themeSpacing } from '../../themeHelpers';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 140px);
  grid-template-rows: 222px;
  grid-column-gap: ${themeSpacing(2)};
  grid-row-gap: 0px;
`;

export const Cast = ({ members }) => {
  return (
    <Container>
      {members.slice(0, 7).map(credit => (
        // <div key={credit.id}>{JSON.stringify(credit)}</div>
        <CastMember
          key={credit.id}
          character={credit.character}
          name={credit.name}
          profilePath={credit.profile_path}
        />
      ))}
    </Container>
  );
};
