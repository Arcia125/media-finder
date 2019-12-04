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

const getMovie = resourceName =>
  fetch(`/api/movies/${resourceName}`).then(res => {
    if (!res.ok) throw new Error('Failed to retrieve movie resource');
    return res.json();
  });

const createMovieResource = resourceName => {
  let status: 'pending' | 'success' | 'error' = 'pending';
  let result;
  let suspender = getMovie(resourceName)
    .then(data => {
      status = 'success';
      result = data;
    })
    .catch(err => {
      status = 'error';
      result = err;
    });
  return {
    read() {
      if (status === 'pending') throw suspender;
      if (status === 'error') throw result;
      if (status === 'success') return result;
    },
  };
};

const FeaturedPreviewTrack = props => {
  const [resource, setResource] = React.useState();
  const [startTransition, isPending] = React.useTransition({ timeoutMs: 1000 });

  React.useEffect(() => {
    startTransition(() => {
      setResource(createMovieResource('featured'));
    });
  }, []);

  return (
    <PreviewTrack
      title="Featured"
      movies={resource ? resource.read() : []}
    ></PreviewTrack>
  );
};

const MainContent = props => {
  return (
    <Main>
      <FeaturedPreviewTrack />
      {/* <PreviewTrack title="Featured" movies={mockFeaturedMovies} />
      <PreviewTrack title="New Releases" movies={mockNewReleases} />
      <PreviewTrack title="Now Playing" movies={mockNowPlaying} />
      <PreviewTrack title="Top Rated" movies={MockTopRated} /> */}
    </Main>
  );
};

export default MainContent;
