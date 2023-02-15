// "use client";
import React from "react";
import styled from "styled-components";
import useResizeObserver from "use-resize-observer";
import { Background1Desktop, Background1Mobile } from "../Icons";
import { Background2Desktop, Background2Mobile } from "../Icons";
const Background1Wrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0%;
  left: 0;
  z-index: -99;
  > svg {
    width: 100%;
    height: 100%;
  }
`;
const Background2Wrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 15%;
  left: 0;
  z-index: -99;
  > svg {
    width: 100%;
    height: 100%;
  }
`;
export default function Background({ label }) {
  const { ref, width } = useResizeObserver();
  return label === "background1" ? (
    <Background1Wrapper ref={ref}>
      {width <= 850 ? <Background1Mobile /> : <Background1Desktop />}
    </Background1Wrapper>
  ) : (
    <Background2Wrapper>
      {width <= 850 ? <Background2Mobile /> : <Background2Desktop />}
    </Background2Wrapper>
  );
}
