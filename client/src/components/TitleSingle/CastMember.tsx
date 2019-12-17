import React from 'react';
import styled from 'styled-components';
import { themeFontFamily, themeSpacing } from '../../themeHelpers';

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;

  & img {
  }

  & .information {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    min-height: 80px;

    background: rgba(196, 196, 196, 0.2);
    backdrop-filter: blur(20px);
    box-sizing: border-box;

    padding: ${themeSpacing(4.5)} ${themeSpacing(4)};
  }

  & h3 {
    margin: 0;

    font-family: ${themeFontFamily};
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;

    color: #f4f4f4;
  }

  & p {
    margin: 0;

    font-family: ${themeFontFamily};
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;

    color: #f4f4f4;
  }
`;

export const CastMember = ({ character, name, profilePath }) => {
  return (
    <Container>
      <img
        height={175}
        width={138}
        src={
          profilePath &&
          `https://image.tmdb.org/t/p/w138_and_h175_face/${profilePath}`
        }
      />
      <div className="information">
        <h3>{character}</h3>
        <p>{name}</p>
      </div>
    </Container>
  );
};
