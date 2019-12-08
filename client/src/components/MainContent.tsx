import React from 'react';
import styled from 'styled-components';
import { themeSpacing, themeMargin } from '../themeHelpers';
import PreviewTrack, { TrackContainer } from './PreviewTrack';

const Main = styled.main`
  margin-top: ${themeSpacing(12)};
  margin-left: ${themeMargin};
  ${TrackContainer} {
    margin-bottom: ${themeSpacing(8)};
  }
`;

// const mockFeaturedMovies = [
//   {
//     image: 'https://image.tmdb.org/t/p/w1280/qdfARIhgpgZOBh3vfNhWS4hmSo3.jpg',
//   },
//   {
//     image: 'https://image.tmdb.org/t/p/w1280/mbm8k3GFhXS0ROd9AD1gqYbIFbM.jpg',
//   },
//   {
//     image: 'https://image.tmdb.org/t/p/w1280/kTQ3J8oTTKofAVLYnds2cHUz9KO.jpg',
//   },
//   {
//     image: 'https://image.tmdb.org/t/p/w1280/llhj3xtNes2Ri4d9HqtleKo1CfL.jpg',
//   },
//   {
//     image: 'https://image.tmdb.org/t/p/w1280/vOl6shtL0wknjaIs6JdKCpcHvg8.jpg',
//   },
//   {
//     image: 'https://image.tmdb.org/t/p/w1280/uTALxjQU8e1lhmNjP9nnJ3t2pRU.jpg',
//   },
//   {
//     image: 'https://image.tmdb.org/t/p/w1280/4E2lyUGLEr3yH4q6kJxPkQUhX7n.jpg',
//   },
// ];

// const mockNewReleases = [...mockFeaturedMovies].sort(() => 0.5 - Math.random());
// const mockNowPlaying = [...mockFeaturedMovies].sort(() => 0.5 - Math.random());
// const MockTopRated = [...mockFeaturedMovies].sort(() => 0.5 - Math.random());

// const getMovie = resourceName =>
//   fetch(`/api/movies/${resourceName}`).then(res => {
//     if (!res.ok) throw new Error('Failed to retrieve movie resource');
//     return res.json();
//   });

const getData = endpoint =>
  fetch(endpoint).then(res => {
    if (!res.ok) throw new Error(`Failed to retrieve ${endpoint}`);
    return res.json();
  });

const createResource = ({ resourceType, resourceName }) => {
  let status: 'pending' | 'success' | 'error' = 'pending';
  let result;
  // let suspender = getMovie(resourceName)
  const endpoint = `/api/${resourceType}/${resourceName}`;
  const handleSuccess: (value: any) => void | PromiseLike<void> = data => {
    status = 'success';
    result = data;
  };
  const handleError: (reason: any) => void | PromiseLike<void> = err => {
    status = 'error';
    result = err;
  };
  let suspender = getData(endpoint)
    .then(handleSuccess)
    .catch(handleError);

  const resource = {
    read() {
      if (status === 'pending') throw suspender;
      if (status === 'error') throw result;
      if (status === 'success') return result;
    },
  };

  return resource;
};

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
      setResource(createResource({ resourceType, resourceName }));
    });
  }, []);

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

const MainContent = props => {
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

export default MainContent;
