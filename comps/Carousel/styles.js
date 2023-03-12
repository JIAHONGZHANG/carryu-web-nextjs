// "use client";
import styled from "styled-components";

export const CarouselWrapper = styled.div`
  width: 100%;
  /* NOTE: height based on width */
  height: ${(props) => `${props.carouselHeight}px`};
  /* height: 100vh; */
  position: relative;
  overflow: hidden;
`;

export const SlidersWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  transition: 1s;
`;
