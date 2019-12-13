import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { themeSpacing, themeMargin } from '../themeHelpers';
import { createResource } from '../utils/createResource';

const PosterImage = styled.img``;

const Title = styled.h2`
  margin: 0;
  font-family: 'Lato', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  line-height: 42px;

  color: #f4f4f4;
`;

const ReleaseDate = styled(Title)`
  color: #b9b9b9;
`;

const Information = styled.div``;

const Top = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: ${themeSpacing(9)};
  grid-row-gap: 0px;

  & ${PosterImage} {
    grid-area: 1 / 1 / 2 / 2;
  }

  & ${Information} {
    grid-area: 1 / 2 / 2 / 3;
  }
`;

const Row = styled.div`
  display: flex;
`;

const Bottom = styled.div``;

const Main = styled.main`
  margin-top: ${themeSpacing(12)};
  margin-left: ${themeMargin};

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;

  & ${Top} {
    grid-area: 1 / 1 / 2 / 3;
  }

  & ${Bottom} {
    grid-area: 2 / 1 / 3 / 3;
  }
`;

const TitleSingle = () => {
  const { movieId } = useParams();
  const [resource, setResource] = React.useState();
  const [startTransition, isPending] = React.useTransition({
    timeoutMs: 1000,
  });

  // React.useEffect(() => {
  //   startTransition(() => {
  //     setResource(createResource({ endpoint: `/api/movie/${movieId}` }));
  //   });
  // }, [movieId]);

  const mediaTitle = resource
    ? resource.read()
    : {
        id: 330457,
        image:
          'https://image.tmdb.org/t/p/w500/pjeMs3yqRmFL3giJy4PMXWZTTPa.jpg',
        title: 'Frozen II',
        release_date: '2019-11-20',
      };

  console.log(mediaTitle);

  return (
    <Main>
      <Top>
        <PosterImage src={mediaTitle.image} />
        <Information>
          <Row>
            <Title>{mediaTitle.title}</Title>
            <ReleaseDate>
              {mediaTitle.release_date &&
                `(${new Date(mediaTitle.release_date).getFullYear()})`}
            </ReleaseDate>
          </Row>
        </Information>
      </Top>
      <Bottom />
    </Main>
  );
};

export default TitleSingle;
