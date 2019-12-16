import React from 'react';

export const Cast = ({ members }) => {
  return (
    <div>
      {members.slice(0, 7).map(credit => (
        <div key={credit.id}>{JSON.stringify(credit)}</div>
      ))}
    </div>
  );
};
