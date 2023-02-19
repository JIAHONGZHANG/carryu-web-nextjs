import React from "react";
import { useContext } from "react";
import styled, { css } from "styled-components/macro";
import PropTypes from "prop-types";
import { CarouselContext } from "../CarouselContext";
import { PrimaryColor } from "../../../styles/variables";
export default function Dots(props) {
  const Dot = styled.button`
    width: 12px;
    height: 12px;
    cursor: pointer;
    border: none;
    border-radius: 50%;
    /* NOTE: */
    ${({ active }) =>
      active
        ? css`
            background-color: ${PrimaryColor}};
          `
        : css`
            background-color: #d9d9d9;
          `}
  `;
  const DotsContainer = styled.div`
    display: flex;
    gap: 13px;
    position: absolute;
    bottom: 25px;
    left: 50%;
    /* NOTE: To center the dots */
    transform: translateX(-50%);
  `;
  const { sliderImageSrcs } = useContext(CarouselContext);
  return (
    <DotsContainer>
      {sliderImageSrcs.map((_, i) => (
        <Dot
          onClick={() => {
            props.setActiveSlide(i);
            props.goToSlide(i);
          }}
          // NOTE:
          active={props.activeSlide === i ? true : false}
          key={i}
          index={i}
        />
      ))}
    </DotsContainer>
  );
}
Dots.propTypes = {
  goToSlide: PropTypes.func.isRequired,
  activeSlide: PropTypes.number.isRequired,
  setActiveSlide: PropTypes.func.isRequired,
};
