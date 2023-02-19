"use client";
import React from "react";
import styled from "styled-components/macro";
import PropTypes from "prop-types";

export const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  /* NOTE: */
  /* object-fit: cover; */
  object-fit: ${(props) => (props.isPost ? "fill" : "cover")};
  flex-shrink: 0;
`;

export default function Slider(props) {
  const { src, alt, isPost } = props;

  return <StyledImg src={src} alt={alt} isPost={isPost} />;
}

Slider.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
