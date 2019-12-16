import React, { useContext } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { themeSpacing, themeMargin, themeFontFamily } from '../../themeHelpers';
import { useMediaTitleResource } from './useMediaTitleResource';
import { useCreditsResource } from './useCreditsResource';
import { UpdateContext } from '../../backdropContext';
import { Crew } from './Crew';
import { Cast } from './Cast';

const PosterImage = styled.img`
  width: 100%;
`;

const Title = styled.h2`
  margin: 0;
  margin-right: ${themeSpacing(3)};

  font-family: ${themeFontFamily};
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  line-height: 42px;

  color: #f4f4f4;
`;

const UserScore = styled.h2`
  margin: 0;
  font-family: ${themeFontFamily};
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 23px;

  color: #f4f4f4;
`;

const Runtime = styled.p`
  margin: 0 0 ${themeSpacing(7)} 0;

  font-family: ${themeFontFamily};
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;

  color: #f4f4f4;
`;

const Paragraph = styled.p`
  margin: 0 0 ${themeSpacing(3)} 0;

  min-height: 118px;

  font-family: ${themeFontFamily};
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;

  color: #f4f4f4;
`;

const ReleaseDate = styled(Title)`
  color: #b9b9b9;
`;

const Information = styled.div``;

const Top = styled.div`
  display: grid;
  grid-template-columns: 340px minmax(400px, 645px);
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

  align-items: center;

  &.title {
    margin-bottom: ${themeSpacing(5)};
  }

  &.rating {
    margin-bottom: ${themeSpacing(4)};
  }
`;

const Bottom = styled.div``;

const Main = styled.main`
  margin-top: ${themeSpacing(12)};
  margin-left: ${themeMargin};

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: ${themeSpacing(7)};

  & ${Top} {
    grid-area: 1 / 1 / 2 / 3;
  }

  & ${Bottom} {
    grid-area: 2 / 1 / 3 / 3;
  }
`;

const TitleSingle = () => {
  const { movieId } = useParams();

  const mediaTitleResource = useMediaTitleResource({ movieId });
  const creditsResource = useCreditsResource({ movieId });
  const backdropCtx = useContext(UpdateContext);
  const mediaTitle = mediaTitleResource.resource
    ? mediaTitleResource.resource.read()
    : {
        // id: 330457,
        // image:
        //   'https://image.tmdb.org/t/p/w500/pjeMs3yqRmFL3giJy4PMXWZTTPa.jpg',
        // title: 'Frozen II',
        // release_date: '2019-11-20',
      };

  React.useEffect(() => {
    if (
      mediaTitle.backdrop_path &&
      !backdropCtx.backgroundMatches(mediaTitle.backdrop_path)
    ) {
      backdropCtx.setBackdropPath(mediaTitle.backdrop_path);
    }
  }, [mediaTitle.backdrop_path]);

  const credits = creditsResource.resource
    ? creditsResource.resource.read()
    : { cast: [], crew: [] };

  const { runtime } = mediaTitle;

  const runtimeHours = Math.floor(runtime / 60);
  const runtimeMinutes = runtime % 60;

  return (
    <Main>
      <Top>
        <PosterImage src={mediaTitle.image} />
        <Information>
          <Row className="title">
            <Title>{mediaTitle.title}</Title>
            <ReleaseDate>
              {mediaTitle.release_date &&
                `(${new Date(mediaTitle.release_date).getFullYear()})`}
            </ReleaseDate>
          </Row>
          <Row className="rating">
            <Title>
              {mediaTitle.vote_average
                ? `${mediaTitle.vote_average * 10}%`
                : 'N/A'}
            </Title>
            <UserScore>User Score</UserScore>
          </Row>
          {runtime && (
            <Runtime>
              {runtimeHours}h {runtimeMinutes}m
            </Runtime>
          )}
          <Paragraph>{mediaTitle.overview}</Paragraph>
          <Crew members={credits ? credits.crew : []} />
        </Information>
      </Top>
      <Bottom>
        <Cast members={credits ? credits.cast : []} />
      </Bottom>
    </Main>
  );
};

export default TitleSingle;
