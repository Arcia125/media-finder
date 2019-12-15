import React, { useRef } from 'react';
import styled from 'styled-components';
import {
  CarouselProvider,
  Slider as BaseSlider,
  Slide,
  ButtonBack,
  ButtonNext,
  WithStore,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { Link } from 'react-router-dom';

import { themeSpacing, themeMargin, themeFontFamily } from '../themeHelpers';
import Thumbnail, { ThumbnailContainer, ThumbnailDetails } from './Thumbnail';
import ArrowIcon from './ArrowIcon';

const SLIDE_WIDTH = 216;
const SLIDE_GAP = 4;

const TrackTitle = styled.h2`
  font-family: ${themeFontFamily};
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  color: #f4f4f4;
  clear: both;
`;

export const TrackContainer = styled.div`
  ${TrackTitle} {
    margin-bottom: ${themeSpacing(3)};
  }
`;

export const ThumbSlide = styled(Slide)`
  position: relative;
  height: 0;
  /* width: 100%; */
  /* padding: 28% 0; */
  transition: 360ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform: scale(1) translateX(0);
  &:hover ${ThumbnailDetails} {
    opacity: 1;
  }
  & ${ThumbnailContainer} * {
    width: calc(100% - ${SLIDE_GAP}px);
  }
`;

const Slider = styled(BaseSlider)`
  width: ${SLIDE_WIDTH - SLIDE_GAP}px;
  overflow: visible;

  &:hover ${ThumbSlide} {
    /* makes the ThumbSlides before the hovered slide shift left */
    transform: scale(1) translateX(-40%);
    &:hover {
      /* makes the hovered slide grow, be on top, and overrides the translate left from above */
      transform: scale(1.8) translateX(0);
      z-index: 10;

      & ~ ${ThumbSlide} {
        /* makes the ThumbSlides after the hovered slide shift left */
        transform: scale(1) translateX(40%);
      }

      &:first-child {
        /* prevents the first video from overflowing the left side of the page by translating it right */
        transform: scale(1.8) translateX(10%);

        & ~ ${ThumbSlide} {
          /* allows the ThumbSlides after the first one to shift more if it is hovered */
          transform: scale(1) translateX(56%);
        }
      }
    }
  }
  /* &: hover ${ThumbSlide}; */
`;

const TrackButton = styled.button`
  background: #00000088;
  outline: none;
  border: none;
  z-index: 10;
  opacity: ${props => (props.hide ? 0 : 1)};
  & svg {
    fill: #fff;
    transform: ${props => props.mirror && 'rotate(180deg)'};
    opacity: 0.2;
    transition: 300ms;
  }
  &:hover svg {
    opacity: 1;
  }
`;

const LeftTrack = styled.div`
  display: flex;
`;

const Carousel = styled(CarouselProvider)`
  display: flex;
  justify-content: space-between;
  position: relative;
  left: -${themeMargin};
  width: calc(100% + ${themeMargin});
  & ${LeftTrack} ${TrackButton} {
    margin-right: 14px;
  }
`;

const InnerTrack = WithStore(
  ({ movies, currentSlide }) => {
    const backButtonHidden = currentSlide === 0;
    const nextButtonHidden = currentSlide === movies.length - 1;
    return (
      <>
        <LeftTrack>
          <TrackButton
            as={ButtonBack}
            mirror={1}
            hide={backButtonHidden ? 1 : 0}
          >
            <ArrowIcon />
          </TrackButton>
          <Slider classNameTray="preview-track__tray">
            {movies &&
              movies.map((movie, i) => (
                // <Slide index={i} key={i}>
                <ThumbSlide key={i} index={i}>
                  <Link to={`/movie/${movie.id}`}>
                    <Thumbnail image={movie.image} title={movie.title} />
                  </Link>
                </ThumbSlide>
                // </Slide>
              ))}
          </Slider>
        </LeftTrack>
        <TrackButton as={ButtonNext} hide={nextButtonHidden ? 1 : 0}>
          <ArrowIcon />
        </TrackButton>
      </>
    );
  },
  state => ({ currentSlide: state.currentSlide })
);

const PreviewTrack = ({ title, movies, isPending }) => {
  return (
    <TrackContainer>
      <TrackTitle>{title}</TrackTitle>
      <Carousel
        naturalSlideWidth={100}
        naturalSlideHeight={56}
        totalSlides={movies.length}
        dragEnabled={false}
      >
        <InnerTrack movies={movies} />
      </Carousel>
    </TrackContainer>
  );
};

export default PreviewTrack;
