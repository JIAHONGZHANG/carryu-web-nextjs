import React, { useState, useRef, useEffect, useContext } from "react";
import styled from "styled-components";

import PropTypes from "prop-types";
import { CarouselContext } from "../Carousel/CarouselContext";
import { WindowWidthContext } from "../../pages/WindowWidthContextProvider";
import SliderList from "./SliderList/SliderList";
import Dots from "./Dots/Dots";
import { CarouselWrapper, SlidersWrapper } from "./styles";
const CarouselContainer = styled.div`
  width: 100vw;
  /* padding: 0 0 6rem 0; */
`;
export default function Carousel() {
  const { isPost } = useContext(CarouselContext);
  const width = useContext(WindowWidthContext);
  console.log("🚀 ~ file: Carousel.js:17 ~ Carousel ~ width", width);
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
    <CarouselContainer>
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
  );
}
Carousel.propTypes = {
  sliderImageSrcs: PropTypes.array.isRequired,
  sliderAlts: PropTypes.array.isRequired,
};
