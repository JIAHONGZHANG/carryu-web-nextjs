"use client";
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Link from "next/link";

export const ExternalImageWrapper = styled.a`
  width: 100%;
  height: 100%;
  object-fit: cover;
  flex-shrink: 0;
`;

export const InternalImageWrapper = styled(Link)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  flex-shrink: 0;
`;

export const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  /* NOTE: */
  /* object-fit: cover; */
  object-fit: ${(props) => (props.isPost ? "fill" : "cover")};
  flex-shrink: 0;
`;

export default function Slider(props) {
  const { src, alt, isPost, link } = props;

  if (link) {
    // check is link starts with http or https
    if (link.match(/^(http|https):\/\//)) {
      return (
        <ExternalImageWrapper href={link} target="_blank" rel="noreferrer">
          <StyledImg src={src} alt={alt} isPost={isPost} />
        </ExternalImageWrapper>
      );
    }

    return (
      <InternalImageWrapper href={`/posts/${link}`}>
        <StyledImg src={src} alt={alt} isPost={isPost} />
      </InternalImageWrapper>
    );
  }

  return <StyledImg src={src} alt={alt} isPost={isPost} />;
}

Slider.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
