import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import useResizeObserver from "use-resize-observer";
import PropTypes from "prop-types";
import { CarouselContextProvider } from "../Carousel/CarouselContext";
import SliderList from "./SliderList/SliderList";
import Dots from "./Dots/Dots";
import { CarouselWrapper, SlidersWrapper } from "./styles";
const CarouselContainer = styled.div`
  width: 100vw;
  /* padding: 0 0 6rem 0; */
`;
export default function Carousel({
  sliderImageSrcs,
  sliderAlts,
  isPost = false,
}) {
  const { ref, width, height } = useResizeObserver();
  const [activeSlide, setActiveSlide] = useState(0);
  const [carouselHeight, setCarouselHeight] = useState(null);
  const sliderWrapperRef = useRef(null);
  const goToSlide = (newSlide) => {
    sliderWrapperRef.current.style.transform = `translateX(${
      100 * (0 - newSlide)
    }%)`;
  };
  useEffect(() => {
    // NOTE: How to get computed width value of an element
    // NOTE:
    if (width <= 850 && !isPost) {
      setCarouselHeight((width / 2) * 3);
    } else if (!isPost) {
      setCarouselHeight(width / 3);
    } else {
      setCarouselHeight(width / 5);
    }
  }, [width]);
  return (
    <CarouselContextProvider value={{ sliderImageSrcs, sliderAlts, isPost }}>
      <CarouselContainer ref={ref}>
        <CarouselWrapper carouselHeight={carouselHeight}>
          <SlidersWrapper ref={sliderWrapperRef}>
            <SliderList />
          </SlidersWrapper>
          <Dots
            goToSlide={goToSlide}
            activeSlide={activeSlide}
            setActiveSlide={setActiveSlide}
          />
        </CarouselWrapper>
      </CarouselContainer>
    </CarouselContextProvider>
  );
}
Carousel.propTypes = {
  sliderImageSrcs: PropTypes.array.isRequired,
  sliderAlts: PropTypes.array.isRequired,
};
