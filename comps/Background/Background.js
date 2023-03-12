// "use client";
import { useContext } from "react";
import styled from "styled-components";
import { WindowWidthContext } from "../WindowWidthContextProvider";
import { Background1Desktop, Background1Mobile } from "../Icons";
import { Background2Desktop, Background2Mobile } from "../Icons";
const Background1Wrapper = styled.div`
  position: absolute;
  bottom: 10%;
  left: 0;
  width: 100%;
  height: 77%;
  background: url("/wave.svg");
  background-size: cover;
  backround-repeat: no-repeat;
  z-index: -99;
`;
const Background2Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  background-size: cover;
  backround-repeat: no-repeat;
  z-index: -99;
`;
export default function Background({ label }) {
  const width = useContext(WindowWidthContext);
  return label === "background1" ? (
    <Background1Wrapper>
      {/* {width <= 850 ? <Background1Mobile /> : <Background1Desktop />} */}
    </Background1Wrapper>
  ) : (
    <Background2Wrapper>
      {/* {width <= 850 ? <Background2Mobile /> : <Background2Desktop />} */}
    </Background2Wrapper>
  );
}
