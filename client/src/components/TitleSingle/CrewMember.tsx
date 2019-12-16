import React from 'react';

import { CrewMemberContainer } from './CrewMemberContainer';

export const CrewMember = ({ name, jobs }) => {
  return (
    <CrewMemberContainer>
      <h3>{name}</h3>
      <p>
        {jobs &&
          jobs.map((job, i) => (
            <span key={job}>
              {job}
              {i !== jobs.length - 1 && ', '}
            </span>
          ))}
      </p>
    </CrewMemberContainer>
  );
};
