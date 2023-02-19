"use client";
import React from "react";
import styled from "styled-components/macro";
import PropTypes from "prop-types";
import { P } from "../Typography/index";
import { FontWeights } from "../../styles/variables";
const VideoContainer = styled.div`
  position: relative;
  /* NOTE: give border radius to iframe embed video */
  overflow: hidden;
  border-radius: 4px;
  /* NOTE: keep 16:9 ratio to embed iframe video */
  padding-top: 56.25%;
`;
const VideoWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;
const TextContainer = styled(P)`
  /* font-size: ${(props) => props.fontSize}; */
  font-size: 14px;
  font-weight: ${FontWeights.Bold};
  text-align: center;
  margin: 10px;
`;
const VideoEmbed = ({ embedId, description }) => {
  // const fontSize = width <= 500 ? "14px" : "";
  return (
    <>
      <VideoContainer>
        <VideoWrapper>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.ixigua.com/iframe/${embedId}?autoplay=0`}
            referrerPolicy="unsafe-url"
            frameBorder="0"
            allowFullScreen
            title={description}
          />
        </VideoWrapper>
      </VideoContainer>
      <TextContainer>{description}</TextContainer>
    </>
  );
};

VideoEmbed.propTypes = {
  // width: PropTypes.number.isRequired,
  embedId: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default VideoEmbed;
