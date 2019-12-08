import React from 'react';
import styled from 'styled-components';
import { textThemeColor, themeSpacing } from '../themeHelpers';

export const ThumbImg = styled.img`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ThumbTitle = styled.h3`
  color: ${textThemeColor};
  margin: 0;
  font-size: 12px;
`;

export const ThumbnailDetails = styled.div`
  position: absolute;
  z-index: 1;
  opacity: 0;
  bottom: 0;
  padding-left: ${themeSpacing(2)};
  padding-bottom: ${themeSpacing(2)};
  transition: 300ms;
  box-sizing: border-box;
  background: linear-gradient(#00000000, #000000aa);
`;

export const ThumbnailContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

const Thumbnail = ({ image, title }) => {
  return (
    <ThumbnailContainer>
      <ThumbnailDetails>
        <ThumbTitle>{title}</ThumbTitle>
      </ThumbnailDetails>
      <ThumbImg src={image} />
    </ThumbnailContainer>
  );
};

export default Thumbnail;
