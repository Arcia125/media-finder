import React from 'react';
import styled from 'styled-components';

export const ThumbnailContainer = styled.div`
  position: relative;
  height: 0;
  width: 100%;
  padding: 28% 0;
  transition: 300ms;
  &:hover {
    transform: scale(1.4);
    z-index: 10;
  }
  & img {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Thumbnail = ({ image }) => {
  return (
    <ThumbnailContainer>
      <img src={image} />
    </ThumbnailContainer>
  );
};

export default Thumbnail;
