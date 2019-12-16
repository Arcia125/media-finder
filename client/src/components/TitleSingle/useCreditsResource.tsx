import React from 'react';

import { createResource } from '../../utils/createResource';

export const useCreditsResource = ({ movieId }) => {
  const [resource, setResource] = React.useState();

  const [startTransition, isPending] = React.useTransition({
    timeoutMs: 1000,
  });

  React.useEffect(() => {
    startTransition(() => {
      setResource(
        createResource({ endpoint: `/api/movie/${movieId}/credits` })
      );
    });
  }, [movieId]);

  return {
    resource,
    isPending,
  };
};
