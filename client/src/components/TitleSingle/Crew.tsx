import React from 'react';
import { CrewContainer } from './CrewContainer';
import { CrewMember } from './CrewMember';
export const Crew = ({ members }) => {
  return (
    <CrewContainer>
      {Object.values(
        members.reduce((acc, curr) => {
          if (!acc[curr.id])
            return { ...acc, [curr.id]: { ...curr, jobs: [curr.job] } };
          const existingMember = acc[curr.id];
          return {
            ...acc,
            [curr.id]: {
              ...existingMember,
              ...curr,
              jobs: [...existingMember.jobs, curr.job],
            },
          };
        }, {})
      )
        .slice(0, 6)
        .map(member => (
          <CrewMember key={member.name} name={member.name} jobs={member.jobs} />
        ))}
    </CrewContainer>
  );
};
