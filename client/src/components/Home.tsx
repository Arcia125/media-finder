import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { themeSpacing, themeMargin } from '../themeHelpers';
import PreviewTrack, { TrackContainer } from './PreviewTrack';
import { createResource } from '../utils/createResource';
import { UpdateContext, initialStateContext } from '../backdropContext';

const Main = styled.main`
  margin-top: ${themeSpacing(12)};
  margin-left: ${themeMargin};
  ${TrackContainer} {
    margin-bottom: ${themeSpacing(8)};
  }
`;

// const PopularPreviewTrack = props => {
//   const [resource, setResource] = React.useState();
//   const [startTransition, isPending] = React.useTransition({ timeoutMs: 1000 });

//   React.useEffect(() => {
//     startTransition(() => {
//       setResource(createResource('popular'));
//     });
//   }, []);

//   return (
//     <PreviewTrack
//       title="Popular"
//       movies={resource ? resource.read() : []}
//     ></PreviewTrack>
//   );
// };

const usePreviewTrack = ({ resourceType, resourceName }) => {
  const [resource, setResource] = React.useState();
  const [startTransition, isPending] = React.useTransition({
    timeoutMs: 1000,
  });

  React.useEffect(() => {
    startTransition(() => {
      setResource(
        createResource({ endpoint: `/api/${resourceType}/${resourceName}` })
      );
    });
  }, [resourceType, resourceName]);

  return { resource, setResource, startTransition, isPending };
};

const FetchingPreviewTrack = ({ resourceType, resourceName, title }) => {
  const { resource, isPending } = usePreviewTrack({
    resourceType,
    resourceName,
  });
  return (
    <PreviewTrack
      title={title}
      movies={resource ? resource.read() : []}
      isPending={isPending}
    ></PreviewTrack>
  );
};

const Home = props => {
  const backdropContext = useContext(UpdateContext);

  useEffect(() => {
    backdropContext.setBackdropPath(
      initialStateContext.backgroundImage.split('/').slice(-1)[0]
    );
  }, []);
  return (
    <Main>
      <React.Suspense
        fallback={
          <PreviewTrack
            title="Popular"
            movies={new Array(7).fill(null).map(() => ({}))}
          />
        }
      >
        <FetchingPreviewTrack
          resourceType="movies"
          resourceName="popular"
          title="Popular"
        />
      </React.Suspense>
      <React.Suspense
        fallback={
          <PreviewTrack
            title="Now Playing"
            movies={new Array(7).fill(null).map(() => ({}))}
          />
        }
      >
        <FetchingPreviewTrack
          resourceType="movies"
          resourceName="now_playing"
          title="Now Playing"
        />
      </React.Suspense>
      <React.Suspense
        fallback={
          <PreviewTrack
            title="Upcoming"
            movies={new Array(7).fill(null).map(() => ({}))}
          />
        }
      >
        <FetchingPreviewTrack
          resourceType="movies"
          resourceName="upcoming"
          title="Upcoming"
        />
      </React.Suspense>
      <React.Suspense
        fallback={
          <PreviewTrack
            title="Popular"
            movies={new Array(7).fill(null).map(() => ({}))}
          />
        }
      >
        <FetchingPreviewTrack
          resourceType="movies"
          resourceName="top_rated"
          title="Top Rated"
        />
      </React.Suspense>
      {/* <PreviewTrack title="Featured" movies={mockFeaturedMovies} />
      <PreviewTrack title="New Releases" movies={mockNewReleases} />
      <PreviewTrack title="Now Playing" movies={mockNowPlaying} />
      <PreviewTrack title="Top Rated" movies={MockTopRated} /> */}
    </Main>
  );
};

export default Home;
