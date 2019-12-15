import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { themeSpacing, themeMargin, themeFontFamily } from '../themeHelpers';
import { createResource } from '../utils/createResource';

const PosterImage = styled.img``;

const Title = styled.h2`
  margin: 0;
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

const Duration = styled.p`
  font-family: ${themeFontFamily};
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;

  color: #f4f4f4;
`;

const Paragraph = styled.p`
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

  align-items: center;
`;

const CrewMemberContainer = styled.div`
  display: flex;

  flex-direction: column;

  font-family: ${themeFontFamily};

  color: #f4f4f4;
`;

const CrewContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 1fr);
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

const CrewMember = ({ name, jobs }) => {
  return (
    <CrewMemberContainer>
      <h3>{name}</h3>
      <p>{jobs && jobs.map(job => <span key={job}>{job}</span>)}</p>
    </CrewMemberContainer>
  );
};

const Crew = ({ members }) => {
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

const useMediaTitleResource = ({ movieId }) => {
  const [resource, setResource] = React.useState();
  const [startTransition, isPending] = React.useTransition({
    timeoutMs: 1000,
  });

  React.useEffect(() => {
    startTransition(() => {
      setResource(createResource({ endpoint: `/api/movie/${movieId}` }));
    });
  }, [movieId]);

  return {
    resource,
    isPending,
  };
};

const useCreditsResource = ({ movieId }) => {
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

const TitleSingle = () => {
  const { movieId } = useParams();

  const mediaTitleResource = useMediaTitleResource({ movieId });
  const creditsResource = useCreditsResource({ movieId });
  const mediaTitle = mediaTitleResource.resource
    ? mediaTitleResource.resource.read()
    : {
        // id: 330457,
        // image:
        //   'https://image.tmdb.org/t/p/w500/pjeMs3yqRmFL3giJy4PMXWZTTPa.jpg',
        // title: 'Frozen II',
        // release_date: '2019-11-20',
      };

  const credits = creditsResource.resource
    ? creditsResource.resource.read()
    : { cast: [], crew: [] };

  console.log(mediaTitle);
  console.log(credits);

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
          <Row>
            <Title>
              {mediaTitle.vote_average
                ? `${mediaTitle.vote_average * 10}%`
                : 'N/A'}
            </Title>
            <UserScore>User Score</UserScore>
          </Row>
          <Duration>1h 44m</Duration>
          <Paragraph>{mediaTitle.overview}</Paragraph>
          <Crew members={credits ? credits.crew : []} />
        </Information>
      </Top>
      <Bottom />
    </Main>
  );
};

export default TitleSingle;
