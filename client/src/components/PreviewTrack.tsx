import React from 'react';
import styled from 'styled-components';

import { themeSpacing, themeMargin } from '../themeHelpers';
import Thumbnail, { ThumbnailContainer } from './Thumbnail';

const TrackTitle = styled.h2`
  font-family: Lato;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  color: #f4f4f4;
`;

const Track = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 216px);
  grid-template-rows: 1fr;
  grid-column-gap: ${themeSpacing(1)};
  /* width: calc(101vw - ${themeMargin}); */
`;

export const TrackContainer = styled.div`
  ${TrackTitle} {
    margin-bottom: ${themeSpacing(3)};
  }
  ${ThumbnailContainer} {
  }
`;

const PreviewTrack = ({ title, movies }) => {
  return (
    <TrackContainer>
      <TrackTitle>{title}</TrackTitle>
      <Track>
        {movies &&
          movies.map((movie, i) => <Thumbnail key={i} image={movie.image} />)}
      </Track>
    </TrackContainer>
  );
};

export default PreviewTrack;
